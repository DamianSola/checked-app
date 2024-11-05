import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('El nombre es requerido');
            return;
        }
        onCreate(name);
        setName('');
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg text-pink-500 font-bold mb-4">Crear Nueva Lista</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`text-white border rounded w-full bg-gray-600 py-2 px-3 ${
                                error ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Ingrese el nombre"
                        />
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                        >
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;