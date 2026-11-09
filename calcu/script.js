// Get HTML elements
// Get calculator element
const calculator = document.querySelector('.calculator');

// 1. Minimize calculator
function minimize() {

    calculator.style.display = 'none';

    document.getElementById('showIt').style.display = 'block';
}


// 2. Maximize calculator
let maximized = false;

function maximize() {

    if (maximized === false) {

        calculator.style.width = '95%';
        calculator.style.maxWidth = 'none';
        calculator.style.minHeight = '80vh';

        maximized = true;

    } 
    else {

        calculator.style.width = '430px';
        calculator.style.maxWidth = 'none';
        calculator.style.minHeight = '0';

        maximized = false;
    }
}


// 3. Close calculator
function closed() {

    calculator.style.display = 'none';

    document.getElementById('showIt').style.display = 'none';
}











const currentDisplay = document.getElementById('currentDisplay');
const historyDisplay = document.getElementById('history');

// Store the current expression
let inputs= '';

// Store calculation history
let history = [];


// 1. Add numbers and operators to display
// 1. Add numbers and operators to display
function appendValue(value) {

    const operators = ['+', '-', '×', '÷'];

    // Get the last character
    const lastCharacter = inputs.slice(-1);

    // Check if the new value is an operator
    if (operators.includes(value)) {

        // Allow minus at the beginning
        if (inputs === '') {
            if (value === '-') {
                inputs += value;
            }
        }

        // Replace the previous operator
        else if (operators.includes(lastCharacter)) {
            inputs =inputs.slice(0, -1) + value;
        }

        // Add operator if the previous character is not an operator
        else {
           inputs += value;
        }

    } else {
       inputs += value;
    }

    currentDisplay.textContent =inputs || '0';
}


// 2. Clear the current display
function clearDisplay() {

   inputs = '';

    currentDisplay.textContent = '0';
}


// 3. Undo the last character
function undo() {

   inputs =inputs.slice(0, -1);

    if (inputs === '') {
        currentDisplay.textContent = '0';
    } else {
        currentDisplay.textContent =inputs;
    }
}


// 4. Calculate the result
function calculate() {

    try {

        if (inputs=== '') {
            return;
        }

        // Convert calculator symbols into JavaScript operators
        let calculation =inputs
            .replaceAll('×', '*')
            .replaceAll('÷', '/')
            .replaceAll('²', '**2')
            .replaceAll('√', 'Math.sqrt');

        

        // Perform the calculation
        let result = Function(
            '"use strict"; return (' + calculation + ')'
        )();

        // Remove unnecessary decimal digits
        result = Number(result.toPrecision(12));

        // Save calculation in history
        history.push({
           inputs:inputs,
            result: result
        });

        // Display history
        showHistory();

        // Display final answer
       inputs = String(result);

        currentDisplay.textContent = result;

    } catch (error) {

        currentDisplay.textContent = 'Error';

       inputs = '';

    }

}


// 5. Show previous calculations
function showHistory() {

    historyDisplay.innerHTML = '';

    // Show only the latest three calculations
    let recentHistory = history.slice(-3);

    recentHistory.forEach(function(item) {

        const row = document.createElement('div');

        row.className = 'history-row';

        row.innerHTML = `
            <span>${item.inputs}</span>
            <span>=</span>
            <span class="history-result">${item.result}</span>
        `;

        historyDisplay.appendChild(row);

    });

}


// 6. Keyboard support
document.addEventListener('keydown', function(event) {

    const key = event.key;

    if ('0123456789.+-()%'.includes(key)) {

        appendValue(key);

    } else if (key === '*') {

        appendValue('×');

    } else if (key === '/') {

        event.preventDefault();
        appendValue('÷');

    } else if (key === 'Enter' || key === '=') {

        event.preventDefault();
        calculate();

    } else if (key === 'Backspace') {

        undo();

    } else if (key === 'Escape') {

        clearDisplay();

    }

});


// style

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #1e1e1e;
    font-family: Arial, sans-serif;

    display: flex;
    justify-content: center;
    align-items: center;

    min-height: 100vh;
}

/* Main calculator */
.calculator {
    width: 430px;
    background-color: #292929;
    border: 1px solid #111;
    border-radius: 8px;
    padding: 8px;
    text-align: center;
    /* position: relative; */
   
}


/* Top bar */
.top-bar {
    /* position:relative; */
    border-bottom:1px solid black;
    height: 28px;
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    color: white;
    padding: 0px;
    width: calc(100% + 16px);
    margin-left: -8px;
    box-sizing: border-box;
}
.top-bar span{
    margin-left: 170px;
}

.window-buttons {
    display: flex;
    gap: 15px;
    margin-right: 8px;
}

.window-btn {
    border: none;
    background-color: #444;
    color: white;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    cursor: pointer;
}

.close-btn {
    background-color: #444;
}

/* Menu */
.menu {
    display: flex;
    gap: 20px;
    color: #ddd;
    padding: 10px 2px;
    font-size: 14px;
   /* cursor: pointer;  */
}
.using-cursor{
    cursor: pointer;
}


/* Display section */

.display {
    background-color: #292929;
    height: 185px;
    margin-bottom: 7px;
    padding: 0;
    border: none;
    display: flex;
    flex-direction: column;
    gap: 7px;

}

/* Calculation history */

   .history {
    background-color: #242424;
    flex: 1;
    overflow-y: auto;
    color: #ddd;
    font-size: 18px;
    border: 1px solid #444;
    padding: 10px 14px;
    text-align: left;
    /* padding: 60px 14px 10 px; */
}



.history-row {
    display: grid;
    grid-template-columns: 1fr 20px 1fr;
    margin-bottom: 5px;
}
.history-row > :first-child{
    text-align: left;
}
/* .history-row > :nth-child(2){
    padding-left: 60px;
} */
.history-row > :last-child{
    text-align: right;
    font-weight: bold;
}

/* .history-result {
   
    text-align: right;
    font-weight: bold;
} */

/* Current answer */

   .current-display {
    height: 68px;
    /* flex-shrink: 0; */

    border: 1px solid #444;
    background-color: #242424;

    display: flex;
    justify-content: flex-end;
    /* align-items: flex-start; */

    padding: 10px 14px;
    color: white;
    font-size: 24px;
    font-weight: bold;

    /* overflow-x: auto; */
}


/* Buttons */
.buttons {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 3px;
}

.buttons button {
    height: 34px;
    border: 1px solid #181818;
    border-radius: 5px;

    background-color: #383838;
    color: white;

    font-size: 14px;
    cursor: pointer;
}

.buttons button:hover {
    background-color: #505050;
}

.buttons button:active {
    background-color: #2d2a2a;
}

/* Clear button */
.buttons .clear {
    background-color: #b00020;
}

.buttons .clear:hover {
    background-color: #d00025;
}

/* Equal button */
.buttons .equal {
    grid-column: span 2;
    background-color: #85836a;
}

.buttons .equal:hover {
    background-color: #a09d7c;
}

@media (min-width: 600px) {
    .calculator[style*="95%"] {
        width: 95%;
        height: 95vh;
        max-width: none;
        display: flex;
        flex-direction: column;
    }

    .calculator[style*="95%"] .display {
        flex: 1;
        min-height: 0;
    }
}

@media (max-height: 600px) {
    .calculator[style*="95%"] {
        height: 95vh;
    }
}