

let playerTurn = true;
let gameContainer = document.querySelector("#game-container");
// let gameCell = document.querySelectorAll(".")

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


// create gameboard and displaycontroller modules
// when user choose cell, push symbol into specific array
const gameBoard = (() => {
    const board = [];

    for (let i = 0; i < 9; i++) {
        board[i] = i
    }

    // have another function find out which symbol to put into cell
    // console.log(grid);
    // have function add event listener for each grid cell



    // if X or O is 3 in a row or diagonal is a win
    const checkWin = () => {

        let rowCount = 0;
        const checkArr = {};

        for (let i = 0; i < 9; i += 3) {

            checkArr[`row${rowCount}`] = board.slice(i, i+3);
            rowCount++;
        }

        let arr1 = [];
        let arr2 = [];
        let arr3 = [];

        for (let i = 0; i < 3; i++) {

            arr1.push(checkArr[`row${i}`][0]);
            arr2.push(checkArr[`row${i}`][1]);
            arr3.push(checkArr[`row${i}`][2]);
        }

        checkArr[`column0`] = arr1;
        checkArr[`column1`] = arr2;
        checkArr[`column2`] = arr3;

        let check;

        // check for same val in all 3 indexes
        for (arr in checkArr) {

            check = checkArr[arr].reduce((a,b) => a === b ? a : false);

            if (check == "X" || check == "O") {
                playerOne.getSymbol() == check ? playerOne.win() : playerTwo.win();
            }
        }
    }
    return {board, checkWin};
})();


// displayController module
const displayController = (() => {

    let board = gameBoard.board;

    for (let i = 0; i < board.length; i++) {
        let newCell = document.createElement("div");
        newCell.className = "grid-cell";
        newCell.id = `cell-${i}`;
        newCell.innerHTML = board[i];

        gameContainer.appendChild(newCell);

    }

    let grid = document.querySelectorAll(".grid-cell");

    grid.forEach(cell => cell.addEventListener('click', () => {
        cell.innerHTML = playerTurn ? playerOne.turn() : playerTwo.turn();
        let cellIndex = cell.id.split("-")[1];
        board[cellIndex] = cell.innerHTML;
        playerTurn = !playerTurn;
        gameBoard.checkWin();
    }));

})();




const playerOne = Player("p1", "X");
const playerTwo = Player("p2", "O");