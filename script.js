const buttons = document.querySelectorAll('.btn');
const clearBtn = document.querySelector('#clear');
const equalBtn = document.querySelector('#equals');
let answerDisplay = document.querySelector('#answer-display');
let display = document.querySelector('#display');

//display
let operatorCount = 0;
let isNum = false;
let isFloat = false;
let expression = ''

//compute
let currentAnswer = '';
let currentOperator = '';
let expr = [];
let fAnswer = 0;

let isEquals = false;

clearBtn.addEventListener('click', clear);
equalBtn.addEventListener('click', displayAnswer);

displayOperation();
compute();

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


function deleteOperator(str, n = 1) { 
  return str.slice(0, str.length - n);
}


function clear() {
  currentAnswer = '';
  operatorCount = 0;
  currentOperator = '';
  isNum = false;
  isFloat = false;
  isEquals = false;

  expression = '';
  display.innerText = '';
  answerDisplay.innerText = '';
}


function displayAnswer() {
  if (expr.length >= 3) {
    let theAnswer = currentAnswer;
    clear();
    isNum = true;
    if (!Number.isInteger(theAnswer)) {
      isFloat = true;
      theAnswer = Math.round(Number(theAnswer) * 1000) / 1000;
    }

    expression += theAnswer;
  }
}


function compute() {
  buttons.forEach(btn => { btn.addEventListener('click', () => {
    if (expression) {
      expr = toArray(expression);
      let len = expr.length - 1;

      if (len >= 2) {
        if (expr[len - 1] === '+') currentOperator = add;
        if (expr[len - 1] === '-') currentOperator = subtract;
        if (expr[len - 1] === '×') currentOperator = multiply;
        if (expr[len - 1] === '÷') currentOperator = divide;
      }

      if (len === 2) {
        fAnswer = expr[0];
      }

      if (btn.className === 'btn operators' && len > 2) {
        fAnswer = currentAnswer;
      }

      if (expr[len] === '0' && currentOperator === divide) {
        clear();
        display.innerText = 'HAHAHAHAHHAHAAHAHAAHAHAHHAHAAAHHA'
        answerDisplay.innerText = 'HAHAHAAHHAAHAHAHHAAHAHAHHAHA'
        return;
      }

      if (!isNaN(expr[len]) && len > 1) {
        currentAnswer = operate(currentOperator, Number(fAnswer), Number(expr[len]));
      }

      answerDisplay.innerText = currentAnswer;
    }
  })})
  
}


function displayOperation() {
  buttons.forEach(btn => { btn.addEventListener('click', () => {
    if (btn.className === 'btn digit') {
      isNum = true;
      operatorCount = 0;
      expression += btn.innerText;
    } 

    if (btn.id === 'point' && !isFloat) {
      if (isNaN(expression.slice(-1)) || !expression.slice(-1)) {
        expression += '0.';
      } else {
        expression += btn.innerText;
      }
      isNum = true;
      isFloat = true;
      operatorCount = 0;
    }
    

    if (btn.className === 'btn operators' && operatorCount === 0) {
      if (expression.endsWith('.')) expression += '0';
      if (isNum) {
        isNum = false;
        isFloat = false;
        operatorCount = 1;
        expression += btn.innerText;
      } else if (!isNum && btn.id === 'minus') {
        isNum = true;
        isFloat = false;
        operatorCount = 1;
        expression += btn.innerText;
      }
    }

    // multiplying or dividing negative numbers
    if (btn.id === 'minus') {
      if (expression.endsWith('÷') || expression.endsWith('×')) {
        operatorCount = 2;
        expression += btn.innerText;
      }
    }
    
    //replacing operators
    if (!isNum && operatorCount === 1) {
      if (btn.id === 'minus' && expression.endsWith('+')) {
        expression = expression.slice(0, -1);
        expression += btn.innerText;
      } else if (btn.className === 'btn operators') {
        expression = expression.slice(0, -1);
        expression += btn.innerText;
      }
    }

    if (btn.className === 'btn operators' && btn.id != 'minus' && operatorCount === 2) {
      if (expression.endsWith('×-') || expression.endsWith('÷-')) {
        expression = expression.slice(0, -2);
        expression += btn.innerText;
        operatorCount = 1;
      }
    }
    //

    if (btn.id === 'delete') deleteChar();
    
    display.innerText = expression;
  })})
}

//format expression, convert the element if element is a number
//display the formatted expression using join

function toArray(expression) {
  return expression.match(/(?:(?<![\d.])-)?\d+(?:\.\d+)?|[÷×+-]/g);
}

function deleteChar() {
  let lastChar = expression[expression.length - 1];
  let newLast = expression[expression.length - 2];
  let secLast = expression[expression.length - 3];
  let arrExpr = toArray(expression);

  if (!isNaN(lastChar)) { //char to delete is a number
    if (newLast) {
      if (isNaN(newLast) && isNaN(secLast) && newLast != '.') { //two operators
        isNum = false;
        operatorCount = 2;
      } else if (isNaN(newLast) && newLast != '.') { //one operator
        isNum = false;
        operatorCount = 1;
      }
    }

    if (arrExpr[arrExpr.length -1].includes('.')) { //floating num
      isFloat = true;
    }
  }

  if (isNaN(lastChar)) { //char to delete is operator
    if (isNaN(newLast) && newLast != '.') { //another operator
      operatorCount = 1;
    }

    if (!isNaN(newLast)) { //a number
      isNum = true;
      operatorCount = 0;
    }

    if (arrExpr.length >= 2 && arrExpr[arrExpr.length -2].includes('.')) { //floating num
      isFloat = true;
    }
  }

  if (lastChar === '.') {
    isFloat = false;
  }

  if (!newLast) { //empty
    isNum = false;
    operatorCount = 0;
  }

  currentAnswer = '';
  expression = expression.slice(0, -1);
}