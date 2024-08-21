let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a/b;

function operate (a, operator, b) {
    a = Number(a);
    b = Number(b);
    let result = 0;
    switch (operator) {
        case "+":
            result = add(a,b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "X":
            result = multiply(a, b);
            break;
        case "/":
            b === 0 ? result = "bruh" : result = divide(a, b);
            break;
    }
    
    //Checking for size. If size too big, turn to exponents.
    //If too small set a fixed decimal length.
    if (result < 1) {
        return result.toFixed(7);
    } else if (result > 999999) {
        return result.toExponential(3);
    } else {
        return result;
    }



}



function inputBuffIsFull (prev, curr, op) {
    //Checks if there exists a prevInput, currInput, and operatorInput
    prev = String(prev);
    curr = String(curr);
    if ((prev.length > 0) && (curr.length > 0) && (op.length > 0)) {
        return true;
    } else {
        return false;
    }
} 

function highlight (clicked, inBuff) {
    const operatorHTML = document.getElementsByClassName("operator");
    //clears all highlighted operators,
    let operatorArray = Array.from(operatorHTML);
    operatorArray = operatorArray.map((e) => {
        e.style.backgroundColor = "lightblue";
        e.style.color = "aliceblue";
    });

    //then applies it to appropriate one if it exists.
    if (inBuff) {
        document.getElementById(clicked.id).style.backgroundColor = "white";
        document.getElementById(clicked.id).style.color = "lightblue";
    }
}

let buttonMenu = document.body.querySelector(".calculator-buttons");
let currDisplayed = document.body.querySelector("#display-current");
let prevDisplayed = document.body.querySelector("#display-previous");

let currInput = ""
    , prevDisplayContent = ""
    , prevInput = ""
    , operatorInput = ""
    , operatorInBuff = false; //We can't use operatorInput.length() for our checks b/c we would have
                              //to clear it after which breaks our logic when trying to use equals

buttonMenu.addEventListener("click", (e) => {
    clicked = e.target;

    /*
        1. If we already have an operator, a prev, and a curr, and we select operator, it should operate. operate(prev, operator, curr)
        2. If we have have a curr and we select an operator, prev should be initialized as curr and curr should be emptied
            IF and only IF the operator is followed by a number.
        3. If there is a operator in the input and that same operator is inputted, perform operate(prev, operator, curr);
    */
  
    switch (clicked.className) {
        case "number":
            if (operatorInBuff) {
                console.log("OPERATOR IN BUFF!");
                if (currInput.length === 0) currInput += "0"; //User clicked on an operator with no input
                prevInput = currInput;
                currInput = "";
                operatorInBuff = false;

            }
            prevDisplayContent = "";
            if (String(currInput).length < 8) currInput += clicked.textContent;
            break;
        case "operator":
            if (clicked.id === "button-equals") {
                if (inputBuffIsFull(prevInput, currInput, operatorInput)) {
                    //We are ready to operate, do so and clear input fields
                    console.log("Clicked button-equals and buffer is full!")
                    let temp = currInput;
                    prevDisplayContent = prevInput + " " + operatorInput + " " + currInput + " = ";
                    currInput = operate(Number(prevInput), operatorInput, Number(currInput));
                    prevInput = temp;

                    operatorInBuff = false;
                    operatorInput = "";
                } else {
                    console.log("Can't operate, not enough inputs!");
                }
            } else {
                //For every other possible operator
                if (inputBuffIsFull(prevInput, currInput, operatorInput)) {
                    //If the user selects an operator when there is already one in the buffer
                    //Compute the inputs and previous operator, so we can move on and work with the
                    //newest operator.

                    let temp = currInput;
                    prevDisplayContent = prevInput + " " + operatorInput + " " + currInput + " = ";
                    currInput = operate(Number(prevInput), operatorInput, Number(currInput));
                    prevInput = temp;

                }

                operatorInBuff = true;
                operatorInput = clicked.textContent;
            }

            break;
        case "decimal":
            currInput.indexOf(".") == -1 ? currInput += "." : console.log("A decimal already exists");
            break;
        case "sign":
            currInput = currInput * -1;
            break;
        case "clear":
            //clear and reset all inputs/highlights
            operatorInput = "";
            prevInput = "";
            currInput = "";
            prevDisplayContent = "";
            operatorInBuff = false;
            break;
    }
    console.log(currInput);


    if ((clicked.className === "operator") || (clicked.className === "clear")) highlight(clicked, operatorInBuff);
    
    currDisplayed.textContent = currInput; // Can only fit  9 digits on the screen at a time
    prevDisplayContent ? prevDisplayed.textContent = prevDisplayContent : prevDisplayed.textContent = "";
})