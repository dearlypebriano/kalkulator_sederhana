let displayValue = '';
let currentOperand = '';
let previousOperand = '';
let operation = null;
let expression = '';

function appendNumber(number) {
    if (currentOperand.includes('.') && number === '.') return;
    currentOperand = currentOperand.toString() + number.toString();
    displayValue += number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '' && op !== '-') return;
    if (currentOperand === '' && op === '-') {
        currentOperand = '-';
        displayValue += '-';
        updateDisplay();
        return;
    }
    expression += currentOperand + ' ' + op + ' ';
    currentOperand = '';
    displayValue += ' ' + op + ' ';
    updateDisplay();
}

function calculate() {
    expression += currentOperand;
    currentOperand = evaluateExpression(expression);
    expression = '';
    displayValue = currentOperand;
    updateDisplay();
}

function clearDisplay() {
    displayValue = '';
    currentOperand = '';
    previousOperand = '';
    operation = null;
    expression = '';
    updateDisplay();
}

function appendDot() {
    if (currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + '.';
    displayValue += '.';
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue || '0';
}

function evaluateExpression(expr) {
    const tokens = expr.split(' ');
    const stack = [];
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '%': (a, b) => a % b
    };

    let outputQueue = [];
    let operatorStack = [];

    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '%': 2
    };

    for (let token of tokens) {
        if (!isNaN(token)) {
            outputQueue.push(parseFloat(token));
        } else if (token in operators) {
            while (operatorStack.length && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        }
    }

    while (operatorStack.length) {
        outputQueue.push(operatorStack.pop());
    }

    for (let token of outputQueue) {
        if (typeof token === 'number') {
            stack.push(token);
        } else {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(operators[token](a, b));
        }
    }

    return stack[0].toString();
}
