import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-6xl w-full bg-gray-900 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-100 text-center mb-4">
          Contacto
        </h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium text-gray-100">Nombre:</h2>
            <p className="text-gray-200">Damian Sola Zambrano</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-100">País:</h2>
            <p className="text-gray-200">Argentina</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-100">Email:</h2>
            <a
              href="mailto:daminasola99@gmail.com"
              className="text-pink-500 hover:underline"
            >
              daminasola99@gmail.com
            </a>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-100">LinkedIn:</h2>
            <a
              href="https://www.linkedin.com/in/damiansola/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              linkedin.com/in/damiansola
            </a>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-100">Sobre Mi</h2>
            <p  className=" text-gray-200">
              Soy un desarrollador web apasionado por la tecnología, con experiencia en la creación de aplicaciones web responsivas y escalables. Tengo 25 años, soy de Salta Capital, y mientras busco un trabajo estable, no dejo de programar y especializarme en mi campo.

              Estudié programación en la Universidad Nacional de Salta y obtuve mi certificación como desarrollador Full Stack en Soy Henry. Posteriormente, continué ampliando mis conocimientos de manera autodidacta, explorando nuevas tecnologías y profundizando en el mundo del desarrollo de software.

              Me motiva mejorar constantemente mis habilidades y encontrar soluciones innovadoras. Esta aplicación es una muestra de mi compromiso y entusiasmo por mi profesión.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
