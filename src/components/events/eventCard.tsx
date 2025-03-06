import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ModalAlert from "../modals/modalAlert.";
import EventModal from "../modals/modalEditEvent";
import axiosInstance from "@/utils/axiosInstance";
import CustomAlert from "../CustomAlert";

interface EventCardProps {
    id: string;
    name: string;
    date: string;
    place: string;
    listas: [];
    onDelete: (eventId: string) => Promise<void>
    
}

// interface ListaData {
//     _id: string;
// }

interface ApiError {
    response: {
        data: {
            message: string;
        };
    };
  }
  


interface AlertValues {
    show: boolean;
    message: string;
    types: string
  }

const EventCard :React.FC<EventCardProps> = ({ name, place, date, id, listas, onDelete })=> {

    const router = useRouter()
    // const { evento, setEvento } = useEvento();

    const [openDelete, setOpenDelete] = useState(false)
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<AlertValues>({
        show: false,
        message: '',
        types: ''
      });

    const [evento, setEvento] = useState({nombre:name, lugar:place, fecha:date})

    
    const fecha = new Date(evento.fecha);

// Formatear la fecha como dd/mm/yyyy
    const fechaFormateada = fecha.getDate().toString().padStart(2, '0') + '/' +
                        (fecha.getMonth() + 1).toString().padStart(2, '0') + '/' +
                        fecha.getFullYear();

    const enter = () => {
        router.push(`/evento/${id}`)
    }

    const handleDelete = () => {
        onDelete(id)
        setOpenDelete(false)
    }



    const HandleUpdate = async (updatedData: { nombre: string; fecha: string; lugar: string }) => {
    
        try {
          const response = await axiosInstance.put(`/events/event/${id}`, updatedData);
          console.log(response)
        setShowAlert({show: true, message:response.data.message, types:"success"})
        const {nombre, lugar, fecha} = response.data.eventoEditado
        setEvento({...evento, nombre: nombre, fecha:fecha, lugar:lugar})
        }catch (err: unknown) {
            let message: string;
          if ((err as ApiError).response?.data?.message) {
            message = (err as ApiError).response.data.message;
            setShowAlert({ show: true, message: message, types: "error" });
          } else {
            setShowAlert({ show: true, message: 'No se pudo agregar el evento.', types: "error" });
          }
          }
      };


    return(
        <div className="bg-gradient-to-r from-gray-800 to-gray-600 shadow-lg my-6 p-6 xl:w-3/4 rounded-2xl">
        <ModalAlert open={openDelete} onClose={() => setOpenDelete(false)} handleDelete={handleDelete} />
        <EventModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onEdit={HandleUpdate} />
        {showAlert.show && (
            <CustomAlert
                message={showAlert.message}
                type={showAlert.types}
                onClose={() => setShowAlert({ ...showAlert, show: false })}
            />
        )}
    
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-pink-500 text-2xl md:text-3xl font-bold">{evento.nombre}</h2>
            <h5 className="text-gray-200 text-xs md:text-lg font-medium">{fechaFormateada}</h5>
        </div>
        <div className="border-t border-pink-500 mb-4"></div>
    
        <div className="text-gray-300 block md:flex text-center items-center justify-between mt-4">
            <div className="flex justify-between md:w-1/2 mb-4 md:mb-0">
                <p className="mr-4"><strong>{listas.length}</strong> Listas</p>
                <p><strong>{evento.lugar}</strong></p>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={enter}
                    className="button-pink sm:text-base text-xl rounded-lg w-full sm:w-auto font-semibold px-4 py-2 md:px-6 md:py-3 mt-4 md:mt-0 transition ease-in-out duration-300 transform hover:scale-105"
                >
                    Entrar
                </button>
                <button
                    onClick={() => setModalOpen(true)}
                    className="button-pink rounded-lg font-semibold mx-2 px-4 py-2 md:px-6 md:py-3 mt-4 md:mt-0 transition ease-in-out duration-300 transform hover:scale-105"
                >
                    Editar
                </button>
                <button
                    onClick={() => setOpenDelete(true)}
                    className="bg-red-500 rounded-lg font-semibold mx-2 px-4 py-2 md:px-6 md:py-3 mt-4 md:mt-0 transition ease-in-out duration-300 transform hover:scale-105"
                >
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                </button>
            </div>
        </div>
    </div>
    
    )
}

export default EventCard;