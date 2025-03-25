'use client'
import './globals.css';
import FreeCard from '@/components/planes/freeCard';
import PremiumCard from '@/components/planes/premiumCard';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ClipLoader } from "react-spinners"; // Importamos el spinner
import phone from "../images/phone.png"
import phone2 from "../images/phone2.png"
import phone3 from "../images/phone3.png"
import mac from "../images/mac.png"

const apiUrl : string | undefined = process.env.NEXT_PUBLIC_API_URL

console.log(apiUrl)

const MyApp = () => {
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Manejo de errores
  const [showFirstSet, setShowFirstSet] = useState<boolean>(true); // Estado para alternar imágenes

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstSet(prev => !prev);
    }, 3000); // Cambia las imágenes cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      if (!apiUrl) {
        throw new Error("La URL de la API no está definida");
      }
      const response = await fetch(`${apiUrl}/listen`);
      if (response.status !== 200) {
        throw new Error("Error en la API");
      }
      
    } catch (err: unknown) {
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
      
      <section className="p-2 block md:flex justify-center mx-auto transition-opacity duration-3000">
        {showFirstSet ? (
          <>
            <Image src={mac} width={600} height={100} alt='mac' className="transition-all transition-discrete not-peer-has-checked:opacity-0 peer-has-checked:block duration-5000"/>  
            <Image src={phone2} width={200} height={100} alt='phone2' className="m-auto my-4 transition-all transition-discrete not-peer-has-checked:opacity-0 peer-has-checked:block duration-5000"/>
          </>
        ) : (
          <>
            <Image src={phone} width={200} height={100} alt='phone' className='m-auto my-4 transition-all transition-discrete not-peer-has-checked:opacity-0 peer-has-checked:block duration-5000'/>
            <Image src={phone3} width={200} height={100} alt='phone3' className="m-auto my-4 transition-all transition-discrete not-peer-has-checked:opacity-0 peer-has-checked:block duration-5000"/>
          </>
        )}
      </section>
    </div>
  )
}

export default MyApp;
