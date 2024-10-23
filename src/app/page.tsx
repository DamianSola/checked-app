// import { AuthProvider } from '../context/AuthContext';
import NavBar from '@/components/navBars/navBar';
import './globals.css';
import FreeCard from '@/components/planes/freeCard';
import PremiumCard from '@/components/planes/premiumCard';

// function MyApp({ Component, pageProps }: any) {
//   return (
//     <AuthProvider>
//       <Component {...pageProps} />
//     </AuthProvider>
//   );
// }

// export default MyApp;


const MyApp = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <header className="flex-grow text-center justify-center">
        <h1 className="text-4xl text-pink-500 font-bold mb-4">CHECKED</h1>
        <p className="text-gray-400 mb-6 text-lg w-2/3 m-auto">
          Checked es la manera mas facil de organizar un evento, armar listas y controntrolar asistencia en el momento
        </p>
      </header>
      <section className='hidden p-6 justify-evenly w-full m-auto'>
        <FreeCard/>
        <PremiumCard/>
      </section>
    </div>
  )
}

export default MyApp;
