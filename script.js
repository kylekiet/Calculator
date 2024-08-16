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
    console.log("buff prev :" + prev.length);
    console.log("buff curr :" + curr.length);
    console.log("buff op :" + op.length);
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
    , operandInput = ""
    , operatorInBuff = false;


buttonMenu.addEventListener("click", (e) => {
    clicked = e.target;


    //1. If we already have an operand, a prev, and a curr, and we select operand, it should operate. operate(prev, operand, curr)
    //2. If we have have a curr and we select an operand, prev should be initialized as curr and curr should be emptied
    //      IF and only IF the operand is followed by a number.
    //3. If there is a operand in the input and that same operand is inputted, perform operate(curr, operand, curr);

    if (operatorInBuff) {
        prevInput = currInput;
        currInput = "";
        operatorInBuff = false;
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

            console.log("before add curr: " + currInput);
            console.log("before add prev: " + prevInput);
            console.log("before add operator: " + operandInput);
            if (inputBuffIsFull(prevInput, currInput, operandInput)) {
                console.log("inside function");
                let temp = currInput;
                currInput = operate(Number(prevInput), operandInput, Number(currInput));

                prevInput = temp;

            }  
            operandInput = "+";
            operatorInBuff = true;
            break;
        case "button-subtract":
            operandInput = "-";
            break;
        case "button-multiply":
            operandInput = "X";
            break;
        case "button-divide":
            operandInput = "/";
            break;
        case "button-equals":
            currInput = operate(Number(prevInput), operandInput, Number(currInput));
            operandInput = "";
            operatorInBuff = false;
            break;
        case "button-clear":
            operandInput = "";
            prevInput = "";
            currInput = "";
            operatorInBuff = false;
            break;
        default:
            break;

    }

    
    currDisplayed.textContent = currInput;
    prevDisplayed.textContent = prevInput;
    //Want to separate what's being currDisplayed.
    //Currently 3 possible states that could be currDisplayed
    //1. The left side (before the operand is introduced)
    //2. The left the operand and the right side 
    //3. The result

    //I feel like the current problem is with my use of variables, SPecifically, I need to separarte the 
    //result and the currInput variables. Right now, the final calculation is stored inside
    //the currInput.
})