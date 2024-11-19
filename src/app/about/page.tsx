import React from 'react';

const About: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-pink-500 mb-4">Acerca de esta Aplicación</h1>
        <p className="mb-4">
          Esta aplicación ha sido diseñada para gestionar listas de invitados de manera eficiente. Permite 
          registrar, buscar y administrar invitados en eventos, asegurando un control preciso y organizado.
        </p>
        <h2 className="text-2xl font-bold text-pink-500 mb-2">Tecnologías Utilizadas</h2>
        <p className="mb-4">
          La aplicación ha sido desarrollada utilizando tecnologías modernas como <strong>Next.js</strong>, 
          <strong> React</strong>, <strong>TypeScript</strong>, <strong>Node.js</strong>, y <strong>MongoDB</strong>. 
          Además, está estilizada con <strong>Tailwind CSS</strong>, garantizando una experiencia de usuario fluida y atractiva.
        </p>
        <h2 className="text-2xl font-bold text-pink-500 mb-2">Confidencialidad de los Datos</h2>
        <p>
          Nos tomamos muy en serio la privacidad de los datos. Toda la información proporcionada será 
          tratada de manera confidencial y nunca será compartida ni difundida bajo ninguna circunstancia.
        </p>
      </div>
    </section>
  );
};

export default About;
