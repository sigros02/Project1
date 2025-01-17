// This Javascript file is used to handle the gameplay of the game.
// It is responsible for the game logic, such as the player's location selection, win conditions, etc.
// It is also responsible for the game's UI, such as updating the game board, displaying messages, etc.

// Define Player number (1 or 2)
let playerNumber = 1;

// Define the number of columns and rows in the game (allows for gameboard to be a dynamic size if wanted in the future)
const xColumns = 7; // 7 columns
const yRows = 6; // 6 rows

// false represents an empty space, true represents a player's game piece
let gameBoard = clearGameBoard(xColumns, yRows);
console.log("gameBoard", gameBoard);
// clearGameBoard();

// Create a 2D array to represent the game board of size xColumns by yRows
function clearGameBoard(xColumns, yRows) {
    let newArray = [];
    for (let newRow = 0; newRow < xColumns; newRow++) {
        newArray[newRow] = new Array(yRows);
    }
    for (let x = 0; x < xColumns; x++) {
        for (let y = 0; y < yRows; y++) {
            newArray[x][y] = 0;
        }
    }
    return newArray;
}

// Create a gameboard with a random number of tokens played
randomStart();
function randomStart() {
    let randomStartTokens = Math.floor(Math.random() * 12) + 1;
    console.log("Random start tokens", randomStartTokens);
    let playerNumber = 1;
    for (let randomToken = 0; randomToken < randomStartTokens; randomToken++) {
        console.log("Player number", playerNumber);
        let selectedColumn = Math.floor(Math.random() * xColumns);
        console.log("selectedColumn", selectedColumn);
        // let randomY = Math.floor(Math.random() * yRows);
        checkValidMove(selectedColumn);
        togglePlayer();
    }
    console.log("Random start", gameBoard);
}

// Check if the selected location is valid (not full)
function checkValidMove(selectedColumn) {
    console.log("Selected column", selectedColumn);
    let validMove = false;
    for (let rowNumber = 0; rowNumber < yRows; rowNumber++) {
        if (gameBoard[selectedColumn][rowNumber] === "O") {
            // Update the game board with the player's move (drop to the lowest Y-value in that X-value)
            validMove = true;
            gameBoard[selectedColumn][rowNumber] = playerNumber;
            console.log("Valid move");
            console.log(selectedColumn, rowNumber, gameBoard);
            break;
        }
    }
    return validMove;
}   

// Check if the player has won the game


// Flip to the alternate player
function togglePlayer() {
    console.log("Toggle Player start", playerNumber);
    if (playerNumber == 1) {
        playerNumber = 2;
    } else {
        playerNumber = 1;
    }
    console.log("Toggle Player new", playerNumber);
}


