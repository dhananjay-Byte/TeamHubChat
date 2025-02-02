import React, { lazy, Suspense, useState } from 'react'
const JoinChat = lazy(() => import("../Components/joinChat"))
import JoinRoomChat from '../Components/joinRoom'

function DisplayChats({user}) {
    const [createRoom, setCreateRoom] = useState(false)
    const [joinRoom, setJoinRoom] = useState(false)

    const handleDisplayRoom = (room) => {
        if (room === "create") {
            setCreateRoom(true)
            setJoinRoom(false)
        } else if (room === "join") {
            setJoinRoom(true)
            setCreateRoom(false)
        }
    }

    const toggleRoom = (type) => {
        if (type === 'create') setCreateRoom(false)
        if (type === 'join') setJoinRoom(false)
    }
    return (
        <div className='rounded-md'>
            <div className='text-black font-semibold text-xl flex items-center justify-center gap-4'>
                <button onClick={() => handleDisplayRoom('create')} className=' p-2 rounded-md border shadow-sm shadow-slate-400 text-lg flex items-center gap-2 justify-center'> Create Room </button>
                <button onClick={() => handleDisplayRoom('join')} className=' p-2 rounded-md border shadow-sm shadow-slate-400 text-lg flex items-center gap-2 justify-center'> Join Room </button>
            </div>
            {
                createRoom && (
                    <Modal>
                        <Suspense>
                            <JoinChat user={user} toggleButton={toggleRoom} />
                        </Suspense>
                    </Modal>
                )
            }

            {
                joinRoom && (
                    <Modal>
                        <JoinRoomChat user={user} toggleButton={toggleRoom} />
                    </Modal>
                )
            }
        </div>
    )
}

const Modal = ({ children }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
        {children}
    </div>
);

export default DisplayChats