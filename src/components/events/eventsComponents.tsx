"use client"
import { useState } from "react"
import ModalAddGuest from "../modals/modalAddGuest"



export const GuestCard = () => {
    return (
        <div className="rounded-xl bg-gray-800 p-8 text-center m-4 md:w-60">
            <p className="text-ms text-gray-400 ">Ingresaron</p>
            <div className="flex p-4 justify-around items-center ">
                <p className="text-green-500 text-4xl">212</p>
                <p className="text-ms text-gray-400">/</p>
                <p className="text-pink-500 text-4xl">290</p>
            </div>
            <p className="text-ms text-gray-400">Invitados</p>
        </div>
    )
}

export const FilterName = () => {
    return (
        <div className="py-4">
            <input type="text" placeholder="Buscar nombre" className="rounded-lg p-2 text-gray"/>
        </div>
    )
}

export const ListCard = () => {

    const [add, setAdd] = useState(false)
    const [show, setShow] = useState(false)

    return (
        <div className=" rounded-xl bg-gray-800 p-8 md:text-left md:items-center text-center w-full my-4">
            <ModalAddGuest isOpen={add} onClose={() => setAdd(!add)}/>
            <div className="md:flex">
            <div className="flex md:block justify-between mb-2 items-center w-full">
                <p className="text-white text-2xl">Nombre de la lista</p>
                <p className="text-green-400 text-lg w-fit italic">abierta</p>
            </div>
            <div className="flex justify-between w-full">
                <button className="button-pink p-4 text-sm rounded-xl font-semibold h-fit">Editar</button>
                <button onClick={() => setShow(!show)}
                    className="button-pink p-4 text-sm rounded-xl font-semibold h-fit">{show ? "Ocultar" : "Ver"}</button>
                <button  onClick={() => setAdd(!add)} 
                    className="button-pink p-4 text-sm rounded-xl font-semibold h-fit">
                        {add? "Listo" : "Agregar"}
                    </button>
            </div>
            </div>
            {show && <div>
                <FilterName/>
                <div className="text-gray-300 min-h-20 text-center items-center">
                    <p className="m-auto">Vacío</p>
                </div>
            </div>}
        </div>
    )
}




