import React from 'react';
import { getLetterStateClasses } from 'src/helpers/gameHelper.ts';
import { LetterState } from 'src/types/GameTypes.ts';

interface Props {
  letter: string;
  state: LetterState;
}

const GridBox: React.FC<Props> = ({ letter, state }) => {
  return (
    <div className="w-16 h-16 bg-blue-700 m-1 text-white text-3xl">
      <div className={`${getLetterStateClasses(state)} w-full h-full flex items-center justify-center`}>
        {letter}
      </div>
    </div>
  );
};

export default GridBox;
