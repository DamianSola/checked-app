'use client'
import { useState, useEffect } from 'react';
import ModalAlert from '../modals/modalChangeProfile';
import axiosInstance from '@/utils/axiosInstance';
import { useAuth } from '@/context/AuthContext';

interface UserProfile {
  username: string;
  email: string;
  password: string;
}

interface User{
    nombre: string;
    email: string;
    password: string;
    _id: string
}

interface PropsUser {
    userData: User | any

}

const Profile = ({userData}:PropsUser) => {

  const {logout, login } = useAuth();


  const [user, setUser] = useState<UserProfile>({
    username: userData.nombre,
    email: userData.email,
    password: userData.password,
  });
  
  const [editUser, setEditUser] = useState<UserProfile>(user);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const[ openModal ,setOpenModal ]= useState<boolean>(false)

  useEffect(() => {
    // Solo mostrar el botón si hubo cambios en los datos
    setIsEditing(
      user.username !== editUser.username ||
      user.email !== editUser.email ||
      user.password !== editUser.password
    );
  }, [editUser, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser((prevEditUser) => ({ ...prevEditUser, [name]: value }));
  };

  const handleSave = async () => {
    try{
      const response: any = await axiosInstance.put(`users/${userData._id}`, editUser)
      alert(response.data.message)
      console.log(response.data)
      setUser(editUser);  // Guardar los cambios
      setIsEditing(false);  // Ocultar el botón de guardar
      setOpenModal(false)
      logout()
      await login(response.data.user.email, response.data.user.password)
      
    }catch(error: any){
      alert(error)
    }
    
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-lg  bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-4">
      <ModalAlert open={openModal} onClose={() => setOpenModal(false)} handleSubmit={handleSave} userData={editUser}/>
      <h2 className="text-2xl font-bold text-pink-500 mb-4">Perfil de Usuario</h2>
      
      <div className="grid grid-cols-2 gap-4 items-center">
        {/* Nombre de Usuario */}
        <label className="text-gray-300 text-sm">Nombre de Usuario:</label>
        <input
          type="text"
          name="username"
          value={editUser.username}
          onChange={handleInputChange}
          className="p-2 rounded bg-gray-700 text-white"
        />

        {/* Email */}
        <label className="text-gray-300 text-sm">Email:</label>
        <input
          type="email"
          name="email"
          value={editUser.email}
          onChange={handleInputChange}
          className="p-2 rounded bg-gray-700 text-white"
        />

        {/* Contraseña */}
        <label className="text-gray-300 text-sm">Contraseña:</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={editUser.password}
            onChange={handleInputChange}
            className="p-2 rounded bg-gray-700 text-white w-full"
          />
          <button
            onClick={toggleShowPassword}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
      </div>

      {/* Botón Guardar Cambios */}
      {isEditing && (
        <div className="text-right">
          <button
            onClick={() => setOpenModal(true)}
            className="mt-4 bg-green-500 text-gray-900 font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Guardar Cambios
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
