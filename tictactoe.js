// create factory of players
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    const turn = () => {
        return symbol;
    }

    const win = () => {
        // alert(`${name} Wins!`);
        console.log(`${name} Wins!`);
    }

    return {getName, getSymbol, turn, win}
};


const gameBoard = (() => {
    
    const board = [];


    let gameContainer = document.querySelector("#game-container");

    for (let i = 0; i < 9; i++) {
        board[i] = "";
    }

    for (let i = 0; i < board.length; i++) {
        let newCell = document.createElement("div");
        newCell.className = "grid-cell";
        newCell.id = `cell-${i}`;
        newCell.textContent = board[i];

        gameContainer.appendChild(newCell);
    }

    const resetBoard = () => {

        for (let i = 0; i < board.length; i++) {
            let cell = document.getElementById(`cell-${i}`);
            cell.textContent = "";
        }
    }


    const boardPositions = () => {

        let rowCount = 0;
        const currentBoard = {};

        for (let i = 0; i < 9; i += 3) {

            currentBoard[`row${rowCount}`] = board.slice(i, i+3);
            rowCount++;
        }

        for (let i = 0; i < 3; i++) {

            currentBoard[`column${i}`] = [];

            for (let j = 0; j < 3; j++) {
                currentBoard[`column${i}`].push(currentBoard[`row${j}`][i]);
            }
        }
        
        currentBoard["diagonal0"] = [currentBoard["row0"][0], currentBoard["row1"][1], currentBoard["row2"][2]];
        currentBoard["diagonal1"] = [currentBoard["row0"][2], currentBoard["row1"][1], currentBoard["row2"][0]];

        return currentBoard;
    }

    // if X or O is 3 in a row or diagonal is a win
    const checkWin = () => {

        let currentBoard = boardPositions();
        let check;

        // check for same val in all 3 indexes
        for (arr in currentBoard) {

            check = currentBoard[arr].reduce((a,b) => a === b ? a : false);

            if (check == "X" || check == "O") {
                playerOne.getSymbol() == check ? playerOne.win() : playerTwo.win();
                displayController.displayWinner(check);
                // resetBoard();
                return check;
            }
        }
    }
    return {board, checkWin};
})();


// displayController module
const displayController = (() => {

    let gameContainer = document.querySelector("#game-container");

    let gameWin;
    let board = gameBoard.board;
    let playerTurn = true;

    let grid = document.querySelectorAll(".grid-cell");

    const displayWinner = (winnerSymbol) => {

        let winnerDisplay = document.querySelector("#winner-display");
        winnerDisplay.textContent = winnerSymbol + " is the Winner!";

    }

    const displayMove = (cell) => {
        if (cell.textContent == "") {
            cell.textContent = playerTurn ? playerOne.turn() : playerTwo.turn();
            let cellIndex = cell.id.split("-")[1];
            board[cellIndex] = cell.textContent;
        }
        else {
            return 
        }
    }

    // turn functionality
    grid.forEach(cell => cell.addEventListener('click', () => {
        displayMove(cell);
        playerTurn = !playerTurn;
        gameWin = gameBoard.checkWin();
    }));

    return {displayWinner};
})();

const playerOne = Player("p1", "X");
const playerTwo = Player("p2", "O");