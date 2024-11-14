import React from 'react';
import ReturnButton from "src/components/Shared/ReturnButton";

const StatistiquePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-6">
        <p className="text-lg font-semibold mb-4">
          Les statistiques des joueurs ne sont pas disponibles pour le moment...
        </p>
        <h1 className="text-4xl font-bold text-blue-500 mb-8">
          Top 10 Monde Actuel
        </h1>
        <img 
          src="src/assets/topten.webp" 
          alt="Top 10 des meilleurs joueurs" 
          className="w-full max-w-lg rounded-lg shadow-lg"
        />
      </div>
      <ReturnButton />
    </div>
  );
};

export default StatistiquePage;
