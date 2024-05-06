class calculator{
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement
        this.currentTextElement = currentTextElement
        this.clear()
    }

    clear(){
        this.current = '';
        this.previous = '';
        this.operation = undefined;
    }

    delete(){
        this.current = this.current.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === ',' && this.current.includes(',')) return;
        
        if (number === ',') {
            number = '.';
        }
        this.current = this.current.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.current === '') return
        if (this.previous !== '') {
            this.compute()
        }

        this.operation = operation
        this.previous = this.current
        this.current = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previous.replace(',', '.'));
        const current = parseFloat(this.current.replace(',', '.'));

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return;
        }
        this.current = computation.toString();
        this.operation = undefined;
        this.previous = '';
    }


    getDisplayNumber(number) {
        if (number === '') {
            return '';
        }

        const numberFloat = parseFloat(number.replace(',', '.'));

        if (isNaN(numberFloat)) {
            return '';
        }

        return numberFloat.toLocaleString('pt-BR', {minimumFractionDigits: 0, maximumFractionDigits: 10});
    
        }
        
        updateDisplay() {
            this.currentTextElement.innerText =
                this.getDisplayNumber(this.current);
            if (this.operation) {
                this.previousTextElement.innerText =
                    `${this.getDisplayNumber(this.previous)} ${this.operation}`
            }   else {
                this.previousTextElement.innerText = '';
            }
        }
        
    }

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')

const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')

const previousTextElement = document.querySelector('[data-previous]')
const currentTextElement = document.querySelector('[data-current]')


const black = new calculator(previousTextElement, currentTextElement)


numberButtons.forEach(button =>{
    button.addEventListener('click', () => {
        black.appendNumber(button.innerText)
        black.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        black.chooseOperation(button.innerText)
        black.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    black.compute()
    black.updateDisplay()
})

clearButton.addEventListener('click', () => {
    black.clear()
    black.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    black.delete()
    black.updateDisplay()
})
