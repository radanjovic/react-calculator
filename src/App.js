import React, {useState} from 'react';

// Since it's a mini-project -all code is written in App/incex.css files

function App() {
    // Setting state
    const [display, setDisplay] = useState(0);
    const [toReplace, setToReplace] = useState(null);
    const [firstNumber, setFirstNumber] = useState(null);
    const [secondNumber, setSecondNumber] = useState(null);
    const [operand, setOperand] = useState(null);
    const [evaluated, setEvaluated] = useState(false);

    // Functions to handle different clicks
    // Numbers
    function handleNumberClick(val) {
        if (evaluated) { // start again
            setDisplay(val);
            setFirstNumber(null);
            setEvaluated(false);
            return;
        }
        if (display === 0) {
            if (val === '0') {
                return;
            }
            setDisplay(val);
        } else {
            setDisplay(prev => prev+=val);
        }
    }

    // Operands
    function handleOperandClick(oper) {
        if (display === 0) {
            return;
        }
        if (!firstNumber) {
            setFirstNumber(display);
            setOperand(oper);
            setToReplace(display+oper);
            setDisplay(prev => prev+=oper);
        } else {
            // Handling - (possible negative numbers)
            if (firstNumber && operand && oper === '-' && (display[display.length-1] === operand)) {
                setDisplay(prev => prev+='-');
                return;
            }
            if (firstNumber && operand && oper !== '-' && display[display.length-1] === '-') {
                setToReplace(prev => prev.replace(/.$/, oper));
                setDisplay(prev => prev.slice(0, -2) + oper);
                setOperand(oper);
                return;
            }
            if (evaluated) {
                setOperand(oper);
                setToReplace(display+oper);
                setDisplay(prev => prev+=oper);
                setEvaluated(false);
            } else {
                let sN = display.replace(toReplace, '');
                switch (operand) {
                    case '+':
                        let result = (Number(firstNumber) + Number(sN));
                        setFirstNumber(result);
                        setOperand(oper);
                        setDisplay(result+oper);
                        setToReplace(result+oper);
                        break;
                    case '-':
                        let result2 = (Number(firstNumber) - Number(sN));
                        setFirstNumber(result2);
                        setOperand(oper);
                        setDisplay(result2+oper);
                        setToReplace(result2+oper);
                        break;
                    case '*':
                        let result3 = (Number(firstNumber) * Number(sN));
                        setFirstNumber(result3);
                        setOperand(oper);
                        setDisplay(result3+oper);
                        setToReplace(result3+oper);
                        break;
                    case '/':
                        let result4 = (Number(firstNumber) / Number(sN));
                        setFirstNumber(result4);
                        setOperand(oper);
                        setDisplay(result4+oper);
                        setToReplace(result4+oper);
                        break;
                    default: console.log(operand);
                }
            }
        }
    }

    // . (decimal)
    function handleDecimalClick() {
        if (!firstNumber) {
            if (display === 0) {
                setDisplay('0.');
                return;
            }
            if (display.includes('.')) {
                return;
            }
            setDisplay(prev => prev+='.');
        } else {
            let sN = display.replace(toReplace, '');
            if (sN.includes('.')) {
                return;
            }
            if (sN === '') {
                setDisplay(prev => prev+='0.');
                return;
            }
            setDisplay(prev => prev+='.');
        }
    }

    // = (equal/evaluate)
    function handleEqual() {
        if (firstNumber && operand && !secondNumber) {
            let sN = display.replace(toReplace, '');
            setSecondNumber(sN);
            switch (operand) {
                case '+':
                    let result = (Number(firstNumber) + Number(sN));
                    setFirstNumber(result);
                    setSecondNumber(null);
                    setOperand(null);
                    setDisplay(result);
                    setToReplace(null)
                    setEvaluated(true);
                    break;
                case '-':
                    let result2 = (Number(firstNumber) - Number(sN));
                    setFirstNumber(result2);
                    setSecondNumber(null);
                    setOperand(null);
                    setDisplay(result2);
                    setToReplace(null);
                    setEvaluated(true);
                    break;
                case '*':
                    let result3 = (Number(firstNumber) * Number(sN));
                    setFirstNumber(result3);
                    setSecondNumber(null);
                    setOperand(null);
                    setDisplay(result3);
                    setToReplace(null);
                    setEvaluated(true);
                    break;
                case '/':
                    let result4 = (Number(firstNumber) / Number(sN));
                    setFirstNumber(result4);
                    setSecondNumber(null);
                    setOperand(null);
                    setDisplay(result4);
                    setToReplace(null);
                    setEvaluated(true);
                    break;
                default: console.log(operand);
            }
        }
        if (firstNumber && secondNumber) {
            switch (operand) {
                case '+':
                    let result = (Number(firstNumber) + Number(secondNumber));
                    setFirstNumber(result);
                    setSecondNumber(null);
                    setOperand(null);
                    setDisplay(result);
                    setToReplace(null)
                    setEvaluated(true);
                    break;
                case '-':
                    let result2 = (Number(firstNumber) - Number(secondNumber));
                    setFirstNumber(result2);
                    setSecondNumber(null);
                    setOperand(null);
                    setDisplay(result2);
                    setToReplace(null);
                    setEvaluated(true);
                    break;
                case '*':
                    let result3 = (Number(firstNumber) * Number(secondNumber));
                    setFirstNumber(result3);
                    setSecondNumber(null);
                    setOperand(null);
                    setDisplay(result3);
                    setToReplace(null);
                    setEvaluated(true);
                    break;
                case '/':
                    let result4 = (Number(firstNumber) / Number(secondNumber));
                    setFirstNumber(result4);
                    setSecondNumber(null);
                    setOperand(null);
                    setDisplay(result4);
                    setToReplace(null);
                    setEvaluated(true);
                    break;
                default: console.log(operand);
            }
        }
    }

    // AC (clear)
    function handleClear() {
        setDisplay(0);
        setToReplace(null);
        setFirstNumber(null);
        setSecondNumber(null);
        setOperand(null);
        setEvaluated(false);
    }
 
    return (<>
        <div id='container'>
            <h3>Calculator</h3>
            <div id='display'>
                {display}
            </div>
            <br />
            <button onClick={(e) => handleNumberClick(e.target.value)} id='seven' value='7'>7</button>
            <button onClick={(e) => handleNumberClick(e.target.value)} id='eight' value='8'>8</button>
            <button onClick={(e) => handleNumberClick(e.target.value)} id='nine' value='9'>9</button>
            <button onClick={(e) => handleOperandClick(e.target.value)} className='operand' id='add' value='+'>+</button>
            <button onClick={(e) => handleNumberClick(e.target.value)} id='four' value='4'>4</button>
            <button onClick={(e) => handleNumberClick(e.target.value)} id='five' value='5'>5</button>
            <button onClick={(e) => handleNumberClick(e.target.value)} id='six' value='6'>6</button>
            <button onClick={(e) => handleOperandClick(e.target.value)} className='operand' id='subtract' value='-'>-</button>
            <button onClick={(e) => handleNumberClick(e.target.value)} id='one' value='1'>1</button>
            <button onClick={(e) => handleNumberClick(e.target.value)} id='two' value='2'>2</button>
            <button onClick={(e) => handleNumberClick(e.target.value)} id='three' value='3'>3</button>
            <button onClick={(e) => handleOperandClick(e.target.value)} className='operand' id='divide' value='/'>/</button>
            <button onClick={handleClear} id='clear' value='AC'>AC</button>
            <button onClick={(e) => handleNumberClick(e.target.value)} id='zero' value='0'>0</button>
            <button onClick={handleDecimalClick} id='decimal' value='.'>.</button>
            <button onClick={(e) => handleOperandClick(e.target.value)} className='operand' id='multiply' value='*'>*</button>
            <button onClick={handleEqual} id='equals' value='='>=</button>
        </div>
    </>)
}

export default App;
