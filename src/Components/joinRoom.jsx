import React, { useEffect, useState } from 'react'
import Chat from './chat'

function JoinRoomChat({user,toggleButton}) {
    const [roomName,setRoomName] = useState()
        const [room,setRoom] = useState()
        const [joinRoom,setJoinRoom] = useState(false)
    
        const handleJoinRoom = async(e)=>{
            e.preventDefault()
            if(!roomName || !room) return
            setJoinRoom(true)
        }

        const toggleChat = ()=> {
            setJoinRoom(false)
            window.location.reload();
        }
        
  return (
    <div >
        {
            joinRoom ? <Chat user={user} toggleChat={toggleChat} roomid={room} roomName={roomName}/> :

            <div className="flex w-screen h-screen  items-center justify-center">
            <div className=" w-[30%] py-4 px-4 shadow-sm shadow-slate-400 rounded-md bg-black text-white border border-white">
                <h3 className="text-2xl font-semibold">Join Room</h3>
                <form className="mt-[10px]">
                    <input
                        type="text"
                        placeholder="Room Name"
                        name="roomName"
                        onChange={(e)=>setRoomName(e.target.value)}
                        required
                        className="w-full border text-black border-gray-300 rounded-md py-2 px-3"
                    />
                    
                        <div className="md:col-span-2 mt-4">
                        <input
                        type="text"
                        placeholder="Room Password"
                        name="room"
                        onChange={(e)=>setRoom(e.target.value)}
                        required
                        className="w-full border text-black border-gray-300 rounded-md py-2 px-3"
                    />
                        </div>
                        <div className="md:col-span-2 flex gap-4 mt-4">


                            <button onClick={(e)=>{
                                e.preventDefault()
                                toggleButton('join')
                            }} className="py-3 text-base font-medium rounded text-black bg-white border  w-1/2 ">
                                Cancel
                            </button>

                            <button onClick={(e)=>handleJoinRoom(e)}  className=" w-1/2 py-3 text-base font-medium rounded text-white border border-white bg-black">
                                Join Room
                            </button>
                        </div>
                </form>
            </div>
        </div>

        }
       
    </div>
  )
}

export default JoinRoomChat