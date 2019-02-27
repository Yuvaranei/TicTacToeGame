import React, {Component} from 'react';
import './TicTacToe.scss';


export default class TicTacToe extends Component{
    constructor(props){
        super(props);
        this.displayGrid = this.displayGrid.bind(this);
        this.playGame = this.playGame.bind(this);
        this.checkForWinner = this.checkForWinner.bind(this);
        this.checkHorizontalPoints = this.checkHorizontalPoints.bind(this);
        this.checkVerticalPoints = this.checkVerticalPoints.bind(this);
        this.checkDiagonalPoints = this.checkDiagonalPoints.bind(this);
        this.playerNames = ['X','O'];
        this.boxFilled = 0;
        this.state = {
            playerName : this.playerNames[0],
            contentDisplay : [],
            winner : ''
        }
    }

    checkHorizontalPoints(col,playerName,boxNum){
        const {contentDisplay} = this.state;
        switch(col){
            case 0 : if(contentDisplay[boxNum+1] === playerName && contentDisplay[boxNum+2] === playerName){
                this.setState({winner : playerName});
            }
            break;  

            case 1 : if(contentDisplay[boxNum-1] === playerName && contentDisplay[boxNum+1] === playerName){
                this.setState({winner : playerName});
            }
            break;
            
            case 2 : if(contentDisplay[boxNum-2] === playerName && contentDisplay[boxNum-1] === playerName){
                this.setState({winner : playerName});
            }
            break;            
        }
    }

    checkVerticalPoints(row,playerName,boxNum){
        const {contentDisplay} = this.state;
        switch(row){
            case 0 : if(contentDisplay[boxNum+3] === playerName && contentDisplay[boxNum+6] === playerName){
                this.setState({winner : playerName});               
            }
            break;

            case 1 : if(contentDisplay[boxNum-3] === playerName && contentDisplay[boxNum+3] === playerName){
                this.setState({winner : playerName});
            }
            break;

            case 2 : if(contentDisplay[boxNum-6] === playerName && contentDisplay[boxNum-3] === playerName){
                this.setState({winner : playerName});
            }
            break;
        }
    }

    checkDiagonalPoints(row,col,playerName){
        const {contentDisplay} = this.state;
        if( row === col ){
            switch( row ){
                case 0 : if(contentDisplay[4] === playerName && contentDisplay[8] === playerName){
                    this.setState({winner : playerName});                    
                    }
                    break;
                case 1 : if((contentDisplay[0] === playerName && contentDisplay[8] === playerName) || (contentDisplay[2] === playerName && contentDisplay[6] === playerName)){
                    this.setState({winner : playerName});                    
                    }
                    break;
                case 2 : if(contentDisplay[0] === playerName && contentDisplay[4] === playerName){
                    this.setState({winner : playerName});                    
                    }
                    break;
            }
        }
        else if(row === 0 && col === 2){
            if(contentDisplay[4] === playerName && contentDisplay[6] === playerName){
                this.setState({winner : playerName});
            }
        }  
        else if(row === 2 && col === 0){
            if(contentDisplay[2] === playerName && contentDisplay[4] === playerName){
                this.setState({winner : playerName});
            }
        }  
    }

    checkForWinner(boxNum){
        const playerName = this.state.playerName;
        let rowLocation = Math.floor(boxNum / 3);
        let colLocation = boxNum % 3;

        !this.state.winner && this.checkHorizontalPoints(colLocation,playerName,boxNum);
        !this.state.winner && this.checkVerticalPoints(rowLocation,playerName,boxNum);
        !this.state.winner && this.checkDiagonalPoints(rowLocation,colLocation,playerName);
    }

    playGame(boxNum){
        if(this.state.contentDisplay[boxNum] || this.state.winner)
            return;
        
        this.boxFilled += 1;
        let contentDisplay = this.state.contentDisplay;
        contentDisplay[boxNum] = this.state.playerName;
        this.checkForWinner(boxNum);
        this.setState((state) => ({
            playerName : state.playerName === this.playerNames[0] 
                ? this.playerNames[1] : this.playerNames[0],
            contentDisplay : contentDisplay
        }))
    }

    displayGrid(){
        let squareDisplay = [];
        for(let i=0; i<9 ; i++){
            const valueToDisplay = this.state.contentDisplay[i] || "";
            squareDisplay.push(<div key={i} className="square" onClick={this.playGame.bind(this,i)}>{valueToDisplay}</div>)
        }
        return squareDisplay;
    }
    render(){
        let statusWindow =  `It is player ${this.state.playerName} turn!`;
        if(this.state.winner){
            statusWindow = `${this.state.winner} won the match!`
        }else if(this.boxFilled === 9){
            statusWindow = `Out of moves!!`
        }
        return(
            <div className="tictac-container">
                <div className="tictac-grid">
                    {this.displayGrid()}
                </div>
                <div className="player-status">
                   {statusWindow}
                </div>
            </div>            
        )
    }
}