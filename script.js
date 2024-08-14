let add = (a, b) => a + b;

let subtract = (a, b) => a - b;

let multiply = (a, b) => a * b;

let divide = (a, b) => a/b;

function operate (operator, a, b) {
    switch (operator) {
        case " + ":
            return add(a,b);
            break;
        case " - ":
            return subtract(a, b);
            break;
        case " X ":
            return multiply(a, b);
            break;
        case " / ":
            return divide(a, b);
            break;
        default:
            break;
    }
}



let buttonMenu = document.body.querySelector("#calculator-buttons");
let displayed = document.body.querySelector("#display-content");

let displayLeft = ""
    , displayState = ""
    , displayOperand = ""
    , result = "";


buttonMenu.addEventListener("click", (e) => {
    clicked = e.target;


    switch (clicked.id) {
        case "button-1":
            displayState += ("1");
            break;
        case "button-2":
            displayState += ("2");
            break;
        case "button-3":
            displayState += ("3");
            break;
        case "button-4":
            displayState += ("4");
            break;
        case "button-5":
            displayState += ("5");
            break;
        case "button-6":
            displayState += ("6");
            break;
        case "button-7":
            displayState += ("7");
            break;
        case "button-8":
            displayState += ("8");
            break;
        case "button-9":
            displayState += ("9");
            break;
        case "button-0":
            displayState += ("0");
            break;      
        case "button-add":
            displayLeft = displayState;
            displayState = "";
            displayOperand = " + ";
            break;
        case "button-subtract":
            displayLeft = displayState;
            displayState = "";
            displayOperand = " - ";
            break;
        case "button-multiply":
            displayLeft = displayState;
            displayState = "";
            displayOperand = " X ";
            break;
        case "button-divide":
            displayLeft = displayState;
            displayState = "";
            displayOperand = " / ";
            break;
        case "button-equals":
            console.log(Number(displayLeft));
            console.log(Number(displayState));
            result += operate(displayOperand, Number(displayLeft), Number(displayState));
            displayOperand = "";
            break;
        case "button-clear":
            displayOperand = "";
            displayLeft = "";
            displayState = "";
            break;
        default:
            break;

    }

    console.log(displayOperand.length)
    if (displayOperand.length > 0) {
        displayed.textContent = displayLeft + displayOperand + displayState;
    } else if (result.length > 0) {
        displayed.textContent = result;
    } else {
        displayed.textContent = displayState;
    }
    //Want to separate what's being displayed.
    //Currently 3 possible states that could be displayed
    //1. The left side (before the operand is introduced)
    //2. The left the operand and the right side 
    //3. The result

    //I feel like the current problem is with my use of variables, SPecifically, I need to separarte the 
    //result and the displayState variables. Right now, the final calculation is stored inside
    //the displayState.
})