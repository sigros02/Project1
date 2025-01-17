// This Javascript file is used to handle the gameplay of the game.
// It is responsible for the game logic, such as the player's location selection, win conditions, etc.
// It is also responsible for the game's UI, such as updating the game board, displaying messages, etc.

const boardLocation = {
    x: 1,
    y: 1,
}
// console.log(boardLocation);

// false represents an empty space, true represents a player's game piece
const gameBoard =  [[],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []]




// Allow a player to select a location on the game board (X)
let playerNumber = 1;
const selectedColumn = 0;


// Check if the selected location is valid (not full)
let validMove = false;
if (gameBoard[selectedColumn].length < 6) {
    // Update the game board with the player's move (drop to the lowest Y-value in that X-value)
    validMove = true;
    gameBoard[selectedColumn].push(playerNumber)
    console.log("Valid move");
    console.log(selectedColumn,gameBoard[selectedColumn].length);
} else {
    //If the Y column is full, the player must select a different column
    console.log("Column is full, select a different column");
    console.log(gameBoard);
}


// Check if the player has won the game


// Flip to the alternate player
if (playerNumber == 1) {
    playerNumber = 2;
} else {
    playerNumber = 1;
}



