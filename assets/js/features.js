// This Javascript file is used for extra features in the game so that the main gameplay file is not cluttered and so that we can work asynchronosly on different features without merge.

var players = {
  player1: {
    number: 1,
    name: "",
    wins: 0,
    losses: 0,
    ties: 0,
    quits: 0,
    saveState: "",
    preferredColor: "red",
    firstTurn: true,
    gamepieceImage: "url",
  },
  player2: {
    number: 2,
    name: "",
    wins: 0,
    losses: 0,
    ties: 0,
    quits: 0,
    saveState: "",
    preferredColor: "black",
    firstTurn: false,
    gamepieceImage: "url",
  },
};

// console.log(players);



// Determined whether that player is in the players object, and if so, which position they are in

// If the player is in the players object, load their data

// let player2 = localStorage.getItem("players.player2.name");

// If the player is not in the players object, add them to the players object via prompts

// Repeat for Two Players

// Query the Player(s) to enter their name(s)

// Add player to the players object

// Save player data to local storage

