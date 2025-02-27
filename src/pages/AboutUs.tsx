import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        Sobre Nosotros
      </h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <p className="text-gray-300 mb-4">
          Somos un grupo de hinchas apasionados de Huachipato que hemos creado
          un sitio web dedicado al club. Nuestro objetivo es brindar un espacio
          para la comunidad acerera, donde puedan informarse y
          compartir su pasión por el acero.
        </p>
      </div>
      <h2 className="text-3xl font-semibold text-white mt-6 mb-2">
        Nuestra Misión
      </h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
        <p className="text-gray-300 mb-4">
          Buscamos fortalecer el sentido de identidad y unión entre los hinchas
          de Huachipato, ofreciendo contenido actualizado sobre el equipo y su
          historia. Queremos mantener viva la pasión
          acerera.
        </p>
      </div>
      <h2 className="text-3xl font-semibold text-white mt-6 mb-2">
        Nuestros Valores
      </h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <ul className="text-gray-300 list-disc list-inside">
          <li>
            <strong>Pasión:</strong> Llevamos los colores de Huachipato en el
            corazón.
          </li>
          <li>
            <strong>Compromiso:</strong> Dedicación total a la comunidad
            acerera.
          </li>
          <li>
            <strong>Identidad:</strong> Valoramos y difundimos la historia del
            club.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
