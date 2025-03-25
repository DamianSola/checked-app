'use client'
import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalManyGuest: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [entries, setEntries] = useState<{ name: string; dni: string }[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddEntries = () => {
    const newEntries = inputValue.split(',').map(entry => {
      const [name, dni] = entry.trim().split(' ');
      return { name, dni };
    });

    const uniqueEntries = Array.from(new Map(newEntries.map(entry => [entry.dni, entry])).values());
    setEntries(uniqueEntries);
    setInputValue(''); // Limpiar el input después de agregar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold">Agregar Lista de Nombres y DNIs</h2>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Nombre DNI, Nombre DNI"
          className="border p-2 mr-2 w-full"
        />
        <button onClick={handleAddEntries} className="bg-blue-500 text-white p-2">
          Agregar
        </button>
        <button onClick={onClose} className="bg-red-500 text-white p-2 ml-2">
          Cerrar
        </button>

        <div className="mt-4">
          <h3 className="text-md font-semibold">Lista de Nombres y DNIs:</h3>
          <ul>
            {entries.map((entry, index) => (
              <li key={index}>
                <strong>Nombre:</strong> {entry.name} | <strong>DNI:</strong> {entry.dni}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModalManyGuest;