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















//     const img = document.createElement('img');
//     img.src = imageUrl;
//     img.classList.add('draggable');
//     document.body.appendChild(img);

//     // TODO: Set the `currentElement` to the image element you create.
//     currentElement = img;

//     // ? We attach the mouse move event listener to the document and the mood board div so that the element can be dragged anywhere on the screen and dropped only on the mood board div.
//     attachMouseListeners();
//   }
// });

// // ? We create an event listener for the text input field. This will create a div element and attach it to the mood board with the text provided by the user.
// addTextBtn.addEventListener('click', function () {
//   const text = textInput.value;
//   if (text) {
//     const textDiv = document.createElement('div');
//     textDiv.classList.add('text-item', 'draggable');
//     textDiv.textContent = text;
//     document.body.appendChild(textDiv);

//     // ? We set the current element to the text div so that we can update the position of the element when the mouse is moved.
//     currentElement = textDiv;

//     // ? We attach the mouse move event listener to the document and the click listener to the mood board div so that the element can be dragged anywhere on the screen, but dropped only on the mood board div.
//     attachMouseListeners();
//   }
// });

// function attachMouseListeners() {
//   // TODO: Attach the mouse move event listener to the document and the click listener to the mood board div so that the element can be dragged anywhere on the screen, but dropped only on the mood board div.
//   document.addEventListener("mousemove", mouseMoveHandler);
//   moodBoardEl.addEventListener("click", placeElementClickHandler);
// }

// // ? This is the event handler for the mouse move event. This will be called whenever the mouse is moved on the screen.
// // ? We check if the current element is set. If it is set, we update the position of the element to the mouse position.
// function mouseMoveHandler(event) {
//   if (currentElement) {
//     currentElement.style.left = event.clientX + 'px';
//     currentElement.style.top = event.clientY + 'px';
//   }
// }

// // ? This is the event handler for the click event on the mood board. This will be called whenever the user clicks on the mood board.
// // ? We check if the current element is set. If it is set, we attach the element to the mood board and reset the current element.
// // ? When we click, we find the position of the mouse relative to the mood board and update the position of the element accordingly. to 'place' it on the mood board.
// function placeElementClickHandler(event) {
//   if (currentElement) {
//     // TODO: Explain what getBoundingClientRect() does
//     // Return the size of an element and its position relative to the viewport
//     const moodBoardRect = moodBoardEl.getBoundingClientRect();

//     // TODO: Explain what the following code does
//     const left = `${event.clientX - moodBoardRect.left}px`;
//     const top = `${event.clientY - moodBoardRect.top}px`;

//     // ? Set the position of the element based on the calculated position above.
//     currentElement.style.left = left;
//     currentElement.style.top = top;

//     // TODO: Explain why we remove the draggable class from the element. Because we are done moving the object, we are placing it
//     currentElement.classList.remove('draggable');

//     // ? Append the element to the mood board with the already calculated position.
//     moodBoardEl.appendChild(currentElement);

//     // TODO: Explain what the `tagName` property is used for
//     // See what type of element it is
//     if (currentElement.tagName === 'IMG') {
//       // ? Push the image object to the tempStorageObject images property/array
//       tempStorageObject.images.push({
//         url: currentElement.src,
//         left: left,
//         top: top,
//       });
//     } else {
//       // ? Push the text object to the tempStorageObject text property/array
//       tempStorageObject.text.push({
//         text: currentElement.textContent,
//         left: left,
//         top: top,
//       });
//     }

//     // Update local storage with the new tempStorageObject information
//     // console.log(tempStorageObject);
//     updateLocalStorage();

//     // Reset current element
//     currentElement = null;

//     // Clear inputs
//     if (confirm("Clearing the inputs now, OK?") == true) {
//       imageUrlInput.value = '';
//       textInput.value = '';
//     }




//   }
// }





















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
