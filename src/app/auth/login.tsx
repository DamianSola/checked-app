import { useState } from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';

interface RegisterProps {
  changeRegister: () => void;
}

interface DataForm {
  email: string;
  password: string;
}

const Login: React.FC<RegisterProps> = ({ changeRegister }) => {
  
  const { register, handleSubmit} = useForm<DataForm>();
  // const { login } = useAuth();
  const { login } = useAuth() ?? {};


  // Estado para manejar el error de login
  const [error, setError] = useState<string | null>(null);
  
  // Estado para mostrar/ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit : SubmitHandler<DataForm>  = async (data) => {
    const { email, password } = data ;

    setError(null);
    const response : unknown = await login(email, password);
    if(response === 400) setError('Credenciales incorrectas. Inténtalo de nuevo.');
  };

  return (
    <div className="container mx-auto max-w-80 bg-gray-900 p-6 rounded-md shadow-lg ">
      <h2 className="text-2xl mb-4 text-pink-500">Iniciar sesión</h2>

      {/* Mostrar mensaje de error si lo hay */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
          className="border border-gray-700 bg-gray-800 text-gray-300 p-2 w-full rounded-md"
        />

        <div className="relative mt-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password', { required: true })}
            className="border border-gray-700 bg-gray-800 text-gray-300 p-2 w-full rounded-md"
          />
          {/* Botón para mostrar/ocultar contraseña */}
          <button
            type="button"
            className="absolute inset-y-0 right-2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        <button
          type="submit"
          className="bg-pink-500 text-gray-900 p-2 mt-4 w-full rounded-full shadow-md"
        >
          Iniciar sesión
        </button>
      </form>

      <button
        className="text-gray-300 cursor-pointer mt-4 w-full hover:text-pink-500 py-2"
        onClick={changeRegister}
      >
        Registrarse
      </button>
    </div>
  );
};

export default Login;
