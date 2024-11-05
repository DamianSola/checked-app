'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Evento {
  _id: string;
  nombre: string;
  fecha: string;
  lugar: string;
  // Agrega aquí otros campos del evento según tu esquema
}

interface EventoContextProps {
  evento: Evento | null;
  setEvento: (evento: Evento) => void;
}

const EventoContext = createContext<EventoContextProps | undefined>(undefined);

interface EventoProviderProps {
  children: ReactNode;
}

export const EventoProvider: React.FC<EventoProviderProps> = ({ children }) => {
  const [evento, setEvento] = useState<Evento | null>(null);

  return (
    <EventoContext.Provider value={{ evento, setEvento }}>
      {children}
    </EventoContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useEvento = (): EventoContextProps => {
  const context = useContext(EventoContext);
  if (!context) {
    throw new Error('useEvento debe ser usado dentro de un EventoProvider');
  }
  return context;
};
