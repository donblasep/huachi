import React from "react";

const squads = [
  { year: "2023", image: "./src/assets/plantel/2023.webp" },
  { year: "2022", image: "./src/assets/plantel/2022.webp" },
  { year: "2021", image: "./src/assets/plantel/2021.webp" },
  // Agrega más años y sus respectivas imágenes aquí
];

const Squad = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-8">Planteles de Huachipato</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {squads.map((squad) => (
          <div key={squad.year} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img src={squad.image} alt={`Plantel ${squad.year}`} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-white">{squad.year}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Squad;
