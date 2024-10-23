'use client'
import EventCard from "@/components/events/eventCard";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import EventModal from "@/components/modals/modalNewEvent";

const Dashboard = () => {
  
    const [eventos, setEventos] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleCreateEvent = (eventData: { nombre: string; fecha: string; lugar: string }) => {
      console.log('Evento creado:', eventData);
    // Aquí puedes agregar la lógica para enviar los datos al backend
    };

    const obtenerEventos = async () => {
      try {
        const response = await axiosInstance.get('/events');
        setEventos(response.data);  
      } catch (err) {
        setError(err?.response.data.message);
      }
    };
  
    useEffect(() => {
      obtenerEventos();
    }, []);

  return (
    <div className="bg-gray-900 md:px-20 px-6 min-h-screen">

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreateEvent={handleCreateEvent}
      />

      <div className="justify-center">
        <p className="text-gray-200 text-xl mb-2">Mis eventos</p>
        <div className="border border-pink-500"></div>
        {eventos && eventos.map(e => {
          return <EventCard name={e.nombre} place={lugar} date={fecha} createdBy={creadoPor}/>
        })}

         <div className="flex flex-col w-full justify-center p-4">
        {error &&<p className="text-gray-300 m-auto">{error}</p>}
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
        <EventCard/>
      </div>
      
    </div>
    
  );
};


export default  Dashboard;
