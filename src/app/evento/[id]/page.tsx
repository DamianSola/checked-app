'use client'
import React, { useEffect, useState } from 'react';
import ListCard  from "@/components/events/listCard";
import GuestScore from '@/components/events/score';
import ModalCheck from '@/components/modals/modalCheck';
import { useParams } from 'next/navigation';
import CustomAlert from '@/components/CustomAlert';
import axiosInstance from '@/utils/axiosInstance';
import ModalCreateList from '@/components/modals/modalCreateList';
import EditModal from '@/components/modals/modalEditList';
import { useRouter } from 'next/navigation';
import { useEvento } from '@/components/eventContext'
import { useAuth } from '@/context/AuthContext';


interface AlertValues {
    show: boolean;
    message: string;
    types: string
}

interface Lista{
    _id: string;
    nombre: string;
    invitados: [];
    abierta: boolean;
    deleteList : () => void;
    showGuests: () => void;
}

interface List {
    _id: string;
    nombre: string;
    open: boolean;
}

  
const Event = () => {

    const {id} = useParams<any>()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [lists, setLists] = useState<Lista[]>([])
    const [error, setError] = useState<any>(null)
    const [createModal, setCreateModal] = useState(false)
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [currentList, setCurrentList] = useState({name:'', _id:'', open: true})
    const { evento, setEvento } = useEvento();

    const [showAlert, setShowAlert] = useState<AlertValues>({
        show: false,
        message: '',
        types: ''
    });

    // const data = useAuth()


    const handleGetAllLists = async (eventoId: string) => {
        try {
          const response = await axiosInstance.get(`/lists/${eventoId}`);
          setLists(response.data); // Asumiendo que tienes un estado para almacenar las listas
          setShowAlert({ show: true, message: 'Listas cargadas exitosamente', types: 'success' });
        } catch (err: any) {
            console.log(err)
            router.push('/dashboard')
            setShowAlert({ show: true, message: err?.response?.data?.message, types: 'error' });
            setError(err?.response?.data?.message);
        }
      };

      const GetEvent = async (eventoId: string) => {
        try {
          let response = await axiosInstance.get(`/events/event/${eventoId}`);
          setEvento(response.data);

        } catch (err: any) {
            // console.log(err)
            setShowAlert({ show: true, message: err?.response?.data?.message, types: 'error' });
            router.push('/dashboard')
        }
      };

    const handleCreateList = async (newListData: any) => {
        try {
          const response = await axiosInstance.post('/lists', {nombre:newListData, eventoId:id});
          setLists((prevLists) => [...prevLists, response.data]); // Agrega la nueva lista al estado
          setShowAlert({ show: true, message: 'Lista creada exitosamente', types: 'success' });
        } catch (err: any) {
          setShowAlert({ show: true, message: err?.response?.data?.message, types: 'error' });
          setError(err?.response?.data?.message);
        }
      };


      const handleUpdate = async (nameList: string, updatedListData: any) => {
        // console.log(listId)
        console.log(updatedListData)
        try {
          const response = await axiosInstance.put(`/lists/${currentList._id}`,{nombre: nameList, abierta: updatedListData});
          setLists((prevLists) => 
            prevLists.map(list => (list._id === currentList._id ? response.data : list)) // Actualiza la lista editada
          );
        //   setShowAlert({ show: true, message: 'Lista actualizada exitosamente', types: 'success' });
        } catch (err: any) {
          setShowAlert({ show: true, message: err?.response?.data?.message, types: 'error' });
          setError(err?.response?.data?.message);
        }
      };

    const openEditModal = ({ _id, nombre, open }: List) => {
        setEditModalOpen(true);
        setCurrentList({_id: _id, name:nombre, open:open})
    }

    const deleteList = async (listId: string) => {

      try{
          let response = await axiosInstance.delete(`/lists/${listId}`)
          setShowAlert({ show: true, message: response.data?.message, types: 'success' });
          setLists((prevLists) => prevLists.filter(list => list._id !== listId));
          // console.log(response)
      }catch(error: any){
        setShowAlert({ show: true, message: error?.response?.data?.message, types: 'error' });
      }
  }

    useEffect(() => {
        handleGetAllLists(id)
        GetEvent(id)
    },[id])


    return(

        <div className="bg-gray-900 md:px-10 px-6 min-h-screen">
            <ModalCheck isOpen={open} onClose={() => setOpen(false)}/>
            <ModalCreateList 
            isOpen={createModal}
            onClose={() => setCreateModal(false)}
            onCreate={handleCreateList}
            />
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                onUpdate={handleUpdate}
                currentName={currentList.name}
                currentIsOpen ={currentList.open}
            />

            <div className="justify-center">
                {evento? <p className="text-gray-200 text-xl mb-2">{evento.nombre}</p>:
                <p className="text-gray-200 text-xl mb-2">Cargando Evento...</p>}
                <div className="border border-pink-500"></div>
            </div>
            <div className="text-center md:flex">
                <div>
                    <GuestScore eventoId = {id}/>
                    <button onClick={() => setOpen(!open)} 
                        className="bg-green-500 p-6 text-gray-900 font-bold text-xl my-2 rounded-xl">To Check</button>
                </div>
                <div className="w-full py-4">
                    <p className="text-gray-200 text-lg mb-4">Listas</p>
                    <div className="border border-pink-500"></div>
                    {!evento ? <p className='text-white m-10'>Cargando Listas</p>:
                     lists.length > 0 ? (
                        lists.map((l, i) => (
                            <ListCard 
                            deleteList={() => deleteList(l._id)}
                                key={i} 
                                _id={l._id} 
                                name={l.nombre} 
                                open={l.abierta} 
                                guest={l.invitados}
                                updateList={() => openEditModal({_id: l._id, nombre: l.nombre, open:l.abierta})}
                            />
                        ))
                    ) : (
                    <div className='m-6'>
                        <p className='text-white'>No tienes listas todavía</p>
                    </div>
                    )}
                    {showAlert.show && ( <CustomAlert message={showAlert.message} type={showAlert.types} onClose={() => setShowAlert({...showAlert, show: false})} /> )} 
                    <button className='font-semibold text-pink-500 p-4' onClick={() => setCreateModal(true)}>Crear Lista</button>
                </div>
            </div>
        </div>

    )
}

export default Event;

// Asegúrate de que axiosInstance esté correctamente configurado y apunte a la URL base de tu API.
// Cambia las rutas en los métodos (/lists, /events/event/${eventId}, etc.) según la estructura de tu API.
// Asegúrate de tener los estados (setLists, setShowAlert, setError) y las variables necesarias definidas en tu componente React.
// Los tipos de datos (any, string, etc.) pueden ser ajustados según tu implementación y el uso de TypeScript.
// Con estas funciones, deberías poder manejar las operaciones básicas de CRUD para tus listas en tu aplicación.