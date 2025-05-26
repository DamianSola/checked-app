import React, { useState } from 'react';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (name: string, isOpen: boolean) => void;
    currentName: string;
    currentIsOpen: boolean;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onUpdate, currentName, currentIsOpen }) => {
    const [name, setName] = useState(currentName);
    const [isOpenState, setIsOpenState] = useState(currentIsOpen);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            // setError('El nombre es requerido');
            setName(currentName)
            return;
        }
        console.log(name)
        onUpdate(name, isOpenState);
        setName('');
        setIsOpenState(false);
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-pink-500 text-lg font-bold mb-4">Modificar Lista</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-200 mb-2" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`border bg-gray-600 rounded w-full py-2 px-3 ${
                                error ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Ingrese el nuevo nombre"
                        />
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>
                    <div className="mb-4">
    <label className="block text-gray-200 mb-2" htmlFor="isOpen">
        ¿Lista Abierta?
    </label>
    <div className="flex items-center">
        <span className={`mr-2 ${isOpenState ? 'text-pink-500' : 'text-gray-500'}`}>
            {isOpenState ? 'Sí' : 'No'}
        </span>
        <button
            id="isOpen"
            onClick={() => setIsOpenState(!isOpenState)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out ${
                isOpenState ? 'bg-pink-500' : 'bg-gray-300'
            }`}
        >
            <span
                className={`absolute w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                    isOpenState ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    </div>
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
                            Modificar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;