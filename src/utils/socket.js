// src/socket.js
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = process.env.REACT_APP_API_URL_BASE

export let socket = null;


export const initializeChatSocket = async () => {
  try {

    const response = await fetch(`${SOCKET_SERVER_URL}/v1/api/chats/socket`);
    console.log("Socket response",response)
    if (!response.ok) {
      throw new Error("Failed to initialize socket on the backend");
    }


    socket = io(SOCKET_SERVER_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    console.log("🔌 Socket initialized successfully");


  } catch (error) {
    console.error("❌ Error initializing chat socket:", error);
  }
};

export const connectSocket = async () => {
  if (!socket || !socket.connected) {
    await initializeChatSocket(); 
    if (socket) socket.connect();
  }
};


export const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
    console.log("🔌 Socket disconnected");
  }
};
