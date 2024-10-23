'use client'
import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAuth: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800">
      <div className="bg-gray-800 text-white rounded-lg p-6 w-11/12 sm:w-96">
        
      </div>
    </div>
  );
};

export default ModalAuth;