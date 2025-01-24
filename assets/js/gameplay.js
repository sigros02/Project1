// This Javascript file is used to handle the gameplay of the game.
// It is responsible for the game logic, such as the player's location selection, win conditions, etc. It is also responsible for the game's UI, such as updating the game board, displaying messages, etc.

let playerNumber = 1;
let playerOneNumber = 0;
let playerTwoNumber = 0;
let activeGame = false; //whether a game is enabled and/or in session
let gameWon = false; //whether a player has won the game

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
  if (!gameWon && activeGame) {
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
      .setAttribute(
        "style",
        `background-color:${players.player1.preferredColor}; color:${players.player1.preferredColor}`
      );
  } else if (playerNumber == 2) {
    document
      .getElementById(`_${selectedColumn}-${selectedRow}`)
      .setAttribute(
        "style",
        `background-color:${players.player2.preferredColor}; color:${players.player2.preferredColor}`
      );
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
    rowNumber = +rowNumber;
    winCondition =
      "Player " +
      playerNumber +
      " wins with a horizonal win in row number " +
      rowNumber +
      "! Press OK to reset the game.";
  }
  // Check for vertical win
  let verticalString = gameBoard[selectedColumn].join("");
  console.log("verticalString", verticalString);
  if (verticalString.includes(winCondition)) {
    gameWon = true;
    selectedColumn = +selectedColumn;
    winCondition =
      "Player " +
      playerNumber +
      " wins with a vertical win in columns number " +
      selectedColumn +
      "! Press OK to reset the game.";
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
    winCondition =
      "Player " +
      playerNumber +
      " wins with a primary diagonal win " +
      rowNumber +
      "! Press OK to reset the game.";
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
    winCondition =
      "Player " +
      playerNumber +
      " wins with a secondary diagonal win " +
      rowNumber +
      "! Press OK to reset the game.";
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
// startGameButton.addEventListener("click", startGame);
// settingsGameButton.addEventListener("click", settingsModal);
resetGameButton.addEventListener("click", resetGame);

function resetGame() {
  if (
    confirm("Press OK to reset the game, or Cancel to continue playing") ===
    true
  ) {
    playerNumber = 1;
    gameWon = false;
    gameBoard = clearGameBoard(xColumns, yRows);
    if (confirm("Click OK to reset player information") === true) {
      localStorage.clear();
    }
    gameMessage.textContent = "Ready for a new game!";
  }
}

//Modal Stuff to define player names and colors and store/update local storage
const startGameModal = document.getElementById("startGameModal");
const nameInput1 = document.getElementById("nameInput1");
const colorSelect1 = document.getElementById("colorSelect1");
const nameInput2 = document.getElementById("nameInput2");
const colorSelect2 = document.getElementById("colorSelect2");
const submitButton = document.getElementById("submitButton");
console.log(submitButton);


submitButton.addEventListener("click", () => {
  console.log("Submit button clicked");
  const enteredName1 = nameInput1.value.trim();
  const selectedColor1 = colorSelect1.value;
  const enteredName2 = nameInput2.value.trim();
  const selectedColor2 = colorSelect2.value;


  if (!enteredName1 || !selectedColor1 || !enteredName2 || !selectedColor2) {
    alert("Please fill out all fields!");
    return;
  } else if (enteredName1.toUpperCase() == enteredName2.toUpperCase()) {
    alert("Please enter different names for each player!");
    return;
  } else if (selectedColor1 === selectedColor2) {
    alert("Please choose different colors for each player!");
    return;
  }

  // Determined whether that player is in the players object, and if so, which position they are in
  for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
    if (players[playerIndex].playerName.toUpperCase() == enteredName1.toUpperCase()) {
      playerOneNumber = playerIndex
      players[playerIndex].preferredColor = selectedColor1
      players[playerIndex].turnNumber = 1;
      break;
    }
    if (players[playerIndex].playerName.toUpperCase() == enteredName2.toUpperCase()) {
      playerTwoNumber = playerIndex
      players[playerIndex].preferredColor = selectedColor2
      players[playerIndex].turnNumber = 2;
      break;
    }
  }
  // If the player is not in the players object, add them to the players object 
  if (playerOneNumber === 0) {
    players.push({ "playerName": enteredName1, "preferredColor": selectedColor1, "turnNumber": 1});
    playerOneNumber = players.length - 1;
  }
  if (playerTwoNumber === 0) {
    players.push({ "playerName": enteredName2, "preferredColor": selectedColor2, "turnNumber": 2});
    playerTwoNumber = players.length - 1;
  }
  localStorage.setItem("playerData", JSON.stringify(players));
  console.log("Players submit",players);

  // Clear form and close modal
  nameInput1.value = "";
  colorSelect1.value = "";
  nameInput2.value = "";
  colorSelect2.value = "";

  // const modalInstance = bootstrap.Modal.getInstance("#startGameModal");
  // modalInstance.hide();
  bootstrap.Modal.getInstance("#startGameModal").hide();

  startGame();
});

function startGame() {
  activeGame = true;
  gameMessage.textContent = `Welcome to Array of Sunshine, ${players[playerOneNumber].playerName} and ${players[playerTwoNumber].playerName}! ${players[playerOneNumber].playerName}, you go first!`;
}
