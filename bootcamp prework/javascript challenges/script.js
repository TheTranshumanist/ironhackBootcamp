// Screen initialization
const displayOperation = document.querySelector(".operation");
const displayInput = document.querySelector(".input");
displayInput.textContent = "0";

// Variable initialization
let ans = "0";
let indexNumbers = 0;
let indexOperators = 0;
let currentNumber = "0";
let isNumberPressed = false;
let isFloat = false;
let isNegative = false;
let isSpecial = false;
let wasSpecial = false;
let isFirst = true;

// Array initialization
const numbers = [];
const operators = [];

// Special operators
const isSpecialCheck  = operator => operator === "%" || operator === "²"
    || operator === "³" || operator === "√";

// Number buttons
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(numberButton => {
   numberButton.addEventListener('click', () => {
        if (numberButton.textContent === "±") {
            if (currentNumber !== "0" && currentNumber !== "") {
                if (!isNegative) {
                    currentNumber = "-" + currentNumber;
                    isNegative = true;
                } else {
                    currentNumber = currentNumber.substring(1, currentNumber.length);
                    isNegative = false;
                }
            }
        } else if (numberButton.textContent === ",") {
            if (!isFloat) {
                if (currentNumber === "0" || currentNumber === "") {
                    currentNumber = "0.";
                } else {
                    currentNumber += ".";
                }
                isFloat = true;
            }
        } else if ((currentNumber === "0" || currentNumber === "") && numberButton.textContent === "0"){
            currentNumber = "0";
        } else if ((currentNumber === "0" || currentNumber === "" || isFirst) && numberButton.textContent !== "0"){
            currentNumber = numberButton.textContent;
        } else {
            currentNumber += numberButton.textContent;
        }
        displayInput.textContent = currentNumber;
        isNumberPressed = true;
        isFirst = false;
   });
});

// Operator buttons
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(operatorButton => {
   operatorButton.addEventListener('click', () => {
        isSpecial = isSpecialCheck(operatorButton.textContent);
        if (!isNumberPressed && numbers.length === 0 && currentNumber !== "0" && currentNumber !== "") {
            currentNumber = "";
            isFirst = false;
            numbers.push(ans);
            operators.push(operatorButton.textContent);
            if (operatorButton.textContent === "√") {
                displayOperation.textContent += "√(" + ans + ")";
            } else {
                displayOperation.textContent += ans + operatorButton.textContent;
            }
            if (isSpecial) {
                wasSpecial = true;
                isNumberPressed = true;
            } else {
                wasSpecial = false;
                isNumberPressed = false;
            }
        } else if (!isNumberPressed && numbers.length !== 0 && !isSpecial) {
                operators[operators.length - 1] = operatorButton.textContent;
                displayOperation.textContent = displayOperation.textContent.substring(0, displayOperation.textContent.length - 1)
                    + operatorButton.textContent;
                wasSpecial = false;
        } else if (isNumberPressed){
            if (!isSpecial) {
                numbers.push(currentNumber);
                operators.push(operatorButton.textContent);
                if (!wasSpecial) {
                    displayOperation.textContent += currentNumber;
                }
                displayOperation.textContent += operatorButton.textContent;
                currentNumber = "";
                isNumberPressed = false;
                wasSpecial = false;
            } else if (isSpecial && !wasSpecial) {
                operators.push(operatorButton.textContent);
                if (operatorButton.textContent === "√") {
                    displayOperation.textContent += "√(" + currentNumber + ")";
                } else {
                    displayOperation.textContent += currentNumber + operatorButton.textContent;
                }
                wasSpecial = true;
                isNumberPressed = true;
            } else if (isSpecial && wasSpecial) {
                operators[operators.length - 1] = operatorButton.textContent;
                if (operatorButton.textContent === "√") {
                    displayOperation.textContent = displayOperation.textContent.substring(0, displayOperation.textContent.length
                        - currentNumber.length - 1) + "√(" + currentNumber + ")";
                } else {
                    displayOperation.textContent = displayOperation.textContent.substring(0, displayOperation.textContent.length
                        - currentNumber.length - 1) + currentNumber + operatorButton.textContent;
                }
                wasSpecial = true;
                isNumberPressed = true;
            }
        }
   });
});

// Equal button
const equalButton = document.querySelector(".equals");
equalButton.addEventListener('click', () => {
    if (isNumberPressed && !wasSpecial) {
        numbers.push(currentNumber);
        displayOperation.textContent += currentNumber + "=";
    } else if (isNumberPressed && wasSpecial) {
        numbers.push(currentNumber);
        displayOperation.textContent += "=";
    } else {
        operators.pop();
        displayOperation.textContent = displayOperation.textContent.substring(0, displayOperation.textContent.length - 1) + "=";
    }
    indexNumbers = 0;
    indexOperators = 0;
    while (indexNumbers < numbers.length && indexOperators < operators.length) {
        if (isSpecialCheck(operators[indexOperators])) {
            switch (operators[indexOperators]) {
                case "%":
                    numbers[indexNumbers] = Number.parseFloat(numbers[indexNumbers]) / 100;
                    break;
                case "²":
                    numbers[indexNumbers] = Math.pow(Number.parseFloat(numbers[indexNumbers]), 2);
                    break;
                case "³":
                    numbers[indexNumbers] = Math.pow(Number.parseFloat(numbers[indexNumbers]), 3);
                    break;
                case "√":
                    numbers[indexNumbers] = Math.sqrt(Number.parseFloat(numbers[indexNumbers]));
                    break;
            }
            operators[indexOperators] = "";
        } else {
            indexNumbers += 1;
        }
        indexOperators += 1;
    }
    ans = null;
    indexOperators = 0;
    numbers.forEach(number => {
        if (!ans) {
            ans = Number.parseFloat(number);
        } else {
            while(operators[indexOperators] === "") {
                indexOperators += 1;
            }
            switch (operators[indexOperators]) {
                case "+":
                    ans += Number.parseFloat(number);
                    break;
                case "−":
                    ans -= Number.parseFloat(number);
                    break;
                case "×":
                    ans *= Number.parseFloat(number);
                    break;
                case "÷":
                    ans /= Number.parseFloat(number);
            }
            indexOperators += 1;
        }
    });
    displayOperation.textContent = "";
    displayInput.textContent = ans;
    isNegative = ans < 0;
    isFloat = ans % 1 !== 0;
    isNumberPressed = false;
    isFirst = true;
    currentNumber = ans.toString();
    operators.splice(0, operators.length);
    numbers.splice(0, numbers.length);
});

// C button
const cButton = document.querySelector(".c");
cButton.addEventListener('click', () => {
   operators.splice(0, operators.length);
   numbers.splice(0, numbers.length);
   currentNumber = "0";
   displayInput.textContent = "0";
   displayOperation.textContent = "";
   isNumberPressed = false;
   isNegative = false;
   isFloat = false;
   isFirst = true;
});

// CE button
const ceButton = document.querySelector(".ce");
ceButton.addEventListener('click', () => {
   currentNumber = "0";
   displayInput.textContent = "0";
   isNumberPressed = false;
   isNegative = false;
   isFloat = false;
   isFirst = false;
});

// Delete button
const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener('click', () => {
   if (currentNumber.length === 1) {
       currentNumber = "0";
   } else {
       currentNumber = currentNumber.substring(0, currentNumber.length - 1);
   }
   displayInput.textContent = currentNumber;
});