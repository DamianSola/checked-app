'use client'
import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const ModalAddGuest: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.length <= 8) {
        setInputValue(value);
        setError('');
      } else {
        setError('El número no puede tener más de 8 dígitos');
      }
    };
  
    const handleSearch = () => {
      if (inputValue.length <= 8) {
      //   onSearch(inputValue);
      } else {
        setError('El número no puede tener más de 8 dígitos');
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 ">
        <div className="bg-gray-800 text-white rounded-lg p-6 w-11/12 sm:w-96">
        
          <h2 className="text-xl mb-4 text-pink-500">Agregar invitado</h2>
          <input
            type="text"
            className="w-full p-2 mb-4 bg-gray-700 border border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Nombre completo"
            />
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full p-2 mb-4 bg-gray-700 border border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Agregar DNI"
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
              Agregar
            </button>
           
          </div>
        </div>
      </div>
    );
};

export default ModalAddGuest;