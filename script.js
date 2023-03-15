let display = document.querySelector('#display');
let toDisplay = ''

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

function displayOperation() {
  const buttons = document.querySelectorAll('.btn');
  const clearBtn = document.querySelector('#clear');
  const equalsBtn = document.querySelector('#equals');

  let isStart = true;
  let isPlus = false;
  let isMinus = false;
  let operatorCount = 0;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      //if isStart, can only enter digits
      if(isStart) {
        if (btn.id === '' || btn.id === 'minus' && !isMinus) {
          isStart = false;
          isMinus = false;
          toDisplay += `${btn.innerText}`;
          if (btn.id === 'minus') {
            isStart = true;
            isMinus = true;
          }
        } 

      } else { //can enter operators
        if (btn.id === ''){ //if btn is digits, add toDisplay
          isMinus = false;
          operatorCount = 0;
          toDisplay += `${btn.innerText}`;
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
            operatorCount = 1;
            toDisplay += `${btn.innerText}`;
          } else if (btn.id === 'minus' && isPlus) { //changing plus with minus
            del();
            operatorCount = 1;
            toDisplay += `${btn.innerText}`;
          }
        } else if (operatorCount === 2) { //consecutive symbols: /- and *-
          if (btn.id === 'plus' || btn.id === 'multiply' || btn.id === 'divide') {
            del();
            del();
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
    })
  })

  clearBtn.addEventListener('click', () => {
    isStart = true;
    isMinus = false;
    isPlus = false;
    operatorCount = 0;

    toDisplay = '';
    display.innerText = '~';
  })

  equalsBtn.addEventListener('click', () => {

  })
}