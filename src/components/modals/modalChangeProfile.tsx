'use client'
import React from 'react';

interface ModalChangeProps {
  onClose: () => void;
  handleSubmit: () => void;
  open: boolean;
  userData: {password:string, email:string, username:string}
}

const ModalAlert: React.FC<ModalChangeProps> = ({open, onClose, handleSubmit, userData }) => {


    if(!open) return null;

    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-gray-900 text-white rounded-lg p-6 w-11/12 sm:w-96 ">
                <h2 className="text-lg font-bold text-pink-500 mb-4">¿Realizar cambios?</h2>
                <label className='text-pink-400 flex'>Nombre de usuario: <p className='text-white mx-2'>{userData.username}</p></label>
                <label className='text-pink-400 flex'>email: <p className='text-white mx-2'>{userData.email}</p></label>
                <label className='text-pink-400 flex'>contraseña:<p className='text-white mx-2'>{userData.password}</p></label>

                <div className="flex justify-end space-x-4 mt-4">
                <button
                    onClick={onClose}
                    className="py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleSubmit}
                    className="py-2 px-4 bg-pink-500 text-white rounded hover:bg-pink-600"
                >
                    Guardar
                </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAlert;