import React, { useState } from 'react'
import Restart from './Restart';
import Square from "./Square";

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [isNext, setIsNext] = useState(true);
    
    const renderSquare = (i) => {
        return <Square 
        value={squares[i]} 
        onClick={() => {
            if (squares[i] !== null || winner !== null) {
                return;
            }

            const copiedSquares = squares.slice()
            copiedSquares[i] = isNext ? "X" : "O"
            setSquares(copiedSquares);
            setIsNext(!isNext)
            //^ the boolean that switches X and O 
        }} 
      />;
    };

    const calculateWinner = (squares) => {
        const possibleLines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ]

        for (let i = 0; i < possibleLines.length; i++) {
            const [a,b,c] = possibleLines[i]
            if (squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];

            }
        }
        return null;
    }

    const isBoardFull = (squares) => {
        for (let i= 0; i < squares.length; i++) {
            if (squares[i] == null) {
                return false;
            }
        }
        return true;
    }

    const winner = calculateWinner(squares);
    const draw = isBoardFull(squares);

    const getStatus = () => {
        if (winner) {
            return "ganasteis, pendejo " + winner + "!"
        } else if (draw) {
        return "Draw!";
        } else {
          return "proximo estupido, " + (isNext ? "X" : "0") + '!'
        }
    }

    const renderRestartButton = () => {
        return(
          <Restart 
            onClick={() => {
              setSquares(Array(9).fill(null)); 
              setIsNext(true);
              }} 
            />
        )
     }

  
    
    
return (
        //nesting the square component inside the game comp//
<div className="container">
    <div className='game'>
        <div className='board-row'>
            <div className='board-row'>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className='board-row'>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className='board-row'>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
        <div className="game-info">{getStatus()}</div>
        <div className="restart-button">{renderRestartButton()}</div>
    </div>
</div>
    );
};

export default Game;