import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import TicTacToe from './TicTacToe';

const Index = () => {
    return(
        <div className="main">Hello !!!</div>
    )
}

ReactDOM.render(<TicTacToe/>,document.getElementById('app'));