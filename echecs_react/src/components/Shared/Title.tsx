import React from 'react';

interface Props {
  text: string;
}

const Title: React.FC<Props> = ({ text }) => {
  return (
    <h1 className="text-3xl font-bold underline mb-4 text-center">
      { text }
    </h1>
  );
};

export default Title;
