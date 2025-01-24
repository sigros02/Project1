// This Javascript file is used for extra features in the game so that the main gameplay file is not cluttered and so that we can work asynchronosly on different features without merge.


let players = [
    {
        playerName: "[None]",
        wins: 0,
        losses: 0,
        ties: 0,
        quits: 0,
        saveState: "",
        preferredColor: "red",
        turnNumber: 1,
        gamepieceImage: "url",
    }
  ];
console.log("Players init:",players);

//Build players from local storage if they exist, otherwise create default players and save to local storage.
buildPlayersFromStorage();

// TODO: Create a function called `renderBlogList` that renders the list of blog posts if they exist. If not, call the no posts function.
function buildPlayersFromStorage() {
    if (localStorage.getItem('playerData')) {
        players = JSON.parse(localStorage.getItem('playerData'));
        console.log("Players loaded:",players);
    } else {
        localStorage.setItem('playerData', JSON.stringify(players));
    }


      // } else {
      //       for (let player = 0; player < players.length; player++) {
      //         //Useful for LeaderBoard
      //           // buildElement('h2', posts[player].username, 'username');
      //           // buildElement('h4', posts[player].title, 'title');
      //           // buildElement('p', posts[player].content, 'content');
      //       }
      //   };
    }













// Mouseover
// const dropzoneEl = document.querySelector(".dropzone");

// document.addEventListener("mousemove", (event) => {
//   cursorHand.style.left = event.clientX + "px";
//   cursorHand.style.top = event.clientY + "px";
// });

// let currentGamepiece = null;

// ? Remove event listeners for mouse move, so that the element is no longer draggable
// document.removeEventListener("mousemove", mouseMoveHandler);

// const addImageBtn = document.querySelector('#add-image');
// const imageUrlInput = document.querySelector('#image-url');
// const addTextBtn = document.querySelector('#add-text');
// const textInput = document.querySelector('#text-input');
// const clearBtn = document.querySelector('#clear-all');

// function handCursor() {
//     const cursorURL = "https://cdn1.iconfinder.com/data/icons/touch-gestures-2/24/Flick-512.png";
//     const cursorHand = document.createElement("img");
//     cursorHand.id = "cursor-hand";
//     cursorHand.style.position = "absolute";
//     cursorHand.style.width = "15px";
//     cursorHand.style.height = "15px";
//     cursorHand.style.backgroundimage = "url('https://cdn1.iconfinder.com/data/icons/touch-gestures-2/24/Flick-512.png')";
//     cursorHand.style.backgroundSize = "cover";
//     cursorHand.style.pointerEvents = "none";
//     cursorHand.src = cursorURL
//     cursorHand.classList.add("dragable");

//     document.body.appendChild(cursorHand)
// }


