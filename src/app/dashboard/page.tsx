'use client'
import EventCard from "@/components/events/eventCard";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import EventModal from "@/components/modals/modalNewEvent";
import { useAuth } from "@/context/AuthContext";
import CustomAlert from '../../components/CustomAlert';


interface Usuario {
  _id: string;
  name: string;
}

interface Evento {
  nombre: string;
  fecha: string;
  lugar: string;
  _id: string;
  creadoPor: Usuario | string;
  listas: any;
}

interface AlertValues {
  show: boolean;
  message: string;
  types: string
}


const Dashboard = () => {
  
  const [eventos, setEventos] = useState<Evento[]>([]); 
  const [error, setError] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<AlertValues>({
    show: false,
    message: '',
    types: ''
  });

  const data = useAuth()



    const handleCreateEvent = async (eventData: { nombre: string; fecha: string; lugar: string }) => {
      const {nombre, fecha, lugar} = eventData;
    
      try {
        const response = await axiosInstance.post('/events', {nombre, fecha, lugar, creadoPor:data?.user?._id});
        setShowAlert({show: true, message:'se agrego un nuevo evento', types:"success"})
        obtenerEventos(data?.user?._id)  
      } catch (err: any) {
        console.log(err)
        setError(err?.response.data?.message);
        setShowAlert({show: true, message:err?.response.data?.message, types:"success"})
      }
    };

    const obtenerEventos = async (id:any) => {
      try {
        const response = id && await axiosInstance.get(`/events/${id}`);
        setEventos(response.data);  
      } catch (err: any) {
        // console.log(err?.response)
        // if(err.response?.data.message === 'invelid token')
        err.response && setError(err.response?.data.message);
      }
    };

    const handleDeleteEvent = async (eventId: string) => {
      try {
        await axiosInstance.delete(`/events/event/${eventId}`);
        setShowAlert({show: true, message:'se elimino el evento', types:"success"})
        setEventos((prevEventos) => prevEventos.filter(evento => evento._id !== eventId));  
      } catch (err: any) {
        setShowAlert({show: true, message:err?.response?.data?.message, types:"error"})
        setError(err?.response?.data?.message);
      }
    };

    const handleEditEvent = async (eventId: string, updatedData: { nombre: string; fecha: string; lugar: string }) => {
      const { nombre, fecha, lugar } = updatedData;
    
      try {
        const response = await axiosInstance.put(`/events/event/${eventId}`, { nombre, fecha, lugar });
        setEventos((prevEventos) => 
          prevEventos.map(evento => evento._id === eventId ? response.data : evento)
        );  
      } catch (err: any) {
        setError(err?.response?.data?.message);
      }
    };
    
    
  
    useEffect(() => {
      let id = data && data.user?._id ;
      obtenerEventos(id);
      // if(eventos) setLoading(true) 
    }, [data]);

  return (
    <div className="bg-gray-900 md:px-20 px-6 min-h-screen">

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreateEvent={handleCreateEvent}
      />

        
      {showAlert.show && ( <CustomAlert message={showAlert.message} type={showAlert.types} onClose={() => setShowAlert({...showAlert, show: false})} /> )} 


      <div className="justify-center">
        <p className="text-gray-200 text-xl mb-2">Mis eventos</p>
        <div className="border border-pink-500"></div>
        {loading && <div>Cargando...</div>}
        {eventos && eventos.map((e,index) => {
          return <EventCard
             key={index} name={e.nombre} place={e.lugar} date={e.fecha} listas={e.listas} createdBy={e.creadoPor} id={e._id}  
             onDelete={handleDeleteEvent}
          />
        })}
         <div className="flex flex-col w-full justify-center p-4">
        {error && <p className="text-gray-300 m-auto">{error}</p>}
          <button
            onClick={() => setModalOpen(true)}
            className="text-pink-500 cursor-pointer  py-2"
            >
            Crear Nuevo Evento
            </button>
        </div>
        
        

      </div>
      <div className="justify-center">
        <p className="text-gray-200 text-xl mb-2">Colaboraciones</p>
        <div className="border border-pink-500"></div>
        {/* <EventCard/> */}
      </div>
      
    </div>
    
  );
};


export default  Dashboard;
