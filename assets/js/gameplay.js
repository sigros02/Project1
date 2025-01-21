// This Javascript file is used to handle the gameplay of the game.
// It is responsible for the game logic, such as the player's location selection, win conditions, etc. It is also responsible for the game's UI, such as updating the game board, displaying messages, etc.

let playerNumber = 1;
let gameWon = false;

// Define the gameboard element and currently selected row and column
const gameboardElement = document.querySelector("#gameboard");
const startGameButton = document.querySelector("#start-game-button");
const resetGameButton = document.querySelector("#reset-game-button");
const gameMessage = document.querySelector(".game-message");

let selectedColumn = 0;
let selectedRow = 0;

// Define the number of columns and rows in the game (allows for gameboard to be a dynamic size if wanted in the future)
const xColumns = 7; // 7 columns
const yRows = 6; // 6 rows
const straightForWin = 4; // 4 tokens in a row to win
const randomStartTokensMin = 15; // Minimum of random number of tokens to start
const randomStartTokensMax = 25; // Maximum of random number of tokens to start

// false represents an empty space, true represents a player's game piece
let gameBoard = clearGameBoard(xColumns, yRows);
console.log("gameBoard init");
consoleLogGameBoard();

// Create a 2D array to represent the game board of size xColumns by yRows
function clearGameBoard(xColumns, yRows) {
    let newArray = [];
    for (let x = 0; x < xColumns; x++) {
        newArray.push([]);
        for (let y = 0; y < yRows; y++) {
        newArray[x].push(0);
        }
    }
    // set all gameboard token slots to white
    for (let columnIndex = 0; columnIndex < xColumns; columnIndex++) {
        for (let rowIndex = 0; rowIndex < yRows; rowIndex++) {
        document
            .getElementById(`_${columnIndex}-${rowIndex}`)
            .setAttribute("style", `background-color:white`);
        }
    }
    return newArray;
}

function consoleLogGameBoard() {
    console.log(JSON.parse(JSON.stringify(gameBoard)));
}

// Determine which column was clicked
function playerChooseColumn(event) {
    if (!gameWon) {
        // parse clicked row and column from selector ID
        selectedColumn = event.target.id.slice(1, 2);
        checkValidMove(selectedColumn);
    }
}

// Check if the selected location is valid (not full)
function checkValidMove(selectedColumn) {
    // console.log("Selected column", selectedColumn);
    let validMove = false;
    for (let rowNumber = 0; rowNumber < yRows; rowNumber++) {
        if (gameBoard[selectedColumn][rowNumber] === 0) {
            // Update the game board with the player's move (drop to the lowest Y-value in that X-value)
            validMove = true;
            gameBoard[selectedColumn][rowNumber] = playerNumber;
            // console.log("Player", playerNumber, "placed token in: column", selectedColumn, "row", rowNumber);
            dropToken(playerNumber, selectedColumn, rowNumber);
            // checkForWin(playerNumber, selectedColumn, rowNumber);
            setTimeout(checkForWin, 100, playerNumber, selectedColumn, rowNumber);
            togglePlayer();
            break;
        }
    }
    if (!validMove) {
        // If the Y column is full, the player must select a different column
        alert("Column is full, select a different column!");
        console.log("Column is full, select a different column");
    }
}

// set selected row and column token to current player preferred color
function dropToken(playerNumber, selectedColumn, selectedRow) {
    if (playerNumber == 1) {
        document
        .getElementById(`_${selectedColumn}-${selectedRow}`)
        .setAttribute("style", `background-color:${players.player1.preferredColor}; color:${players.player1.preferredColor}`);
    } else if (playerNumber == 2) {
        document
        .getElementById(`_${selectedColumn}-${selectedRow}`)
        .setAttribute("style",`background-color:${players.player2.preferredColor}; color:${players.player2.preferredColor}`);
    }
    return true;
}

// Check if the player has won the game
function checkForWin(playerNumber, selectedColumn, rowNumber) {
    let winCondition = (playerNumber + "").repeat(straightForWin);
    // console.log("winCondition", winCondition);
    // Check for horizonal win
    let horizontalString = "";
    for (let numberOfColumns = 0; numberOfColumns < xColumns; numberOfColumns++) {
        horizontalString += gameBoard[numberOfColumns][rowNumber];
    }
        console.log("horizontalString", horizontalString);
    if (horizontalString.includes(winCondition)) {
        gameWon = true;
        rowNumber =+ rowNumber
        winCondition = "Player " + playerNumber + " wins with a horizonal win in row number " + (rowNumber) + "! Press OK to reset the game.";
    }
    // Check for vertical win
    let verticalString = gameBoard[selectedColumn].join("");
    console.log("verticalString", verticalString);
    if (verticalString.includes(winCondition)) {
        gameWon = true;
        selectedColumn =+ selectedColumn
        winCondition = "Player " + playerNumber + " wins with a vertical win in columns number " + (selectedColumn) + "! Press OK to reset the game.";
    }
    //check for diagonal wins - primary diagonal (up to the right) array
    let primaryDiagonalArray = [gameBoard[selectedColumn][rowNumber]];
    let rowIndexToAdd = rowNumber;
    let columnIndexToAdd = selectedColumn;
    //while current row is less than last row AND current column is less last column
    while (rowIndexToAdd < yRows - 1 && columnIndexToAdd < xColumns - 1) {
        //increment row and column indices
        rowIndexToAdd++;
        columnIndexToAdd++;
        //push current value into primary diagonal array
        primaryDiagonalArray.push(gameBoard[columnIndexToAdd][rowIndexToAdd]);
    }
    rowIndexToAdd = rowNumber;
    columnIndexToAdd = selectedColumn;
    //while current row is greater than zero AND current column is greater zero
    while (rowIndexToAdd > 0 && columnIndexToAdd > 0) {
        //decrement row and column indices
        rowIndexToAdd--;
        columnIndexToAdd--;
        //unshift current value into primary diagonal array
        primaryDiagonalArray.unshift(gameBoard[columnIndexToAdd][rowIndexToAdd]);
    }
    // console.log("primary diagonal: ", primaryDiagonalArray);
    if (primaryDiagonalArray.join("").includes(winCondition)) {
        gameWon = true;
        winCondition = "Player " + playerNumber + " wins with a primary diagonal win " + rowNumber + "! Press OK to reset the game.";
    }
    //define secondary diagonal (up to the left) array
    let secondaryDiagonalArray = [gameBoard[selectedColumn][rowNumber]];
    rowIndexToAdd = rowNumber;
    columnIndexToAdd = selectedColumn;
    //while current row is greater than zero AND current column is less last column
    while (rowIndexToAdd > 0 && columnIndexToAdd < xColumns - 1) {
        //increment row and column indices
        rowIndexToAdd--;
        columnIndexToAdd++;
        //push current value into primary diagonal array
        secondaryDiagonalArray.push(gameBoard[columnIndexToAdd][rowIndexToAdd]);
    }
    rowIndexToAdd = rowNumber;
    columnIndexToAdd = selectedColumn;
    //while current row is less than last row AND current column is greater than zero
    while (rowIndexToAdd < yRows - 1 && columnIndexToAdd > 0) {
        //decrement row and column indices
        rowIndexToAdd++;
        columnIndexToAdd--;
        //unshift current value into primary diagonal array
        secondaryDiagonalArray.unshift(gameBoard[columnIndexToAdd][rowIndexToAdd]);
    }
    // console.log("secondary diagonal: ", secondaryDiagonalArray);

    if (secondaryDiagonalArray.join("").includes(winCondition)) {
        gameWon = true;
        winCondition = "Player " + playerNumber + " wins with a secondary diagonal win " + rowNumber + "! Press OK to reset the game.";
    }

    if (gameWon === true) {
        
        console.log("Player", playerNumber, "wins with a", winCondition, "win!");
        alert(winCondition);
        return gameWon;
    }
}

// Flip to the alternate player
function togglePlayer() {
  if (playerNumber == 1) {
    playerNumber = 2;
    gameMessage.textContent = `${players.player2.name}'s turn!`;
  } else {
    playerNumber = 1;
    gameMessage.textContent = `${players.player1.name}'s turn!`;
  }
  
}

// check for a gameboard click event
gameboardElement.addEventListener("click", playerChooseColumn);
startGameButton.addEventListener("click", startGame);
resetGameButton.addEventListener("click", resetGame);

function resetGame () {
    if (confirm("Press OK to reset the game, or Cancel to continue playing") === true) {
        playerNumber = 1;
        gameWon = false;
        gameBoard = clearGameBoard(xColumns, yRows);
        if (confirm("Click OK to reset player information") === true) {
            localStorage.clear();
        }
        gameMessage.textContent = "Ready for a new game!"
    };
}

function startGame() {
    definePlayerName();
}

// Find out the player names
function definePlayerName() {
    let player1 = localStorage.getItem("players.player1.name");
    while (player1 === "" || player1 === null) {
      player1 = prompt("Player 1: Please enter a name to play");
      if (player1 === null) {
        break;
      }
    }
    players.player1.name = player1;
    localStorage.setItem("players.player1.name", players.player1.name);
    let player2 = localStorage.getItem("players.player2.name");
    while (player2 === "" || player2 === null) {
      player2 = prompt("Player 2: Please enter a name to play");
      if (player2 === null) {
        break;
      }
    }
    players.player2.name = player2;
    localStorage.setItem("players.player2.name", players.player2.name);
    gameMessage.textContent = `Welcome ${players.player1.name} and ${players.player2.name}! ${players.player1.name} goes first!`;
}
