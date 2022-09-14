class Calculator {
  constructor(previousOperandButtonTextElement, currentOperandButtonTextElement) {
    this.previousOperandButtonTextElement = previousOperandButtonTextElement;
    this.currentOperandButtonTextElement = currentOperandButtonTextElement;
    this.clearBoard();
  }

  clearBoardBoard() {
    this.currentOperandButton = '';
    this.previousOperandButton = '';
    this.operations = undefined;
  }
  deleteAction() {
    this.currentOperandButton = this.currentOperandButton.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === '.' && this.currentOperandButton.includes('.')) return;
    this.currentOperandButton = this.currentOperandButton.toString() + number.toString();
  }

  chooseOperations(operations) {
    if (this.currentOperandButton === '') return;
    if (this.previousOperandButton !== '') {
      this.computeLogic();
    }
    this.operations = operations;
    this.previousOperandButton = this.currentOperandButton;
    this.currentOperandButton = '';
  }

  computeLogic() {
    let computation;
    const prev = parseFloat(this.previousOperandButton);
    const current = parseFloat(this.currentOperandButton);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operations) {
    case '+':
        computation = prev + current;
        break;
    case '-':
        computation = prev - current;
        break;
    case '*':
        computation = prev * current;
        break;
    case '÷':
        computation = prev / current;
        break;
    default:
        return;
    }
    this.currentOperandButton = computation;
    this.operations = undefined;
    this.previousOperandButton = '';
}

  displayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandButtonTextElement.innerText = this.displayNumber(
      this.currentOperandButton,
    );
    if (this.operations != null) {
      this.previousOperandButtonTextElement.innerText = `${this.displayNumber(
        this.previousOperandButton,
      )} ${this.operations}`;
    } else {
      this.previousOperandButtonTextElement.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operations]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandButtonTextElement = document.querySelector(
  '[data-previous-operand]',
);
const currentOperandButtonTextElement = document.querySelector(
  '[data-current-operand]',
);

const calculator = new Calculator(
  previousOperandButtonTextElement,
  currentOperandButtonTextElement,
);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationsButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperations(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', (button) => {
  calculator.computeLogic();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', (button) => {
  calculator.clearBoard();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', (button) => {
  calculator.deleteAction();
  calculator.updateDisplay();
});