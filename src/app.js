import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'

class Calculator extends React.Component {

    state = {
        displayValue: '0',
        waitingForOperand: false,
        operationToPerform: '',
        value: 0,
        operationToPerformWhenOnlyEqualisNext: '',
        operandWhenOnlyEqualIsNext: ''
    };

    clearDisplay() {
        this.setState({
            displayValue: '0',
            waitingForOperand: false,
            operationToPerform: '',
            value: 0,
            operationToPerformWhenOnlyEqualisNext: '',
            operandWhenOnlyEqualIsNext: ''
        });
    }

    inputDigit(digit) {
        const { displayValue, waitingForOperand } = this.state;

        if(waitingForOperand) {
            this.setState({
                value: displayValue,
                displayValue: String(digit),
                waitingForOperand: false
            })
        } else {
            this.setState({
                displayValue: displayValue === '0' ? String(digit) : displayValue+String(digit)
            })
        }
    }

    inputDot() {
        const { displayValue, waitingForOperand } = this.state;

        if(waitingForOperand) {
            this.setState({
                value: displayValue,
                displayValue: '.',
                waitingForOperand: false
            })
        } else if(displayValue.indexOf('.') === -1) {
            this.setState({
                displayValue: displayValue + '.'
            })
        }
    }

    toggleSign() {
        let { displayValue } = this.state;
        if(displayValue !== '0') {
            displayValue =  displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue;
        }

        this.setState({
            displayValue: displayValue
        });
    }

    calculatePercent() {
        let { displayValue } = this.state;
        if(displayValue !== '0') {
            displayValue =  parseFloat(displayValue) / 100;
        }
        this.setState({
            displayValue: displayValue,
            value: displayValue // need to set value to displayValue coz calculating %age is like clearing previously calculated history after which only currently displayed value matters.
        })
    }

    performOperation(operator) {
        let { displayValue, operationToPerform, value, operationToPerformWhenOnlyEqualisNext, operandWhenOnlyEqualIsNext } = this.state;
        if(displayValue === '.') {
            displayValue = '0';// This takes care of the case when we enter . and press equal or any other operator.
        }
        const operations = {
            '/' : (prevOperand, currentOperand) => Number(prevOperand)/ Number(currentOperand),
            '*' : (prevOperand, currentOperand) => Number(prevOperand) * Number(currentOperand),
            '-' : (prevOperand, currentOperand) => Number(prevOperand) - Number(currentOperand),
            '+' : (prevOperand, currentOperand) => Number(prevOperand) + Number(currentOperand),
            '=' : (prevOperand, currentOperand) => Number(prevOperand),
        }

        if(operationToPerform) {
            let calculatedValue;
            if(operationToPerform === '=' && operator === '=') {
                calculatedValue = String(operations[operationToPerformWhenOnlyEqualisNext](value, operandWhenOnlyEqualIsNext));
            } else {
                calculatedValue = String(operations[operationToPerform](value, displayValue));
            }
            this.setState({
                displayValue: calculatedValue,
                value: calculatedValue
            });
        }

        this.setState({
            waitingForOperand: true,
            operationToPerform: operator
        });
        if(operator === '=' && operationToPerform !== '=') {
            this.setState({
                operationToPerformWhenOnlyEqualisNext: operationToPerform,
                operandWhenOnlyEqualIsNext: displayValue
            })
        }
    }

    render() {
        const { displayValue } = this.state;
        return (
              <div className="calculator">
                <div className="calculator-display">{displayValue}</div>
                <div className="calculator-keypad">
                    <div className="input-keys">
                        <div className="function-keys">
                        <button className="calculator-key key-clear" onClick={ () => this.clearDisplay() }>AC</button>
                        <button className="calculator-key key-sign" onClick={ () => this.toggleSign() }>±</button>
                        <button className="calculator-key key-percent" onClick={ () => this.calculatePercent() }>%</button>
                    </div>
                    <div className="digit-keys">
                        <button className="calculator-key key-0" onClick={ () => this.inputDigit(0) }>0</button>
                        <button className="calculator-key key-dot" onClick={ () => this.inputDot() }>●</button>
                        <button className="calculator-key key-1" onClick={ () => this.inputDigit(1) }>1</button>
                        <button className="calculator-key key-2" onClick={ () => this.inputDigit(2) }>2</button>
                        <button className="calculator-key key-3" onClick={ () => this.inputDigit(3) }>3</button>
                        <button className="calculator-key key-4" onClick={ () => this.inputDigit(4) }>4</button>
                        <button className="calculator-key key-5" onClick={ () => this.inputDigit(5) }>5</button>
                        <button className="calculator-key key-6" onClick={ () => this.inputDigit(6) }>6</button>
                        <button className="calculator-key key-7" onClick={ () => this.inputDigit(7) }>7</button>
                        <button className="calculator-key key-8" onClick={ () => this.inputDigit(8) }>8</button>
                        <button className="calculator-key key-9" onClick={ () => this.inputDigit(9) }>9</button>
                    </div>
              </div>
              <div className="operator-keys">
                    <button className="calculator-key key-divide" onClick={ () => this.performOperation('/') }>÷</button>
                    <button className="calculator-key key-multiply" onClick={ () => this.performOperation('*') }>×</button>
                    <button className="calculator-key key-subtract" onClick={ () => this.performOperation('-') }>−</button>
                    <button className="calculator-key key-add" onClick={ () => this.performOperation('+') }>+</button>
                    <button className="calculator-key key-equals" onClick={ () => this.performOperation('=') }>=</button>
                </div>
            </div>
          </div>
        )
    }
}

ReactDOM.render(
    <div id="wrapper">
        <Calculator/>
    </div>,
    document.getElementById('app')
)
