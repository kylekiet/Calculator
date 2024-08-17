let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a/b;

function operate (a, operator, b) {

    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return add(a,b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "X":
            return multiply(a, b);
            break;
        case "/":
            return divide(a, b);
            break;
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

let buttonMenu = document.body.querySelector("#calculator-buttons");
let currDisplayed = document.body.querySelector("#display-current");
let prevDisplayed = document.body.querySelector("#display-previous");

let currInput = ""
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
        3. If there is a operator in the input and that same operator is inputted, perform operate(curr, operator, curr);
    */
    
    if ((operatorInBuff) && (clicked.className === "number")) {
        //(Checking condition 2) Checks to see if there is a operator already selected by a user and if
        //it is being followed up with a number. Then we need to store the previous inputs and
        //begin displaying the user's new inputs.
        console.log("in number precheck")
        prevInput = currInput;
        currInput = "";
        operatorInBuff = false;
    } else if ((inputBuffIsFull(prevInput, currInput, operatorInput)) && (clicked.className === "operator")) {
        //(Checking condition 3) If the same operator is inputted 2 times in a row, or if an operator and curr and prev
        //already exist diff operator is 
        console.log("in operator precheck")
        let temp = currInput;
        currInput = operate(Number(prevInput), operatorInput, Number(currInput));

        prevInput = temp;
    }

    switch (clicked.id) {
        case "button-1":
            currInput += ("1");
            break;
        case "button-2":
            currInput += ("2");
            break;
        case "button-3":
            currInput += ("3");
            break;
        case "button-4":
            currInput += ("4");
            break;
        case "button-5":
            currInput += ("5");
            break;
        case "button-6":
            currInput += ("6");
            break;
        case "button-7":
            currInput += ("7");
            break;
        case "button-8":
            currInput += ("8");
            break;
        case "button-9":
            currInput += ("9");
            break;
        case "button-0":
            currInput += ("0");
            break;      
        case "button-add":
            operatorInput = "+";
            operatorInBuff = true;
            break;
        case "button-subtract":
            operatorInput = "-";
            operatorInBuff = true;
            break;
        case "button-multiply":
            operatorInput = "X";
            operatorInBuff = true;
            break;
        case "button-divide":
            operatorInput = "/";
            operatorInBuff = true;
            break;
        case "button-equals":
            //(Checking condition 1) We only want to perform the equal operation if there are 2 number inputs
            //and an operator
            if (inputBuffIsFull(prevInput, currInput, operatorInput)) {
                currInput = operate(Number(prevInput), operatorInput, Number(currInput));

                //clearing the operator out of the buffer, but we still want to display the currInput
                operatorInput = "";
                operatorInBuff = false;                
            } else {
                console.log("ERROR: Can't operate, not enough values")
            }
            break;
        case "button-clear":
            //clear and reset all inputs
            operatorInput = "";
            prevInput = "";
            currInput = "";
            operatorInBuff = false;
            break;
        default:
            break;

    }

    console.log("Current operator: " + operatorInput);
    currDisplayed.textContent = currInput;
    prevDisplayed.textContent = prevInput;
    //Want to separate what's being currDisplayed.
    //Currently 3 possible states that could be currDisplayed
    //1. The left side (before the operator is introduced)
    //2. The left the operator and the right side 
    //3. The result

    //I feel like the current problem is with my use of variables, SPecifically, I need to separarte the 
    //result and the currInput variables. Right now, the final calculation is stored inside
    //the currInput.
})