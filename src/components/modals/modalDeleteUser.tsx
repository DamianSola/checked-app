import { useState, ChangeEvent } from 'react';

interface ModalProps{
    onClose: () => void;
    onDelete: () => void;
    isOpen: boolean
}

const DeleteAccountModal = ({isOpen, onClose, onDelete }: ModalProps) => {
    const [confirmationText, setConfirmationText] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Función para manejar el cambio en el input
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setConfirmationText(value);
        
        setIsConfirmed(value === 'deseo borrar mi cuenta');
    };

    if(!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-gray-900 rounded-lg p-6 max-w-sm w-full">
                <h2 className="text-xl font-semibold text-red-600 mb-4">
                    Seguro que quieres borrar la cuenta?
                </h2>
                <p className="text-gray-400 mb-4">
                    No podrás recuperar los datos.
                </p>
                <p className="text-gray-300 mb-4">
                    Escribe <strong>{'"deseo borrar mi cuenta"'}</strong> para confirmar.
                </p>
                <input
                    type="text"
                    placeholder="Escribe aquí"
                    value={confirmationText}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-full mb-4"
                />
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-pink-500 text-gray-900 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onDelete}
                        disabled={!isConfirmed}
                        className={`px-4 py-2 text-white rounded ${
                            isConfirmed ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Borrar mi cuenta
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
