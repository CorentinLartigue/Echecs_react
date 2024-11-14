import React from 'react';

interface Props {
  text: string;
}

const Title: React.FC<Props> = ({ text }) => {
  return (
    <h1 className="text-4xl font-bold underline mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 shadow-lg neon-glow hover:scale-105 transition-transform duration-300">
      { text }
    </h1>
  );
};

export default Title;
