// components/CustomAlert.tsx
"use client";
import React, { useEffect } from 'react';

interface CustomAlertProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info' | string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, type, onClose }) => {
  let alertStyles = '';

  switch (type) {
    case 'success':
      alertStyles = 'bg-green-100 border-green-400 text-green-700';
      break;
    case 'error':
      alertStyles = 'bg-red-100 border-red-400 text-red-700';
      break;
    case 'warning':
      alertStyles = 'bg-yellow-100 border-yellow-400 text-yellow-700';
      break;
    case 'info':
      alertStyles = 'bg-blue-100 border-blue-400 text-blue-700';
      break;
    default:
      alertStyles = 'bg-gray-100 border-gray-400 text-gray-700';
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // 3 segundos

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta antes
  }, [onClose]);

  return (
    <div className={`border-l-4 p-4 ${alertStyles} rounded-md shadow-md`} role="alert">
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button onClick={onClose} className="text-gray-900 ml-4">
          &times;
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;

