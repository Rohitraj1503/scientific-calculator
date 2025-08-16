const resultDisplay = document.querySelector('.result');
const expressionDisplay = document.querySelector('.expression');
const buttons = document.querySelectorAll('.button');

let currentExpression = '';

// This is a more robust way to handle the calculation logic
function calculateExpression(expression) {
    // Regex to replace scientific functions with valid JavaScript Math functions
    expression = expression
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/√/g, 'Math.sqrt')
        .replace(/\^/g, '**')
        .replace(/x/g, '*');

    // A simple factorial function
    function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0) return 1;
        let result = 1;
        for (let i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // Replace the factorial operator
    expression = expression.replace(/(\d+)!/g, (match, p1) => `factorial(${p1})`);

    try {
        // Use a trusted library or a robust parser for production.
        // For a simple example, eval() is used, but it's not safe.
        // It's crucial to implement a proper expression evaluator for a real app.
        return eval(expression);
    } catch (e) {
        return 'Error';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'AC') {
            currentExpression = '';
            resultDisplay.textContent = '0';
            expressionDisplay.textContent = '';
        } else if (value === '=') {
            const result = calculateExpression(currentExpression);
            expressionDisplay.textContent = currentExpression + ' =';
            resultDisplay.textContent = result;
            currentExpression = result.toString();
        } else if (value === '!') {
            currentExpression += '!';
            expressionDisplay.textContent = currentExpression;
        } else if (['sin', 'cos', 'tan', 'log', 'ln', '√'].includes(value)) {
            currentExpression += value + '(';
            expressionDisplay.textContent = currentExpression;
        } else if (value === '+/-') {
            // Toggling sign is a bit more complex
            if (currentExpression.startsWith('-')) {
                currentExpression = currentExpression.substring(1);
            } else {
                currentExpression = '-' + currentExpression;
            }
            expressionDisplay.textContent = currentExpression;
        } else {
            currentExpression += value;
            expressionDisplay.textContent = currentExpression;
        }
    });
});