import React from 'react';
import { Link } from 'react-router-dom';

const ReturnButton: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-6">
      <Link to="/" className="bg-gradient-to-r from-gray-700 to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:scale-105 transition duration-300">
        Retour
      </Link>
    </div>
  );
};

export default ReturnButton;
