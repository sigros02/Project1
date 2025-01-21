// Just where I am keeping code that will be useful for these projects, taken from other activites we did in class


// // Acceptance Criteria
// // It's done when I click the Save button and the form's current values are stored in a object.

// // It's done when the object is saved as a string using localStorage.


// const firstNameInput = document.querySelector('#first-name');
// const lastNameInput = document.querySelector('#last-name');
// const emailInput = document.querySelector('#email');
// const passwordInput = document.querySelector('#password');
// const signUpButton = document.querySelector('#sign-up');

// signUpButton.addEventListener('click', function (event) {
//   event.preventDefault();

//   // TODO: Create user object from submission
//   const user = {
//     firstName: firstNameInput.value,
//     lastName: lastNameInput.value,
//     email: emailInput.value,
//     password: passwordInput.value
//   };

//   // TODO: Set new submission to local storage
//   localStorage.setItem('user',JSON.stringify(user));

// saveButton.addEventListener('click', function (event) {
//     event.preventDefault();
  
//     const studentGrade = {
//       student: student.value,
//       grade: grade.value,
//       comment: comment.value.trim(),
//     };
  
//     localStorage.setItem('studentGrade', JSON.stringify(studentGrade));
//     renderMessage();
//   });
  
//   function renderMessage() {
//     const lastGrade = JSON.parse(localStorage.getItem('studentGrade'));
//     if (lastGrade !== null) {
//       document.querySelector('.message').textContent =
//         lastGrade.student + ` received a/an ${lastGrade.grade}`;
//     }
//   }

// });






// // randomPopulate()
// function randomPopulate() {
//     for (let columnIndex = 0; columnIndex < xColumns; columnIndex++) {
//         for (let rowIndex = 0; rowIndex < yRows; rowIndex++) {
//             gameBoard[columnIndex][rowIndex] = Math.floor(Math.random() * randomStartTokensMax);
//         }
//     }
//     consoleLogGameBoard();
//     selectedColumn = Math.floor(Math.random() * xColumns);
//     rowNumber = Math.floor(Math.random() * yRows);
//     console.log("Final Coordinates (", selectedColumn, ", ", rowNumber, ") : ", gameBoard[selectedColumn][rowNumber]);
//     checkForWin(8,selectedColumn, rowNumber);
// }


// // Create a 2D array to represent the game board of size xColumns by yRows
// function clearGameBoard(xColumns, yRows) {
//     let newArray = [];
//     // Jonathan's Original Code
//     // for (let newRow = 0; newRow < xColumns; newRow++) {
//     //     newArray[newRow] = new Array(yRows);
//     // }
//     // for (let newColumn = 0; newColumn < xColumns; newColumn++) {
//     //         for (let newRow = 0; newRow < yRows; newRow++) {
//     //             newArray[newColumn][newRow] = 0;
//     //         }
//     // }
// }


// // Create a gameboard with a random number of tokens played
// // randomStart();
// function randomStart() {
//     let randomStartTokens = Math.floor(Math.random() * randomStartTokensMax) + randomStartTokensMin;
//     console.log("Random start tokens", randomStartTokens);
//     playerNumber = 1;
//     for (let randomToken = 0; randomToken < randomStartTokens; randomToken++) {
//         let selectedColumn = Math.floor(Math.random() * xColumns);
//         checkValidMove(selectedColumn);
//         if (gameWon === true) {
//             break;
//         }
//     }
//     console.log("Random start", gameBoard);
// }
// // Populates the entire gameboard with random numbers in each slot (for testing purposes)
