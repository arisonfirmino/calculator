const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");

const previous = document.querySelector(".previous");
const current = document.querySelector(".current");

class Calculator {
    constructor(previous, current) {
        this.previous = previous;
        this.current = current;

        this.clear();
    }

    formatNumber(number) {
        const stringNumber = number.toString();

        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];

        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    calculate() {
        let result;

        const previousOperandFloat = parseFloat(this.previousOperand);
        const currentOperandFloat = parseFloat(this.currentOperand);

        if (isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return;

        switch (this.operation) {
            case "+":
                result = previousOperandFloat + currentOperandFloat;
                break;
            case "-":
                result = previousOperandFloat - currentOperandFloat;
                break;
            case "÷":
                result = previousOperandFloat / currentOperandFloat;
                break;
            case "*":
                result = previousOperandFloat * currentOperandFloat;
                break;
            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;

        if (this.previousOperand !== "") {
            this.calculate();
        }

        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    addNumber(number) {
        if (this.currentOperand.includes(".") && number === ",") return;

        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.previous.innerText = `${this.formatNumber(this.previousOperand)} ${
            this.operation || ""
        }`;
        this.current.innerText = this.formatNumber(this.currentOperand);
    }
}

const calculator = new Calculator(previous, current);

for (const numberButton of numberButtons) {
    numberButton.addEventListener("click", function () {
        calculator.addNumber(numberButton.innerText);

        calculator.updateDisplay();
    });
}

for (const operationButton of operationButtons) {
    operationButton.addEventListener("click", function () {
        calculator.chooseOperation(operationButton.innerText);

        calculator.updateDisplay();
    });
}

document.querySelector("[data-delete]").addEventListener("click", function () {
    calculator.delete();
    calculator.updateDisplay();
});

document
    .querySelector("[data-all-clear]")
    .addEventListener("click", function () {
        calculator.clear();
        calculator.updateDisplay();
    });

document.querySelector("[data-equals]").addEventListener("click", function () {
    calculator.calculate();
    calculator.updateDisplay();
});
