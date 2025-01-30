// This Javascript file is for general animations and features that are not directly related to the gameplay.
const columnID = document.getElementsByClassName("col");

console.log(columnID);
let i = 0;

function changeColorCircle() {
    const changeColor = columnID[i].addEventListener("mouseover", function (event) {
        columnID[i].style.backgroundColor = "blue";
    });
    
    const changeColorBack = columnID[i].addEventListener("mouseout", function (event) {
        columnID[i].style.backgroundColor = "white";
    });
    let white = true;
    for (let i = 0; i < columnID.length; i++) {
        if (white === true) {
            // console.log(columnID[i]);
            changeColor();
            white = false;
          }  else {
                changeColorBack();
                white = true;
            }
        }

    };

changeColorCircle();




