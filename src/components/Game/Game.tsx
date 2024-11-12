import React, { useEffect, useState } from 'react';
import Title from '../Shared/Title';
import ChessBoard from './ChessBoard/ChessBoard';

const Game: React.FC = () => {
    const [message, setMessage] = useState<string|null>(null);




    
    const onKeyPress= (piece: string) => {
        setMessage(null)
        switch (piece){
            case '♔':
            case '♚':
                console.log("tanus",true)
            break;
            case '♛':
            case '♕':
                console.log("Gabinou",false)
            break

        }
        
    }



    return(
        <div>
            <Title text="Les échecs c'est génial"/>
            <ChessBoard onKeyPress={onKeyPress}/>
        </div>
    );
};

export default Game;
