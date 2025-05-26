'use client'
import './globals.css';
// import FreeCard from '@/components/planes/freeCard';
// import PremiumCard from '@/components/planes/premiumCard';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { ClipLoader } from "react-spinners"; // Importamos el spinner
import phone from "../images/phone.png"
import mac from "../images/mac.png"

const apiUrl : string | undefined = process.env.NEXT_PUBLIC_API_URL

console.log(apiUrl)

const MyApp = () => {
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Manejo de errores

  const router = useRouter();


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
    <div>

    <div className="bg-gray-900 min-h-screen flex flex-col md:flex-row items-center w-full justify-center p-6">
      <div className="grow md:text-left md:w-1/2 py-4 md:p-8">
        {/* <h1 className="text-5xl text-pink-500 font-extrabold mb-6">CHECKED</h1> */}
        {loading && (
          <div className="flex flex-col items-center my-6">
            <ClipLoader color="#007BFF" size={50} />
            <p className="text-gray-300 mt-2">Reiniciando el servidor. Esto puede tardar varios segundos.</p>
          </div>
        )}
        <p className='text-gray-100 font-bold text-5xl md:text-4xl'>Organiza tus eventos con facilidad</p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="text-gray-400 my-6 md:mt-2 text-lg max-w-md ">
          Checked es la manera más fácil de organizar un evento, armar listas y controlar asistencia en el momento.
        </p>
         <button onClick={() => router.push('/dasboard')} className="button-global bg-green-500 font-bold text-white hover:bg-green-600 hover:text-gray-100">
            Crear evento
          </button>
      </div>
      
      <section className="grow p-2 block md:flex justify-center mx-auto md:w-1/2 transition-opacity duration-3000">
         <div className='flex items-center justify-center relative'>
            <Image src={phone} width={150} height={50} alt='phone' className='w-20 md:w-32 m-4 -mr-10 relative z-10'/>
            <Image src={mac} width={500} height={100} alt='mac' className="w-80 md:w-96 -ml-10 -mt-20 m-4 relative z-0"/>  
          </div>        
      </section>
    </div>
    </div>

  )
}

export default MyApp;
