const buttons = document.querySelectorAll('.btn');
const clearBtn = document.querySelector('#clear');
const equalBtn = document.querySelector('#equals');
let answerDisplay = document.querySelector('#answer-display');
let display = document.querySelector('#display');
let toDisplay = ''

//display
let isStart = true;
let isPlus = false;
let isMinus = false;
let operatorCount = 0;

//compute
let isNegativeNumber = false;
let isDigit = false;
let currentAnswer = 0;
let currentNumber = 1;
let currentOperator = '';
let number= '';
let ab = [];

let isEquals = false;

displayOperation();
compute();
clear();

clearBtn.addEventListener('click', clear);
equalBtn.addEventListener('click', displayAnswer);


function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - Math.abs(b);
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
  return Number(str);
}


function del(str, n = 1) { 
  return str.slice(0, str.length - n);
}


function clear() {
  isStart = true;
  isMinus = false;
  isPlus = false;
  operatorCount = 0;

  isNegativeNumber = false;
  isDigit = false;
  currentAnswer = 0;
  currentNumber = 0;
  currentOperator = '';
  number = ''
  ab = [];

  isEquals = false;

  toDisplay = '';
  display.innerText = '';
  answerDisplay.innerText = '';
}


function displayAnswer() {
  if (ab.length > 0 && isDigit) {
    let answer = convertToNum(answerDisplay.innerText);
    clear();
    isDigit = true;
    isStart = false;
    isEquals = true;
    if (answer < 0) isNegativeNumber = true;
    ab[0] = answer;
    toDisplay += answer;
    display.innerText = answer;
  }
}


// function del() {

// }


function compute() {
  buttons.forEach(btn => { btn.addEventListener('click', () => {
    if (btn.id === 'minus' && !isNegativeNumber && !isDigit) {
      isNegativeNumber = true;
    } 

    if (btn.className === 'btn digit' && !isEquals) {
      isDigit = true;
      number += btn.innerText;
      currentNumber = convertToNum(number);

      if (isNegativeNumber) {
        currentNumber *= -1;
      }

      if (ab.length >= 1) {
        ab[1] = currentNumber;
      }
    }

    if (btn.className === 'btn operators') {
      isEquals = false;

      if (btn.id === 'plus') currentOperator = add
      if (btn.id === 'minus' && isDigit) currentOperator = subtract;
      if (btn.id === 'multiply') currentOperator = multiply;
      if (btn.id === 'divide') currentOperator = divide;

      if (ab.length === 2) {
        ab = [];
        ab[0] = currentAnswer
      }
      
      if (btn.id != 'minus') {
        isNegativeNumber = false;

        if (ab.length === 0) {
          ab[0] = currentNumber;
        }
      }

      if (btn.id === 'minus' && isDigit) {
        isNegativeNumber = false;
        if (ab.length === 0) {
          ab[0] = currentNumber;
        }
      }

      isDigit = false;
      number = '';
      currentNumber = 0;
    }

    if (ab.length === 2 && !isEquals) {
      currentAnswer = operate(currentOperator, ab[0], ab[1]);
      answerDisplay.innerText = currentAnswer;
    }
  })})
}


function displayOperation() {
  buttons.forEach(btn => { btn.addEventListener('click', () => {
    //if isStart, can only enter digits
    if(isStart) {
      if (btn.id === '' || btn.id === 'minus' && !isMinus) {
        isStart = false;
        isMinus = false;
        toDisplay += btn.innerText;
        if (btn.id === 'minus') {
          isStart = true;
          isMinus = true;
        }
      } 

    } else { //can enter operators and the other numbers
      if (btn.id === ''){ //if btn is digits, add toDisplay
          isMinus = false;
          operatorCount = 0;
        
        if (isEquals) {
          clear();
          isStart = false;
          toDisplay += btn.innerText;
        } else {
          toDisplay += btn.innerText;
        }
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
          toDisplay = del(toDisplay);
          operatorCount = 1;
          toDisplay += `${btn.innerText}`;
        } else if (btn.id === 'minus' && isPlus) { //changing plus with minus
          toDisplay = del(toDisplay);
          operatorCount = 1;
          toDisplay += `${btn.innerText}`;
        }
      } else if (operatorCount === 2) { //consecutive symbols: /- and *-
        if (btn.id === 'plus' || btn.id === 'multiply' || btn.id === 'divide') {
          toDisplay = del(toDisplay, 2)
          operatorCount = 1;
          isMinus = false;
          toDisplay += `${btn.innerText}`;
        }
      } 

      if (operatorCount === 1 && !isPlus && !isMinus) { //to allow minus after / and *
        if (btn.id === 'minus') {
          isMinus = true;
          operatorCount = 2;
          toDisplay += `${btn.innerText}`;
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
          toDisplay += `${btn.innerText}`;
        } else if (btn.id === 'minus') {  
          isPlus = false;
          isMinus = true;
          operatorCount = 1;;
          toDisplay += `${btn.innerText}`;
        }
      }
    }

    if (toDisplay) {
      display.innerText = toDisplay;
    }
  })})
}