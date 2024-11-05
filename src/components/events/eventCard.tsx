import React from "react";
import { useRouter } from "next/navigation";
import { useEvento } from '@/components/eventContext'


interface EventCardProps {
    id: string;
    name: string;
    date: string;
    place: string;
    createdBy: Object;
    listas: any;
    onDelete: (eventId: string) => Promise<void>
   
}

const EventCard :React.FC<EventCardProps> = ({ name, place, date, createdBy, id, listas, onDelete })=> {

    const router = useRouter()
    const { evento, setEvento } = useEvento();


    const fecha = new Date(date);

// Formatear la fecha como dd/mm/yyyy
        const fechaFormateada = fecha.getDate().toString().padStart(2, '0') + '/' +
                        (fecha.getMonth() + 1).toString().padStart(2, '0') + '/' +
                        fecha.getFullYear();

    const enter = () => {
        router.push(`/evento/${id}`)
    }
    

    return(
        <div className="bg-gray-800 my-6 p-6  rounded-xl ">
            <div className="flex justify-between">
                <h2 className="text-pink-500 text-2xl">{name}</h2>
                <h5 className="text-gray-400 text-xl italic">{fechaFormateada}</h5>
            </div>
            <div className="border border-pink-500"></div>
            <div></div>
           
            <div className="text-gray-300 block md:flex text-center items-center md:justify-between  mt-4">
                <div className="flex justify-between md:w-2/3">
                    <p><strong>220</strong> Invitados</p>
                    {/* <p><strong>2</strong> Colaboradores</p> */}
                    <p><strong>{listas.length}</strong> Listas</p>
                </div>
                <button  onClick={enter} className="button-pink rounded-xl font-semibold p-4 mt-4 md:mt-0">Entrar</button>
                <button  onClick={() => onDelete(id)} className="button-pink rounded-xl font-semibold p-4 mt-4 md:mt-0">eliminar</button>
            </div>

        </div>
    )
}

export default EventCard;