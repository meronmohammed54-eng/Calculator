const calculator = document.querySelector('.calculator');
function minimize() {
  calculator.style.display = 'none';
}

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

function closed() {

    calculator.style.display = 'none';

    document.getElementById('showIt').style.display = 'none';
}


const currentDisplay = document.getElementById('currentDisplay');
const historyDisplay = document.getElementById('history');

let inputs= '';
let history = [];

function appendValue(value) {

    const operators = ['+', '-', '×', '÷'];
    const lastCharacter = inputs.slice(-1);

    if (operators.includes(value)) {

        if (inputs === '') {
            if (value === '-') {
                inputs += value;
            }
        }

       
        else if (operators.includes(lastCharacter)) {
            inputs =inputs.slice(0, -1) + value;
        }

        else {
           inputs += value;
        }

    } else {
       inputs += value;
    }

    currentDisplay.textContent =inputs || '0';
}

function clearDisplay() {

   inputs = '';

    currentDisplay.textContent = '0';
}



function undo() {

   inputs =inputs.slice(0, -1);

    if (inputs === '') {
        currentDisplay.textContent = '0';
    } else {
        currentDisplay.textContent =inputs;
    }
}


function calculate() {

    try {

        if (inputs=== '') {
            return;
        }
        let calculation =inputs
            .replaceAll('×', '*')
            .replaceAll('÷', '/')
            .replaceAll('²', '**2')
            .replaceAll('√', 'Math.sqrt');
             let result = Function(
            '"use strict"; return (' + calculation + ')'
        )();

        result = Number(result.toPrecision(12));
        history.push({
           inputs:inputs,
            result: result
        });

        showHistory();

       inputs = String(result);

        currentDisplay.textContent = result;

    } catch (error) {

        currentDisplay.textContent = 'Error';

       inputs = '';
}
}

function showHistory() {

    historyDisplay.innerHTML = '';

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
