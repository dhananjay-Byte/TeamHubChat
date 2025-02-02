import React, { useState, useEffect } from "react";
import { socket, connectSocket, disconnectSocket } from "../utils/socket";

const Chat = ({ user, roomid, roomName, toggleChat }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userInChat, setUserInChat] = useState(false)

  useEffect(() => {
    const handleSocket = async () => {
      await connectSocket();
      socket.emit("joinRoom", { user, roomid });
  
      socket.on("receiveMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
  
      socket.on("userLeft", ({ user, message }) => {
        setMessages((prevMessages) => [...prevMessages, { user, message }]);
      });
    };
  
    handleSocket();
  
    return () => {
      console.log("🔌 Disconnecting socket...");
      socket.off("receiveMessage");
      socket.off("userLeft");
      socket.off("connect");
      disconnectSocket();
    };
  }, [user, roomid]);
  

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { user, roomName, roomid, message });
      setMessage("");
    }
  };

  const closeChat = () => {
    socket.emit("leaveRoom", { user, roomid });
    socket.disconnect();
    toggleChat();
  };

  return (
    <div>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="h-1/2 w-2/3 fixed top-1/4 left-1/4 p-4  text-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center border-b border-gray-700 pb-2">
            <h2 className="text-xl font-bold text-center">{roomName}</h2>
            <button onClick={closeChat} className="text-gray-400 hover:text-white">✖</button>
          </div>

          <div className="overflow-y-auto bg-gray-900 border border-gray-700 p-2 my-4 rounded-lg">
            {userInChat && (
              <p className="text-sm text-green-600 text-center">
                {userInChat} joined Room!
              </p>
            )}
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <strong className="text-gray-300">{msg.user}:</strong> <span className="text-gray-400">{msg.message}</span>
              </div>
            ))}
          </div>
         
          <div>
            <div className="flex items-center gap-2">
                <div>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 bg-gray-800 text-black border border-gray-700 rounded-lg focus:outline-none"
                />
                </div>
                
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                >
                  Send
                </button>
  

            </div>
          </div>

        </div>
      </div>

    </div>

  );
};

export default Chat;
