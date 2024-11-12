import React from 'react';
import GridRow from 'src/components/Game/Grid/GridRow.tsx';
import { generateArray } from 'src/helpers/genericHelper.ts';
import { MAX_ATTEMPTS } from 'src/config/gameConfig.ts';

interface Props {
  length: number;
  attempts: string[];
  results: string[];
}

const Grid: React.FC<Props> = ({ length, attempts, results }) => {
  return (
    <div>
      {
        generateArray(MAX_ATTEMPTS).map((element, index) => (
          <GridRow
            key={element}
            length={length}
            attempt={index in attempts ? attempts[index] : ''}
            result={index in results ? results[index] : ''}
          />
        ))
      }
    </div>
  );
};

export default Grid;
