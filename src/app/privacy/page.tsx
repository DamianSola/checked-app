import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-pink-500 mb-4">Políticas de Privacidad</h1>
        <p className="mb-4">
          Tu privacidad es nuestra prioridad. En esta aplicación, trabajamos para garantizar que tu información personal sea tratada de manera segura y confidencial.
        </p>
        <h2 className="text-2xl font-bold text-pink-500 mb-2">Recolección de Datos</h2>
        <p className="mb-4">
          Los datos recopilados incluyen información necesaria para el funcionamiento de esta aplicación, como nombres, direcciones de correo electrónico y números de identificación, con el único propósito de gestionar eventos de manera eficiente.
        </p>
        <h2 className="text-2xl font-bold text-pink-500 mb-2">Uso de la Información</h2>
        <p className="mb-4">
          La información proporcionada será utilizada exclusivamente para los fines previstos en la aplicación. No compartimos ni vendemos tus datos a terceros bajo ninguna circunstancia.
        </p>
        <h2 className="text-2xl font-bold text-pink-500 mb-2">Seguridad</h2>
        <p className="mb-4">
          Implementamos medidas de seguridad avanzadas para proteger tu información personal contra accesos no autorizados, alteraciones o divulgación.
        </p>
        <h2 className="text-2xl font-bold text-pink-500 mb-2">Consentimiento</h2>
        <p className="mb-4">
          Al usar esta aplicación, aceptas estas políticas de privacidad. Nos reservamos el derecho de actualizar esta política cuando sea necesario, notificando cualquier cambio significativo.
        </p>
        <p className="text-sm text-gray-400">
          Última actualización: noviembre de 2024
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
