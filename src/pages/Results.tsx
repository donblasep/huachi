import React, { useState, useEffect } from 'react';

// Define la interfaz para un partido
interface Match {
  date: string;
  stadium: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  tournament: string;
}

// Cargar los archivos JSON de manera perezosa
const matchFiles = import.meta.glob('../data/matches_*.json');

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
      console.log(`Loaded logo for ${normalizedTeamName}: ${logoModule.default}`);
    } catch (error) {
      console.error(`Failed to load logo for ${normalizedTeamName}:`, error);
    }
  }

  console.log("Logos loaded:", logos);
  return logos;
};

// Función para normalizar el nombre del equipo
const normalizeTeamName = (teamName: string) => {
  let normalized = teamName
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

  // Caso especial para Everton
  if (normalized === "everton") {
    normalized = "evertondevinadelmar";
  }

  console.log(`Normalized team name: ${teamName} -> ${normalized}`);
  return normalized;
};

// Componente SkeletonCard para mostrar mientras se cargan los datos
const SkeletonCard = () => (
  <div className="bg-gradient-to-br from-blue-900 to-black rounded-lg p-8 max-w-lg mx-auto border border-blue-800 text-center animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="w-20 h-4 bg-gray-700 rounded"></div>
      <div className="w-20 h-4 bg-gray-700 rounded"></div>
    </div>
    <div className="flex items-center justify-between bg-black/50 p-6 rounded-lg border border-blue-900">
      <div className="text-center">
        <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-2"></div>
        <div className="w-16 h-6 bg-gray-700 rounded mx-auto"></div>
      </div>
      <div className="text-white text-xl">VS</div>
      <div className="text-center">
        <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-2"></div>
        <div className="w-16 h-6 bg-gray-700 rounded mx-auto"></div>
      </div>
    </div>
    <div className="w-32 h-6 bg-gray-700 rounded mx-auto mt-4"></div>
  </div>
);

function Results() {
  const [year, setYear] = useState('2024');
  const [matches, setMatches] = useState<Match[]>([]);
  const [allMatches, setAllMatches] = useState<{ [key: string]: Match[] }>({});
  const [logos, setLogos] = useState<{ [key: string]: string }>({});
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLogosAndMatches = async () => {
      // Cargar logos
      const loadedLogos = await loadLogos();
      setLogos(loadedLogos);

      // Cargar partidos iniciales
      const loadedMatches = await loadMatchesForYear('2024');
      setAllMatches((prevMatches) => ({
        ...prevMatches,
        '2024': loadedMatches,
      }));
      setMatches(loadedMatches || []);
      
      // Configurar años disponibles
      setAvailableYears(Object.keys(matchFiles)
        .map(path => path.match(/matches_(\d{4})\.json$/)?.[1] || '')
        .filter(Boolean));
      
      setLoading(false);
    };

    loadLogosAndMatches();
  }, []);

  const loadMatchesForYear = async (selectedYear: string) => {
    const path = `../data/matches_${selectedYear}.json`;
    if (matchFiles[path]) {
      const matchData = await matchFiles[path]();
      if (matchData && typeof matchData === 'object' && 'default' in matchData) {
        return matchData.default as Match[];
      }
    }
    return [];
  };

  useEffect(() => {
    const fetchMatchesForYear = async (selectedYear: string) => {
      if (!allMatches[selectedYear]) {
        setLoading(true);
        const loadedMatches = await loadMatchesForYear(selectedYear);
        setAllMatches((prevMatches) => ({
          ...prevMatches,
          [selectedYear]: loadedMatches,
        }));
        setMatches(loadedMatches || []);
        setLoading(false);
      } else {
        setMatches(allMatches[selectedYear] || []);
      }
    };

    fetchMatchesForYear(year);
  }, [year]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, teamName: string) => {
    const normalizedTeamName = normalizeTeamName(teamName);
    console.error(`Failed to load image for ${normalizedTeamName}. Using default image.`);
    
    // Usar una imagen genérica por defecto
    e.currentTarget.src = "/default-team.webp"; // Esta imagen debe estar en la carpeta public
  };

  return (
    <div className="container mx-auto px-4 py-16" style={{ minHeight: '100vh' }}>
      <h2 className="text-3xl font-bold text-white mb-12 text-center">Resultados Recientes</h2>
      
      <div className="mb-6 text-center">
        <select 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          className="bg-gray-800 text-white p-2 rounded"
        >
          {availableYears.map((yearOption) => (
            <option key={yearOption} value={yearOption}>{yearOption}</option>
          ))}
        </select>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        {loading ? (
          <SkeletonCard />
        ) : (
          matches.map((match, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-blue-900 to-black rounded-lg p-8 max-w-lg mx-auto border border-blue-800 text-center"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">{match.date}</span>
                <span className="text-gray-300">{match.stadium}</span>
              </div>
              <div className="flex items-center justify-between bg-black/50 p-6 rounded-lg border border-blue-900">
                <div className="text-center">
                  <p className="text-white text-lg mb-2">{match.homeTeam}</p>
                  <img 
                    src={logos[normalizeTeamName(match.homeTeam)] || "../assets/logos/default-team.webp"}
                    alt={match.homeTeam} 
                    className="size-20 sm:size-24 mx-auto"
                  />
                  <p className="text-4xl font-bold text-blue-500">{match.homeScore}</p>
                </div>
                <div className="text-white text-xl">VS</div>
                <div className="text-center">
                  <p className="text-white text-lg mb-2">{match.awayTeam}</p>
                  <img 
                    src={logos[normalizeTeamName(match.awayTeam)] || "../assets/logos/default-team.webp"}
                    alt={match.awayTeam} 
                    className="size-20 sm:size-24 mx-auto"
                  />
                  <p className="text-4xl font-bold text-blue-500">{match.awayScore}</p>
                </div>
              </div>
              <p className="text-white text-xl">{match.tournament}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Results;
