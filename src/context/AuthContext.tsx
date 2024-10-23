'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import Cookies from 'js-cookie'; // Importar js-cookie

interface AuthContextProps {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get('user');
    const tokenCookie = Cookies.get('token')
    // console.log(tokenCookie)
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

      // Guardar token y user en las cookies
      Cookies.set('token', token, { expires: 7 }); // Token expira en 7 días
      Cookies.set('user', JSON.stringify(user), { expires: 7 });

      setUser(user); // Actualizar el estado del usuario

      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response?.data.message);
      
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
      Cookies.set('token', token, { expires: 7 });
      Cookies.set('user', JSON.stringify(user), { expires: 7 });

      setUser(user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Register failed:', error.response?.data.message);
    }
  };

  const logout = () => {
    // Eliminar cookies al cerrar sesión
    Cookies.remove('token');
    Cookies.remove('user');

    setUser(null);
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
