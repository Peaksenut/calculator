let display = document.querySelector('#display');
let toDisplay = ''
let numbers = [];
let operators = [];

displayOperation();

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(callback, a, b) {
  return callback(a, b);
}

function convertToNum (str) {
  if (Number.isInteger(str)) {
    return parseInt(str);
  } else {
    return parseFloat(str);
  }
}

function del() { 
  return toDisplay = toDisplay.slice(0, -1); 
}

function compute() {
  let result = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (operators[i - 1] === '+') {

    }
  }
}

function displayOperation() {
  const buttons = document.querySelectorAll('.btn');
  const clearBtn = document.querySelector('#clear');
  const equalsBtn = document.querySelector('#equals');

  let isStart = true;
  let isPlus = false;
  let isMinus = false;
  let operatorCount = 0;
  let currentNumber = '';

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      //if isStart, can only enter digits
      if(isStart) {
        if (btn.id === '' || btn.id === 'minus' && !isMinus) {
          toDisplay += `${btn.innerText}`;
          currentNumber += `${btn.innerText}`;
          isStart = false;
          isMinus = false;
          if (btn.id === 'minus') {
            isStart = true;
            isMinus = true;
          }
        } 

      } else { //can enter operators
        if (btn.id === ''){ //if btn is digits, add toDisplay
          toDisplay += `${btn.innerText}`;
          currentNumber += `${btn.innerText}`;
          operatorCount = 0;
          isMinus = false;
        } 

        //for changing operators
        if (operatorCount === 1) {
          if (btn.id === 'plus' || btn.id === 'multiply' || btn.id === 'divide') {
            if (btn.id == 'plus') {
              isPlus = true;
            } else {
              isPlus = false
              isMinus = false;
            }
            del();
            operators.pop();
            operatorCount = 1;
            operators.push(`${btn.innerText}`);
            toDisplay += `${btn.innerText}`;
          } else if (btn.id === 'minus' && isPlus) { //changing plus with minus
            del();
            operators.pop();
            operatorCount = 1;
            operators.push(`${btn.innerText}`);
            toDisplay += `${btn.innerText}`;
          }
        } else if (operatorCount === 2) { //consecutive symbols: /- and *-
          if (btn.id === 'plus' || btn.id === 'multiply' || btn.id === 'divide') {
            del();
            del();
            operators.pop();
            operatorCount = 1;
            operators.push(`${btn.innerText}`);
            toDisplay += `${btn.innerText}`;
          }
        } 

        if (operatorCount === 1 && !isPlus && !isMinus) { //to allow minus after / and *
          if (btn.id === 'minus') {
            toDisplay += `${btn.innerText}`;
            currentNumber += `${btn.innerText}`;
            operatorCount = 2;
            isMinus = true;
          }
        }

        if (operatorCount === 0) {
          if (btn.id === 'plus' || btn.id === 'multiply' || btn.id === 'divide') {
            if (btn.id === 'plus'){
              isPlus = true;
            } else {
              isPlus = false;
              isMinus = false;
            }
            operatorCount = 1;
            numbers.push(convertToNum(currentNumber));
            operators.push(`${btn.innerText}`);
            currentNumber = '';
            toDisplay += `${btn.innerText}`;
          } else if (btn.id === 'minus') {  
            isPlus = false;
            isMinus = true;
            operatorCount = 1;;
            numbers.push(convertToNum(currentNumber));
            operators.push(`${btn.innerText}`);
            currentNumber = '';
            toDisplay += `${btn.innerText}`;
          }
        }
      }

      if (btn.id === 'equals') {
        if (toDisplay?.str?.at(-1) && //if last character of the operation is not a number
        Number.isInteger(toDisplay.str.at(-1))) {
          numbers.push(convertToNum(currentNumber));
        }
      }


      if (toDisplay) {
        display.innerText = toDisplay;
      }
    })
  })

  clearBtn.addEventListener('click', () => {
    isStart = true;
    isMinus = false;
    isPlus = false;
    operatorCount = 0;

    toDisplay = '';
    numbers = [];
    operators = [];
    display.innerText = '-';
  })

  equalsBtn.addEventListener('click', () => {
    console.log(numbers);
    console.log(operators);
  })
}