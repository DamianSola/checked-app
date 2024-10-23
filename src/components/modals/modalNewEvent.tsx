import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEvent: (eventData: { nombre: string; fecha: string; lugar: string }) => void;
}

const EventModal: React.FC<ModalProps> = ({ isOpen, onClose, onCreateEvent }) => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [lugar, setLugar] = useState('');

  const handleCreateEvent = () => {
    if (nombre && fecha && lugar) {
      onCreateEvent({ nombre, fecha, lugar });
      onClose();
    } else {
      alert('Por favor completa todos los campos.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl text-pink-500 mb-4">Crear Evento</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Nombre del Evento</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Nombre del evento"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Lugar</label>
            <input
              type="text"
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Lugar del evento"
            />
          </div>
        </form>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 text-gray-300 py-2 px-4 rounded-md hover:bg-gray-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleCreateEvent}
            className="bg-pink-500 text-gray-900 py-2 px-4 rounded-md hover:bg-pink-400 transition-colors"
          >
            Crear Evento
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
