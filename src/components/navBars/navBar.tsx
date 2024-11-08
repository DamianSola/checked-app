'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const closeSession = () => {
    logout();
    setOpen(false);
  };

  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-pink-500 font-bold text-2xl">
        <a href="/">Checked</a>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-4 items-center">
        {!user && (
          <a href="/dashboard" className="text-gray-300 hover:text-pink-500">
            Crear evento
          </a>
        )}
        {user && (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setOpen(!open)}
              className="bg-pink-500 text-gray-900 py-2 px-4 rounded-full shadow-md"
            >
              {user.nombre}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setOpen(!open)} className="text-gray-300 hover:text-pink-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu - Sliding Drawer */}
      {open && (
        <div className="fixed inset-0 bg-gray-900 bg-transparent flex justify-end ">
          <div className="w-1/2 md:w-1/4 bg-gray-800 h-full p-6 space-y-6 transform transition-transform duration-700">
            <button
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-pink-500 text-right"
            >
              &times;
            </button>
            <div className="flex flex-col items-start space-y-4 text-gray-300">
              {!user && (
                <a href="/dashboard" className="text-gray-300 hover:text-pink-500">
                  Crear evento
                </a>
              )}
              {user && (
                <>
                  <p className="text-pink-500 font-semibold text-md md:text-xl">
                    {user.nombre}
                  </p>
                  <a href="/dashboard" className="text-gray-300 hover:text-pink-500">
                    Dashboard
                  </a><a href="/dashboard#perfil" className="text-gray-300 hover:text-pink-500">
                    Perfil
                  </a>
                  <button
                    onClick={closeSession}
                    className="text-red-600 hover:text-red-500 font-semibold"
                  >
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
