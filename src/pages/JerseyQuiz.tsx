import React, { useState } from 'react';

type GameMode = 'time' | 'lives' | 'relax';

interface Jersey {
  season: string;
  image: string;
  firstHalfQuestions: Question[];
  secondHalfQuestions: Question[];
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const JerseyQuiz: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [currentJersey, setCurrentJersey] = useState<Jersey | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);

  const selectGameMode = (mode: GameMode) => {
    setGameMode(mode);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          👕 La Camiseta del Día 👕
        </h1>
        
        {!gameMode ? (
          <div className="space-y-6">
            <p className="text-xl text-center mb-8">
              Deberás adivinar qué temporada se inició con la camiseta que veas en pantalla.
              Luego, deberás responder preguntas con respecto a la primera mitad de la temporada.
              Al completar la primera mitad, deberás responder preguntas acerca de la segunda mitad de esa temporada.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => selectGameMode('time')}
                className="bg-blue-900 hover:bg-blue-800 p-4 rounded-lg text-center"
              >
                ⌛ Por tiempo
              </button>
              <button
                onClick={() => selectGameMode('lives')}
                className="bg-blue-900 hover:bg-blue-800 p-4 rounded-lg text-center"
              >
                💙 Por vidas
              </button>
              <button
                onClick={() => selectGameMode('relax')}
                className="bg-blue-900 hover:bg-blue-800 p-4 rounded-lg text-center"
              >
                😊 Relax
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Game content will go here */}
            <p>Game mode selected: {gameMode}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JerseyQuiz; 