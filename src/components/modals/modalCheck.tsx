// 'use client'
import { DateTime } from 'next-auth/providers/kakao';
import React, { useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { useEvento } from '@/components/eventContext'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ApiError {
  response: {
      data: {
          message: string;
      };
  };
}

interface GuestState {
  nombre: string;
  dni: string;
  horaIngreso: DateTime;
  estado: string;
  _id: string
}

const ModalCheck: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [guest, setGuest] = useState<GuestState | undefined>(undefined)
    const { evento } = useEvento();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 8) {
      setInputValue(value);
      setError('');
    } else {
      setError('El número no puede tener más de 8 dígitos');
    }
  };

  const handleSearch = async () => {
    const eventoId : string | undefined = evento?._id
    if (inputValue.length <= 8) {
      try{
        const response = await axiosInstance.get(`/guest/${eventoId}/${inputValue}`)
        console.log(response.data)
        setGuest(response.data.guest)
      }catch (err: unknown) {
        let message: string;
      if ((err as ApiError).response?.data?.message) {
        message = (err as ApiError).response.data.message;
        setError(message)
      } else {
      setError('hubo un error en la busqueda')
      }
      }
    } else {
      setError('El número no puede tener más de 8 dígitos');
    }
    setInputValue('')
  };

  const checkGuest = async () => {
    if(guest){
      const guestId = guest._id
      try{
        await axiosInstance.put(`/guest/${guestId}`)
        setGuest(undefined)
      }catch(err :unknown){
        console.log(err)
      }
    } 
  }


  if (!isOpen) return null;

  if(guest){
    return (<GuestEncontrado guest={guest} checkGuest={checkGuest} onClose={onClose}/>)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-gray-800 text-white rounded-lg p-6 w-11/12 sm:w-96">
      
        <h2 className="text-xl mb-4 text-pink-500">Buscar Dni del invitado</h2>
        
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          className="w-full p-2 mb-4 bg-gray-700 border border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // Llama a tu función de búsqueda
            }
          }}
          placeholder="Ingresa el número"
        />
        
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className='min-h-20'>

        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleSearch}
            className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};


interface Encontrado {
  guest: {estado:string, dni:string, nombre:string};
  checkGuest: () => void;
  onClose: () => void;
}
const GuestEncontrado = ({guest,checkGuest,onClose }:Encontrado) =>{
  return(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
  <div className="bg-gray-900 text-white rounded-lg p-8 w-11/12 sm:w-96 shadow-lg">
    <h2 className="text-2xl font-semibold mb-4 text-center">Detalles del Invitado</h2>
    
    <div className="space-y-2 text-center">
      <p className="text-lg font-medium">Nombre: {guest.nombre}</p>
      <p className="text-lg font-medium">DNI: {guest.dni}</p>
      <p className={`text-sm font-semibold ${guest.estado === 'admitido' ? 'text-yellow-400' : 'text-green-400'}`}>
        {guest.estado === "admitido" ? "El invitado ya ha sido admitido" : "El invitado aún no ha ingresado"}
      </p>
    </div>

    <div className="mt-6 flex justify-center">
      {guest.estado === 'admitido' ? (
        <button
          onClick={onClose}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
        >
          Cerrar
        </button>
      ) : (
        <button
          onClick={checkGuest}
          className="bg-green-500 hover:bg-green-600 text-gray-900 font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
        >
          Admitir
        </button>
      )}
    </div>
  </div>
</div>
  )
}

export default ModalCheck;
