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

function displayOperation() {
  const buttons = document.querySelectorAll('.btn');
  const clearBtn = document.querySelector('#clear');
  const equalsBtn = document.querySelector('#equals');

  let isStart = true;
  let operatorCount = 0;
  let currentNumber = '';

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      //if isStart, cant enter operators
      if(isStart) {
        if (btn.id === '') {
          toDisplay += `${btn.innerText}`;
          currentNumber += `${btn.innerText}`;
          isStart = false;
        } 
        
        //add case for negative numbers

      } else { //can enter operators
        if (btn.id === '') { //if btn is digits, add toDisplay
          toDisplay += `${btn.innerText}`;
          currentNumber += `${btn.innerText}`;
          operatorCount = 0;
        } 

        if (operatorCount === 0) {
          if (btn.id === 'plus' || btn.id === 'minus' ||
          btn.id === 'multiply' || btn.id === 'divide') {
            operatorCount = 1;
            numbers.push(convertToNum(currentNumber));
            operators.push(`${btn.innerText}`);
            currentNumber = '';
            toDisplay += ` ${btn.innerText} `;
          }

          if (btn.id === 'equals') {
            numbers.push(convertToNum(currentNumber));
          }
        }
      }

      if (toDisplay) {
        display.innerText = toDisplay;
      }
    })
  })

  clearBtn.addEventListener('click', () => {
    isStart = true;
    toDisplay = '';
    numbers = [];
    operators = [];
    display.innerText = 0;
  })

  equalsBtn.addEventListener('click', () => {
    console.log(numbers);
    console.log(operators);
  })
}

let display = document.querySelector('#display');
let toDisplay = ''
let numbers = [];
let operators = [];

displayOperation();