import React from 'react';
import { Link } from 'react-router-dom';



const ReturnButton: React.FC = () => {
  return (
    <div >
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold">Retour</Link>
    </div>
  );
};

export default ReturnButton;
