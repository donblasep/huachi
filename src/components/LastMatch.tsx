import React, { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";

// Define la interfaz para el último partido
interface LastMatch {
  dateEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: number;
  intAwayScore: number;
  // Agrega otras propiedades que necesites
}

// Cargar los logos de los clubes de manera perezosa
const logoFiles = import.meta.glob("../assets/logos/*.webp");

const loadLogos = async () => {
  const logos: { [key: string]: string } = {};

  for (const path in logoFiles) {
    const teamName = path.replace("../assets/logos/", "").replace(".webp", "");
    const normalizedTeamName = normalizeTeamName(teamName);
    console.log(`Attempting to load logo for: ${normalizedTeamName}`);
    try {
      const logoModule = (await logoFiles[path]()) as { default: string };
      logos[normalizedTeamName] = logoModule.default;
      console.log(
        `Loaded logo for ${normalizedTeamName}: ${logoModule.default}`
      );
    } catch (error) {
      console.error(`Failed to load logo for ${normalizedTeamName}:`, error);
      // Manejo de caso donde el logo no se encuentra
      if (normalizedTeamName === "everton" || normalizedTeamName === "evertondeviñadelmar") {
        logos[normalizedTeamName] = "../assets/logos/everton.webp"; 
        console.log(`Using fallback logo for ${normalizedTeamName}: ../assets/logos/everton.webp`);
      }
    }
  }

  console.log("Logos loaded:", logos);
  return logos;
};

// Función para normalizar el nombre del equipo
const normalizeTeamName = (teamName: string) => {
  const normalized = teamName
    .replace(/ñ/g, "n")
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/í/g, "i")
    .replace(/ó/g, "o")
    .replace(/ú/g, "u")
    .replace(/ê/g, "e")
    .replace(/'/g, "")
    .toLowerCase()
    .replace(/\s+/g, "");
  console.log(`Normalized team name: ${teamName} -> ${normalized}`);
  return normalized;
};

const LastMatch = () => {
  const [lastMatch, setLastMatch] = useState<LastMatch | null>(null);
  const [logos, setLogos] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState(null);

  const fetchLastHuachipatoMatch = () => {
    fetch(
      "https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=Huachipato"
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.teams) throw new Error("Equipo no encontrado");

        let teamId = data.teams[0].idTeam;
        return fetch(
          `https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${teamId}`
        );
      })
      .then((res) => res.json())
      .then((data) => {
        if (!data.results) throw new Error("No hay partidos recientes");

        let lastMatch = data.results[0];
        setLastMatch(lastMatch);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setError(error.message);
      });
  };

  useEffect(() => {
    const loadLogosAndFetchMatch = async () => {
      const loadedLogos = await loadLogos();
      setLogos(loadedLogos);
      fetchLastHuachipatoMatch();
    };

    loadLogosAndFetchMatch();
  }, []);

  return (
    <div className="relative container mx-auto px-4 h-full flex items-center">
      <div className="text-white w-full flex justify-center items-center">
        <div className="container mx-auto px-2 sm:px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Último Partido Local
          </h2>
          <div className="bg-gradient-to-br from-blue-900 to-black rounded-lg sm:p-8 p-5 max-w-lg mx-auto border border-blue-800 text-center h-[260px] sm:h-[292px]">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : lastMatch ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span>
                      {lastMatch.dateEvent.split('-').reverse().join('-')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span>Estadio CAP</span>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-black/50 p-6 rounded-lg border border-blue-900">
                  <div className="text-center">
                    <img
                      src={logos[normalizeTeamName(lastMatch.strHomeTeam)] || "../assets/logos/everton.webp"}
                      alt={lastMatch.strHomeTeam}
                      className="size-20 sm:size-24 mx-auto"
                    />
                    <p className="text-4xl font-bold text-blue-500">
                      {lastMatch.intHomeScore}
                    </p>
                  </div>
                  <div className="text-white text-xl">VS</div>
                  <div className="text-center">
                    <img
                      src={logos[normalizeTeamName(lastMatch.strAwayTeam)]}
                      alt={lastMatch.strAwayTeam}
                      className="size-20 sm:size-24 mx-auto"
                    />
                    <p className="text-4xl font-bold text-blue-500">
                      {lastMatch.intAwayScore}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              // Rueda de carga
              <div className="flex justify-center items-center h-full">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastMatch;
