// ModalAlert.tsx
'use client'
import React from 'react';

interface ModalAlertProps {
  onClose: () => void;
  handleDelete: (id:string | undefined) => void;
  open: boolean
}

const ModalAlert: React.FC<ModalAlertProps> = ({open, onClose, handleDelete }) => {


    if(!open) return null;

    return (
        <div className="fixed inset-0 flex z-50 items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-gray-900 text-white rounded-lg p-6 w-11/12 sm:w-96">
                <h2 className="text-lg font-bold text-pink-500 mb-4">¿Seguro que quieres eliminar?</h2>
                <p className="text-sm text-gray-400 mb-6">Esta acción no se puede deshacer.</p>

                <div className="flex justify-end space-x-4">
                <button
                    onClick={onClose}
                    className="py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                    Cancelar
                </button>
                <button
                    onClick={() => handleDelete("hola")}
                    className="py-2 px-4 bg-pink-500 text-white rounded hover:bg-pink-600"
                >
                    Eliminar
                </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAlert;
