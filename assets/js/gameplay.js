// This Javascript file is used to handle the gameplay of the game.
// It is responsible for the game logic, such as the player's location selection, win conditions, etc. It is also responsible for the game's UI, such as updating the game board, displaying messages, etc.

let playerNumber = 0;
let playerOneID = 0;
let playerTwoID = 0;
let activeGame = false; //whether a game is enabled and/or in session
let gameWon = false; //whether a player has won the game
let lastMove = [0,0]  //last move played (for undo)

let selectedColumn = 0;
let selectedRow = 0;

let players = [
  {
    playerName: "None",
    wins: 0,
    losses: 0,
    ties: 0,
    quits: 0,
    gamesPlayed: 0,
    saveState: "",
    preferredColor: "red",
    turnNumber: 1,
    gamepieceImage: "url",
  },
];

// Define the number of columns and rows in the game (allows for gameboard to be a dynamic size if wanted in the future)
const xColumns = 7; // 7 columns
const yRows = 6; // 6 rows
const straightForWin = 4; // 4 tokens in a row to win
const randomStartTokensMin = 15; // Minimum of random number of tokens to start
const randomStartTokensMax = 25; // Maximum of random number of tokens to start

// Define the gameboard element and currently selected row and column
const gameboardElement = document.querySelector("#gameboard");
const startGameButton = document.querySelector("#start-game-button");
const settingsGameButton = document.querySelector("#settings-game-button");
const resetGameButton = document.querySelector("#reset-game-button");
const undoGameButton = document.querySelector("#undo-game-button");
const gameMessage = document.querySelector(".game-message");

gameboardElement.addEventListener("click", playerChooseColumn);
// startGameButton.addEventListener("click", startGame);
// settingsGameButton.addEventListener("click", settingsModal);
settingsGameButton.className += " disabled";
resetGameButton.addEventListener("click", resetGame);
// undoGameButton.addEventListener("click", undoMove);

//Build players from local storage if they exist, otherwise create default players and save to local storage.
buildPlayersFromStorage();
function buildPlayersFromStorage() {
  if (localStorage.getItem("playerData")) {
    players = JSON.parse(localStorage.getItem("playerData"));
    console.log("Players loaded:", players);
  } else {
    localStorage.setItem("playerData", JSON.stringify(players));
    console.log("Players init:", players);
  }
}
function savePlayersToStorage() {
  localStorage.setItem("playerData", JSON.stringify(players));
  console.log("Players saved:", players);
}

let gameBoard = clearGameBoard(xColumns, yRows);
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
      // document
      //   .getElementById(`_${columnIndex}-${rowIndex}`)
      //   .setAttribute("style", `background-color:white`);
      // document
      //   .getElementById(`_${columnIndex}-${rowIndex}`)
      //   .setAttribute("style", `clip-path: circle(50px at 50% 50%)`);
    }
  }
  return newArray;
}

// Determine which column was clicked
function playerChooseColumn(event) {
  if (!gameWon && activeGame) {
    // parse clicked row and column from selector ID
    selectedColumn = event.target.id.slice(1, 2);
    checkValidMove(selectedColumn);
  } else if (!activeGame) {
    alert("Please select [Start Game] to start a new game!");
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
      lastMove = [selectedColumn, rowNumber];
      // checkForWin(playerNumber, selectedColumn, rowNumber);
      setTimeout(checkForWin, 100, playerNumber, selectedColumn, rowNumber);
      togglePlayer();
      break;
    }
  }
  if (!validMove) {
    // If the Y column is full, the player must select a different column
    alert("Column is full, select a different column!");
  }
}

function undoMove() {
  gameBoard[lastMove[0]][lastMove[1]] = 0;
  document
    .getElementById(`_${lastMove[0]}-${lastMove[1]}`)
    .setAttribute("style", `background-color:white; color:white`);
  togglePlayer();
}

// set selected row and column token to current player preferred color
function dropToken(playerNumber, selectedColumn, selectedRow) {
  
  // This is where we need to add in the animation for the token dropping
  
  if (playerNumber == 1) {
    let token = document.createElement("div");
    token.setAttribute("style", `background-color: ${playerOneColor}`);
    token.classList.add("piece", `column${selectedColumn}`);
    document.getElementById("gameboard").appendChild(token);
    setTimeout(function () {
      token.classList.add(`drop${selectedRow}`);
    }, 100);
  } else if (playerNumber == 2) {
    let token = document.createElement("div");
    token.setAttribute("style", `background-color: ${playerTwoColor}`);
    token.classList.add("piece", `column${selectedColumn}`);
    document.getElementById("gameboard").appendChild(token);
    setTimeout(function () {
      token.classList.add(`drop${selectedRow}`);
    }, 100);
  }
  return true;
}

// Check if the player has won the game
function checkForWin(playerNumber, selectedColumn, rowNumber) {
  let winCondition = (playerNumber + "").repeat(straightForWin);
  // Horizontal 
  let horizontalString = "";
  for (let numberOfColumns = 0; numberOfColumns < xColumns; numberOfColumns++) {
    horizontalString += gameBoard[numberOfColumns][rowNumber];
  }
  // Vertical
  let verticalString = gameBoard[selectedColumn].join("");
  // Diagonal Up (to the right)
  let primaryDiagonalArray = [gameBoard[selectedColumn][rowNumber]];
  let rowIndexToAdd = rowNumber;
  let columnIndexToAdd = selectedColumn;
  while (rowIndexToAdd < yRows - 1 && columnIndexToAdd < xColumns - 1) {
    rowIndexToAdd++;
    columnIndexToAdd++;
    primaryDiagonalArray.push(gameBoard[columnIndexToAdd][rowIndexToAdd]);
  }
  rowIndexToAdd = rowNumber;
  columnIndexToAdd = selectedColumn;
  while (rowIndexToAdd > 0 && columnIndexToAdd > 0) {
    rowIndexToAdd--;
    columnIndexToAdd--;
    primaryDiagonalArray.unshift(gameBoard[columnIndexToAdd][rowIndexToAdd]);
  }
  primaryDiagonalArray = primaryDiagonalArray.join("");
  // Diagonal Down (from the left)
  let secondaryDiagonalArray = [gameBoard[selectedColumn][rowNumber]];
  rowIndexToAdd = rowNumber;
  columnIndexToAdd = selectedColumn;
  while (rowIndexToAdd > 0 && columnIndexToAdd < xColumns - 1) {
    rowIndexToAdd--;
    columnIndexToAdd++;
    secondaryDiagonalArray.push(gameBoard[columnIndexToAdd][rowIndexToAdd]);
  }
  rowIndexToAdd = rowNumber;
  columnIndexToAdd = selectedColumn;
  while (rowIndexToAdd < yRows - 1 && columnIndexToAdd > 0) {
    //decrement row and column indices
    rowIndexToAdd++;
    columnIndexToAdd--;
    //unshift current value into primary diagonal array
    secondaryDiagonalArray.unshift(gameBoard[columnIndexToAdd][rowIndexToAdd]);
  }
  secondaryDiagonalArray = secondaryDiagonalArray.join("");
  // console.log("winCondition", winCondition);
  // console.log("horizontalString", horizontalString);
  // console.log("verticalString", verticalString);
  // console.log("primary diagonal: ", primaryDiagonalArray);
  // console.log("secondary diagonal: ", secondaryDiagonalArray);
  if (horizontalString.includes(winCondition)) {
    gameWon = true;
    rowNumber++
    if (playerNumber == 1) {
      winCondition = players[playerOneID].playerName + " wins with a horizontal straight in row #" + rowNumber + "!";
    } else {
      winCondition = players[playerTwoID].playerName + " wins with a horizontal straight in row #" + rowNumber + "!";
    }
  } else if (rowNumber == 5 && !horizontalString.includes(0)) {
      activeGame = false;
      players[playerOneID].ties++;
      players[playerTwoID].ties++;
      if (confirm("Cat's game! Press OK to reset the game.") === true) {
        resetGame();    
      }
  } else if (verticalString.includes(winCondition)) {
    gameWon = true;
    selectedColumn++
    if (playerNumber == 1) {
      winCondition = players[playerOneID].playerName + " wins with a vertical straight in column #" + selectedColumn + "!";
    } else {
      winCondition = players[playerTwoID].playerName + " wins with a vertical straight in column #" + selectedColumn + "!";
    }
  } else if (primaryDiagonalArray.includes(winCondition)) {
    gameWon = true;
    if (playerNumber == 1) {
      winCondition = players[playerOneID].playerName + " wins with a primary diagonal win!";
    } else {
      winCondition = players[playerTwoID].playerName + " wins with a primary diagonal win!";
    }
  } else if (secondaryDiagonalArray.includes(winCondition)) {
    gameWon = true;
    if (playerNumber == 1) {
      winCondition = players[playerOneID].playerName + " wins with a secondary diagonal win!";
    } else {
      winCondition = players[playerTwoID].playerName + " wins with a secondary diagonal win!";
    }
  }

  if (gameWon === true) {
    console.log("Player", playerNumber, "wins with a", winCondition, "win!");
    if (playerNumber == 1) {
      players[playerOneID].wins++;
      players[playerTwoID].losses++;
    } else {
      players[playerOneID].losses++;
      players[playerTwoID].wins++;
    }
    savePlayersToStorage();
    alert(winCondition);
    activeGame = false;
    return gameWon;
  }
}

// Flip to the alternate player
function togglePlayer() {
  if (playerNumber == 1) {
    playerNumber = 2;
    gameMessage.textContent = `${playerTwoName}'s turn!`;
  } else {
    playerNumber = 1;
    gameMessage.textContent = `${playerOneName}'s turn!`;
  }
}

function resetGame() {
  if (
    confirm("Press OK to reset the game, or Cancel to continue playing") ===
    true
  ) {
    if (activeGame == true) {
      players[playerOneID].quits++;
      players[playerTwoID].quits++;
    }
    if (players[playerOneID].turnNumber = 1) {
      players[playerTwoID].turnNumber = 1;
      players[playerOneID].turnNumber = 2;
      playerNumber = 2;
    } else {
      players[playerOneID].turnNumber = 1;
      players[playerTwoID].turnNumber = 2;
      playerNumber = 1;
    }
    savePlayersToStorage();
    gameWon = false;
    gameBoard = clearGameBoard(xColumns, yRows);
<<<<<<< HEAD

    /***  DO WE REALLY WANT TO CLEAR THE PLAYERS OBJECT? ***/
    if (confirm("Click OK to reset player information") === true) {
      // localStorage.clear();
      setTimeout(function () {
        document.querySelectorAll(".piece").forEach((element) => {
          element.classList.add("empty");
        });
        // document.querySelectorAll(".piece").classList.add("empty");
      }, 100);
    }
=======
>>>>>>> 5a25e90d530e47581cc32777b7ceacc3213c8f4c
    gameMessage.textContent = "Ready for a new game!";
    activeGame = true;
    if (confirm("Click Cancel to enter new player information or OK to continue with current players") === false || playerOneID == 0 || playerTwoID == 0) {
      playerOneID = 0;
      playerTwoID = 0;
      bootstrap.Modal.getInstance("#startGameModal").show();
    } else {
      startGame();
    }
  }
}

//Modal Stuff to define player names and colors and store/update local storage
const startGameModal = document.getElementById("startGameModal");
const nameInput1 = document.getElementById("nameInput1");
const colorSelect1 = document.getElementById("colorSelect1");
const nameInput2 = document.getElementById("nameInput2");
const colorSelect2 = document.getElementById("colorSelect2");
const submitButton = document.getElementById("submitButton");

let playerOneName = "";
let playerOneColor = "";
let playerTwoName = "";
let playerTwoColor = "";

submitButton.addEventListener("click", () => {
  if (activeGame == true) {
    clearGameBoard;
  }
  playerOneName = nameInput1.value.trim();
  playerOneColor = colorSelect1.value;
  playerTwoName = nameInput2.value.trim();
  playerTwoColor = colorSelect2.value;
  if (!playerOneName || !playerOneColor || !playerTwoName || !playerTwoColor) {
    alert("Please fill out all fields!");
    return;
  } else if (playerOneName.toUpperCase() == playerTwoName.toUpperCase()) {
    alert("Please enter different names for each player!");
    return;
  } else if (playerOneColor === playerTwoColor) {
    alert("Please choose different colors for each player!");
    return;
  }

  // Determined whether that player is in the players object, and if so, which position they are in
  for (let playersIndex = 0; playersIndex < players.length; playersIndex++) {
    if (
      players[playersIndex].playerName.toUpperCase() ==
      playerOneName.toUpperCase()
    ) {
      playerOneID = playersIndex;
      console.log("Player One ID", playerOneID);
      players[playersIndex].preferredColor = playerOneColor;
      players[playersIndex].turnNumber = 1;
      // break;
    }
    if (
      players[playersIndex].playerName.toUpperCase() ==
      playerTwoName.toUpperCase()
    ) {
      playerTwoID = playersIndex;
      console.log("Player Two ID", playerTwoID);
      players[playersIndex].preferredColor = playerTwoColor;
      players[playersIndex].turnNumber = 2;
      // break;
    }
  }
  // If the player is not in the players object, add them to the players object
  if (playerOneID === 0) {
    players.push({
      playerName: playerOneName,
      preferredColor: playerOneColor,
      turnNumber: 1,
      wins: 0,
      losses: 0,
      ties: 0,
      quits: 0,
      gamesPlayed: 0
    });
    playerOneID = players.length - 1;
  }
  if (playerTwoID === 0) {
    players.push({
      playerName: playerTwoName,
      preferredColor: playerTwoColor,
      turnNumber: 2,
      wins: 0,
      losses: 0,
      ties: 0,
      quits: 0,
      gamesPlayed: 0
    });
    playerTwoID = players.length - 1;
  }
  savePlayersToStorage();

  // Clear form and close modal
  // nameInput1.value = "";
  // colorSelect1.value = "";
  // nameInput2.value = "";
  // colorSelect2.value = "";

  bootstrap.Modal.getInstance("#startGameModal").hide();
  startGame();
});

function startGame() {
  activeGame = true;
  if (players[playerOneID].turnNumber == 1) {
    playerNumber = 1;
    gameMessage.textContent = `Welcome to Array of Sunshine, ${playerOneName} and ${playerTwoName}! ${playerOneName}, you go first!`;
  } else {
    playerNumber = 2;
    gameMessage.textContent = `Welcome to Array of Sunshine, ${playerTwoName} and ${playerOneName}! ${playerTwoName}, you go first!`;
  }
  players[playerOneID].gamesPlayed++;
  players[playerTwoID].gamesPlayed++;
  savePlayersToStorage();
};
