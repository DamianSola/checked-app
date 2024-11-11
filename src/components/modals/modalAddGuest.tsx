'use client'
import React, { useState } from 'react';
import CustomAlert from '../CustomAlert';
import axiosInstance from '@/utils/axiosInstance';
import { useEvento } from '@/components/eventContext'


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  listId: string;
  listName: string;
}

interface AlertValues {
  show: boolean;
  message: string;
  types: string;
}

interface inputValues {
  nombre: string;
  dni: number | string;
}

// interface Evento{
//   lugar: string;
//   nombre: string;
//   _id: string;
//   fecha: any

// }

const ModalAddGuest: React.FC<ModalProps> = ({ isOpen, onClose, listId, listName }) => {
  const [inputValue, setInputValue] = useState<inputValues>({ nombre: "", dni: "" });
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState<AlertValues>({
    show: false,
    message: '',
    types: ''
  });

  const { evento } = useEvento();

  const eventoId: any = evento?._id

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });

    // Validación del DNI para máximo 8 dígitos
    if (name === 'dni' && value.length > 8) {
      setError('El número no puede tener más de 8 dígitos');
    } else {
      setError('');
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nombre, dni } = inputValue;
    if (!nombre || !dni || dni.toString().length > 8) {
      setError('Por favor, complete todos los campos correctamente.');
      return;
    }

    try {
      const response = await axiosInstance.post('/guest', { nombre, dni, listaId: listId, eventoId });
      
      if(response.status === 200) setShowAlert({ show: true, message: response.data.message, types: 'success' });
      else setShowAlert({ show: true, message: response.data.message, types: 'error' })
      setInputValue({ nombre: "", dni: "" });  
      
    } catch (err: any) {
      setShowAlert({ show: true, message: err?.response?.data?.message, types: 'error' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-gray-800 text-white rounded-lg p-6 w-11/12 sm:w-96">
        {showAlert.show && (
          <CustomAlert
            message={showAlert.message}
            type={showAlert.types}
            onClose={() => setShowAlert({ ...showAlert, show: false })}
          />
        )}

        <h2 className="text-xl mb-4 text-pink-500">{`Agregar invitado a "${listName}"`}</h2>
        <input
          type="text"
          name="nombre"
          value={inputValue.nombre}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 bg-gray-700 border border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Nombre completo"
        />
        <input
          type="number"
          name="dni"
          value={inputValue.dni}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 bg-gray-700 border border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Agregar DNI"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

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
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddGuest;
