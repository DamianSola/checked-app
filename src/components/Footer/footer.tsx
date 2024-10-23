


const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 p-6">
        <div className="container mx-auto flex flex-col items-center">
          <div className="my-6 flex space-x-4">
            <a href="/contact" className="text-pink-500  py-2 px-4 rounded-full shadow-md">
              Contacto
            </a>
            <a href="/about" className="text-pink-500  py-2 px-4 rounded-full shadow-md">
              Acerca de
            </a>
            <a href="/" className="text-pink-500  py-2 px-4 rounded-full shadow-md">
              Ir a Inicio
            </a>
          </div>
          <div className="space-y-4 text-center">
            <p>&copy; 2024 Checked. Todos los derechos reservados.</p>
            <a href="/privacy" className="text-pink-500 hover:underline">Política de Privacidad</a>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  