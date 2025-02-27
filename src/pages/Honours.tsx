import React from "react";
import First from "../assets/trophies/1974.svg";
import Huemul from "../assets/trophies/huemul.svg";

const Honours = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Títulos de Huachipato
      </h1>
      <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
        <div className="flex items-center bg-gray-800 p-4 rounded-lg w-9/10 max-w-2xl">
          <img
            src={First}
            alt="Campeón del Sur"
            className="w-24 h-24 mr-4 brightness-[.7]"
          />
          <div>
            <h2 className="text-xl font-semibold text-yellow-500">
              Campeón del Sur
            </h2>
            <p className="text-gray-300">
              En 1974, Huachipato hizo historia al consagrarse campeón de la
              Primera División de Chile, convirtiéndose en el primer y único
              equipo sureño en lograr el título en aquella época. Con una
              campaña memorable y un equipo lleno de garra, el acero dejó su
              huella en el fútbol chileno, demostrando que el sur también tenía
              un gigante.
            </p>
          </div>
        </div>

        <div className="flex items-center bg-gray-800 p-4 rounded-lg w-9/10 max-w-2xl">
          <img
            src={Huemul}
            alt="Segunda Estrella"
            className="w-24 h-24 mr-4 brightness-[.7]"
          />
          <div>
            <h2 className="text-xl font-semibold text-yellow-500">
              Segunda Estrella
            </h2>
            <p className="text-gray-300">
              En el Torneo Clausura 2012, Huachipato volvió a tocar la gloria
              después de 38 años. En una final inolvidable contra Unión
              Española, el equipo acerero forzó la definición a penales y con
              una actuación heroica se coronó campeón. Fue una noche mágica en
              Talcahuano, donde la hinchada celebró con orgullo la segunda
              estrella del club.
            </p>
          </div>
        </div>

        <div className="flex items-center bg-gray-800 p-4 rounded-lg w-9/10 max-w-2xl">
          <img
            src={Huemul}
            alt="Tercera Estrella"
            className="w-24 h-24 mr-4 brightness-[.7]"
          />
          <div>
            <h2 className="text-xl font-semibold text-yellow-500">
              Tercera Estrella
            </h2>
            <p className="text-gray-300">
              En el Torneo 2023, Huachipato volvió a escribir su nombre en la
              historia grande del fútbol chileno, logrando su tercer título de
              Primera División tras 11 años. Con un equipo sólido, una campaña
              impecable y un cierre de campeonato emocionante, el acero se
              consagró campeón en la última fecha.
            </p>
          </div>
        </div>

        {/* Agrega más títulos según sea necesario */}
      </div>
    </div>
  );
};

export default Honours;
