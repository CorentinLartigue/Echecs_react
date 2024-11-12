import React from 'react';
import { generateArray } from 'src/helpers/genericHelper.ts';
import GridBox from 'src/components/Game/Grid/GridBox.tsx';
import { LetterState } from 'src/types/GameTypes.ts';

interface Props {
  length: number;
  attempt: string;
  result: string;
}

const GridRow: React.FC<Props> = ({ length, attempt, result }) => {
  return (
    <div className="flex justify-center">
        {
            generateArray(length).map((element, index) => (
              <GridBox
                key={element}
                letter={attempt.charAt(index) || ''}
                state={result.charAt(index) as LetterState || LetterState.NOK}
              />
            ))
        }
    </div>
  );
};

export default GridRow;
