'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import Cookies from 'js-cookie'; // Importar js-cookie


interface User {
  _id: string;
  email: string;
  nombre: string;
  rol: string;
  password: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<unknown>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<unknown>;
}



const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userCookie: string | undefined = Cookies.get('user');
    Cookies.get('token')
    
    let user;
    
    if (userCookie) {
      user = JSON.parse(userCookie);
      // console.log(user) // Convertir el valor de la cookie a un objeto JSON
    } else {
      user = null;
    }
    setUser(user)
   
  },[])


  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/users/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      Cookies.set('token', token,  { expires: 5 / 24 }); // Token expira en 7 días
      Cookies.set('user', JSON.stringify(user),  { expires: 5 / 24 });

      setUser(user); // Actualizar el estado del usuario

      router.push('/dashboard');
      return response
    } catch (error:unknown) {
      return(error);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await axiosInstance.post('/users/register', {
        email,
        password,
        nombre: name,
      });

      const { token, user } = response.data;
    

      // Guardar token y user en las cookies
      Cookies.set('token', token, { expires: 5 / 24 });
      Cookies.set('user', JSON.stringify({
        nombre:user.nombre, email:user.email, password: password, rol:user.rol, _id:user._id
      }), { expires: 5 / 24 });

      setUser(user);
      router.push('/dashboard');
    } catch (error:unknown) {
      console.error('Register failed:', error);

    }
  };

  const logout = async () => {
    // Eliminar cookies al cerrar sesión
    Cookies.remove('token');
    Cookies.remove('user'); // falta cerrar sesion en el backend
    try{

      await axiosInstance.post('/users/logout');
    }catch(error:unknown){
      console.error('Register failed:', error);
    }

    setUser(null);
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>{
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
};
