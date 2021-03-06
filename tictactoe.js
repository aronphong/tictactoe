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

    let gameContainer = document.querySelector("#game-container");
    const board = [];

    // create board array
    for (let i = 0; i < 9; i++) {
        board[i] = "";
    }

    // render board 
    for (let i = 0; i < board.length; i++) {

        let newCell = document.createElement("div");
        newCell.className = "grid-cell";
        newCell.id = `cell-${i}`;
        newCell.textContent = board[i];

        gameContainer.appendChild(newCell);
    }

    const resetBoard = () => {

        let winnerDisplay = document.querySelector("#winner-display");
        winnerDisplay.textContent = "";

        for (let i = 0; i < board.length; i++) {

            board[i] = "";

            let cell = document.getElementById(`cell-${i}`);
            cell.textContent = board[i];
        };

        displayController.addMoves();
    };


    const boardPositions = () => {

        let rowCount = 0;
        const currentBoard = {};

        // get row positions
        for (let i = 0; i < 9; i += 3) {

            currentBoard[`row${rowCount}`] = board.slice(i, i+3);
            rowCount++;
        }

        // get column positions from rows
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

        // check for same symbol in all 3 indexes
        for (arr in currentBoard) {

            check = currentBoard[arr].reduce((a,b) => a === b ? a : false);

            if (check == "X" || check == "O") {
                playerOne.getSymbol() == check ? playerOne.win() : playerTwo.win();
                displayController.removeMoves();
                displayController.displayWinner(check);

                return check;
            }
        }
    };

    const checkTie = () => {

        let tie = board.every((item) => (item == "X") || (item == "O"));

        if (tie) {
            displayController.removeMoves();
            displayController.displayWinner(tie);
            return tie;
        }
    };

    return {board, resetBoard, checkWin, checkTie};
})();


// displayController module
const displayController = (() => {

    let board = gameBoard.board;
    let playerTurn = true;

    let grid = document.querySelectorAll(".grid-cell");
    let resetButton = document.querySelector("#reset-button");

    const displayWinner = (winnerSymbol) => {

        let winnerDisplay = document.querySelector("#winner-display");

        if (winnerSymbol == true) {
            winnerDisplay.textContent = "Tie Game!";
        }
        else {
            winnerDisplay.textContent = winnerSymbol + " is the Winner!";
        }
    };


    const displayMove = () => {

        const currentCell = event.target;

        if (currentCell.textContent == "") {

            currentCell.textContent = playerTurn ? playerOne.turn() : playerTwo.turn();
            let cellIndex = currentCell.id.split("-")[1];
            board[cellIndex] = currentCell.textContent;
            playerTurn = !playerTurn;
            gameBoard.checkWin();
            gameBoard.checkTie();
        }
        else {
            return
        }
    };


    resetButton.addEventListener('click', () => {
        gameBoard.resetBoard();
    });

    // turn functionality
    const addMoves = () => {grid.forEach(cell => cell.addEventListener('click', displayMove));
    };

    addMoves();

    const removeMoves = () => {
        grid.forEach(cell => cell.removeEventListener('click', displayMove));
    };

    return {displayWinner, addMoves, removeMoves};
})();

const playerOne = Player("p1", "X");
const playerTwo = Player("p2", "O");