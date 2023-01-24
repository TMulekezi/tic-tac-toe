"use strict";

let turn;
let activeTurn;
let turnNum;
const GameBoard = (() => {
    const board = ["","","","","","","","",""];
    const setTile = (index, player) => {
        board[index] = player;
    }

    const checkRowWin = () => {
        for (let i = 0; i <= 6; i+=3) {
            if (board[i] !== "" && board[i] === board[i+1] && board[i] === board[i+2]) {
                return true;
            }
        }
        return false;
    }

    const checkColWin = () => {
        for (let i = 0; i <= 2; i+=1) {
            if (board[i] !== "" && board[i] === board[i+3] && board[i] === board[i+6]) {
                return true;
            }
        }
        return false;
    }

    const checkDiagWin = () => {
        if (board[4] !== "" && ((board[0] === board[4] && board[0] === board[8]) ||
        (board[2] === board[4] && board[2] === board[6])) ){
            return true;
        }
        return false;
    }

    const checkWin = () => {
        if(checkColWin() || checkDiagWin() || checkRowWin()) {
            return true;
        }

        return false;
    }

    const resetBoard = () => {
        turnNum = 0;
        turn = false;
        activeTurn = "Move: X";
        GameInfoController.updateGameInfo(activeTurn);
        const tiles = document.querySelectorAll(".tile");
        let i = 0;
        tiles.forEach((tile) => {
            if (tile.firstChild) {
                tile.removeChild(tile.firstChild);
            }
            tile.addEventListener("click",addImage, {once:true});
            board[i] = "";
            i++;
        });
    }

    const removeEvents = () => {
        const tiles = document.querySelectorAll(".tile");
        
        tiles.forEach(function (tile){
            
            tile.removeEventListener("click", addImage,{once: true});
        });
    }

    const displayReset = () => {
        const resetPane = document.querySelector(".reset");
        
        resetPane.style.visibility = "visible";
        
    };

    return {board, setTile, checkWin, resetBoard, displayReset, removeEvents};
})();


const GameInfoController =(()=>{
    const updateGameInfo = (content) => {
        const gameInfo = document.querySelector(".game-info");
        gameInfo.textContent = content;
    };
    return {updateGameInfo}
})();


function addImage() {
    const tile = this;

    const image = document.createElement("img");
    image.style.width ="140px";

    turnNum++;

    let tileIndex = tile.id;


    if (turn) {
        image.setAttribute("src","../images/naught.png");
        turn = false;
        activeTurn = "Move: X";
        GameBoard.setTile(tileIndex, "0");
    } else {
        image.setAttribute("src","../images/cross.png");
        turn = true;
        activeTurn = "Move: O";
        GameBoard.setTile(tileIndex, "X");
    }

    GameInfoController.updateGameInfo(activeTurn);
    tile.appendChild(image);
    let winMessage;
    if (GameBoard.checkWin()) {
  
        if (turn) {
            winMessage = "Player X wins";
            GameInfoController.updateGameInfo(winMessage);
        } else {
            winMessage = "Player 0 wins";
            GameInfoController.updateGameInfo(winMessage);
        }
        
        GameBoard.displayReset();
        GameBoard.removeEvents();
        
    } else if (turnNum === 9) {
        winMessage = "Draw";
        GameInfoController.updateGameInfo(winMessage);
        GameBoard.displayReset();
        GameBoard.removeEvents();
    }
}

const resetButton = document.querySelector("button");

resetButton.addEventListener("click", function() {
    const resetPane = document.querySelector(".reset");
    resetPane.style.visibility = "hidden";
    GameBoard.resetBoard();
});

GameBoard.resetBoard();


