'use client'
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const NavBar = () => {
  
  const [open, setOpen] = useState(false);
  const {user, logout} = useAuth()

  const closeSession = () => {
    logout()
    setOpen(false)
  }

  
  useEffect(() => {
  },[])
  // const router = useRouter()


    return (
      <nav className="bg-gray-900 p-4 flex justify-between items-center">
        <div className="text-pink-500 font-bold text-2xl">
        <a href="/">Checked</a>
          
          </div>
        <div className="hidden md:flex space-x-4 items-center">
          {/* <a href="/" className="text-gray-300 hover:text-pink-500">Inicio</a>
          <a href="/about" className="text-gray-300 hover:text-pink-500">Planes</a> */}
         {!user && <a href="/dashboard" className="text-gray-300 hover:text-pink-500">Crear evento</a>}
          
          {/* <button className="bg-pink-500 text-gray-900 py-2 px-4 rounded-full shadow-md">
            Iniciar sesion
          </button> */}
          {user ? <button 
            onClick={() => setOpen(!open)}
            className="bg-pink-500 text-gray-900 py-2 px-4 rounded-full shadow-md">{user.nombre}</button>:
          <button className="bg-pink-500 text-gray-900 py-2 px-4 rounded-full shadow-md">
            Iniciar sesion
          </button>
          }
          {open && (
            <ul className="">
              <li
                className="text-gray-300 cursor-pointer hover:text-pink-500 py-2"
                onClick={closeSession}
              >
                Cerrar sesión
              </li>
            </ul>
          )}
        </div>
        <div className="md:hidden">
          <button className="text-gray-300 hover:text-pink-500" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5" />
            </svg>
          </button>
        </div>
      </nav>
    );
  }
  
  export default NavBar;
  