'use client'
import './globals.css';
import FreeCard from '@/components/planes/freeCard';
import PremiumCard from '@/components/planes/premiumCard';
import { useState, useEffect } from 'react';
import { ClipLoader } from "react-spinners"; // Importamos el spinner

interface ApiResponse {
  status: number; // Cambiá los campos según los datos que retorna tu API
  statustext: string;
 
}

const apiUrl : string | undefined = process.env.NEXT_PUBLIC_API_URL

console.log(apiUrl)

const MyApp = () => {
  const [data, setData] = useState<ApiResponse | null>(null); // Datos de la API
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Manejo de errores

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      if (!apiUrl) {
        throw new Error("La URL de la API no está definida");
      }
      const response = await fetch(`${apiUrl}/listen`);
      console.log(response)
      if (response.status !== 200) {
        throw new Error("Error en la API");
      }
      const result: ApiResponse = await response.json(); // Asegurate de que coincida con `ApiResponse`
      setData(result);
    } catch (err: unknown) {
      // Verificamos que el error tenga un mensaje
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">
      <header className="flex-grow text-center">
        <h1 className="text-5xl text-pink-500 font-extrabold mb-6">CHECKED</h1>
        {loading && (
          <div className="flex flex-col items-center my-6">
            <ClipLoader color="#007BFF" size={50} />
            <p className="text-gray-300 mt-2">Reiniciando el servidor. Esto puede tardar varios segundos.</p>
          </div>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="text-gray-400 mb-8 text-lg max-w-md mx-auto">
          Checked es la manera más fácil de organizar un evento, armar listas y controlar asistencia en el momento.
        </p>
      </header>
      <section className="hidden p-6 justify-evenly w-full max-w-4xl mx-auto">
        <FreeCard />
        <PremiumCard />
      </section>
    </div>
  
  )
}

export default MyApp;
