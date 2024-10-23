'use client'
import React, { useState } from 'react';
import { GuestCard, ListCard } from "@/components/events/eventsComponents";
import ModalCheck from '@/components/modals/modalCheck';


const Event = () => {

    const [open, setOpen] = useState(false)


    return(
        <div className="bg-gray-900 md:px-10 px-6 min-h-screen">
            <ModalCheck isOpen={open} onClose={() => setOpen(false)}/>
            <div className="justify-center">
                <p className="text-gray-200 text-xl mb-2">Evento Name</p>
                <div className="border border-pink-500"></div>
            </div>
            <div className="text-center md:flex">
                <div>
                    <GuestCard/>
                    <button onClick={() => setOpen(!open)} 
                        className="bg-green-500 p-6 text-gray-900 font-bold text-xl my-2 rounded-xl">To Check</button>
                </div>
                <div className="w-full py-4">
                    <p className="text-gray-200 text-lg mb-2">listas</p>
                    <div className="border border-pink-500"></div>
                    <ListCard/>
                </div>
            </div>
        </div>
    )
}

export default Event;