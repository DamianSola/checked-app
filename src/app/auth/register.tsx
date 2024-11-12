import { useForm, SubmitHandler} from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

interface RegisterProps {
  changeLogin: () => void;
}

interface DataForm{
  email: string;
  password: string;
  name: string;
}

const Register: React.FC<RegisterProps> = ({ changeLogin }) => {
  const { register,handleSubmit } =  useForm<DataForm>();
  const { register: registerUser } =  useAuth() ?? {};


  const onSubmit : SubmitHandler<DataForm> =  async (data) => {
    const { email, password, name } = data;

    try{
      await registerUser(email, password, name);
    }catch{
     alert('hubo un error')
    }
  };

  return (
    <div className="container mx-auto max-w-80 bg-gray-900 p-6 rounded-md shadow-lg my-6">
      <h2 className="text-2xl mb-4 text-pink-500">Registrarse</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          {...register('name', { required: true })}
          className="border border-gray-700 bg-gray-800 text-gray-300 p-2 w-full rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
          className="border border-gray-700 bg-gray-800 text-gray-300 p-2 w-full mt-4 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
          className="border border-gray-700 bg-gray-800 text-gray-300 p-2 w-full mt-4 rounded-md"
        />
        <button
          type="submit"
          className="bg-pink-500 text-gray-900 p-2 mt-4 w-full rounded-full shadow-md"
        >
          Registrarse
        </button>
        {/* Aquí llamas a la función pasada como prop cuando se hace clic */}
       
      </form>

      <button
          type="button"  // Cambié el type a "button" para evitar confusión con el submit
          onClick={changeLogin}
          // className="bg-gray-800 text-pink-500 p-2 mt-4 w-full rounded-full border border-pink-500 shadow-md"
          className="text-gray-300 cursor-pointer mt-4 w-full hover:text-pink-500 py-2"
        >
          Iniciar sesión
        </button>
    </div>
  );
};

export default Register;


