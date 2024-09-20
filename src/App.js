import React, { useState } from "react"
import { evaluate } from 'mathjs'
import "./styles.css"

export default function App() {
    const [displayInput, setDisplayInput] = useState("")
    const [displayResult, setDisplayResult] = useState(0)
    const [lastResult, setLastResult] = useState("")
    const [hasCalculated, setHasCalculated] = useState(false)

    function clear() {
        setDisplayInput("")
        setDisplayResult(0)
        setLastResult("")
        setHasCalculated(false)
    }

    function handleClick(e) {
        const operators = ["+", "-", "*", "/"]
        const lastChar = displayInput.slice(-1)
        const secondLastChar = displayInput.slice(-2, -1)
    
        if (operators.includes(lastChar)) {
          if (e === "-") {
            setDisplayInput((prevE) => prevE + e)
            setDisplayResult(e)
            return
          } 
          else if (e === "+" && lastChar === "-" && operators.includes(secondLastChar)) {
            setDisplayInput((prevE) => prevE.slice(0, -2) + e)
            setDisplayResult(e)
            return
          }
          else if (operators.includes(e)) {
            setDisplayInput((prevE) => prevE.slice(0, -1) + e)
            setDisplayResult(e)
            return
          }
        }
    
        if (hasCalculated) {
          if (operators.includes(e)) {
            setDisplayInput(lastResult + e)
            setDisplayResult(e)
          } else {
            setDisplayInput(e)
            setDisplayResult(e)
          }
          setHasCalculated(false)
        } else {
          if (e === ".") {
            if (displayInput === "" || operators.includes(lastChar)) {
              setDisplayInput((prevE) => prevE + "0.")
              setDisplayResult("0.")
            } else if (!displayInput.match(/(\.\d*)$/)) {
              setDisplayInput((prevE) => prevE + ".")
              setDisplayResult(".")
            }
          } else {
            setDisplayInput((prevE) => prevE + e)
            setDisplayResult(e)
          }
        }
    }

    function calculate() {
        if (!hasCalculated) {
          try {
            const result = evaluate(displayInput)
            setLastResult(result)
            if (displayInput) {
              setDisplayResult(result)
              setDisplayInput(displayInput + "=" + result)
            } else {
              setDisplayResult(lastResult)
            }
            setHasCalculated(true)
          } catch (error) {
            setDisplayResult("Error")
            console.error("Invalid expression:", error)
          }
        }
      }

    return (
    <div className="calc--container">
      <div className="calc--display">
        <div className="calc--display--input">{displayInput}</div>
        <div className="calc--display--result" id="display">{displayResult}</div>
      </div>
      <div className="calc--buttons">
        <div className="calc--buttons--clear" id="clear" onClick={clear}>AC</div>
        <div className="calc--buttons--divide" id="divide" onClick={() => handleClick("/")}>/</div>
        <div className="calc--buttons--multiply" id="multiply" onClick={() => handleClick("*")}>x</div>
        <div className="calc--buttons--subtract" id="subtract" onClick={() => handleClick("-")}>-</div>
        <div className="calc--buttons--add" id="add" onClick={() => handleClick("+")}>+</div>
        <div className="calc--buttons--equals" id="equals" onClick={calculate}>=</div>
        <div className="calc--buttons--decimal" id="decimal" onClick={() => handleClick(".")}>.</div>
        <div className="calc--buttons--zero" id="zero" onClick={() => handleClick("0")}>0</div>
        <div className="calc--buttons--one" id="one" onClick={() => handleClick("1")}>1</div>
        <div className="calc--buttons--two" id="two" onClick={() => handleClick("2")}>2</div>
        <div className="calc--buttons--three" id="three" onClick={() => handleClick("3")}>3</div>
        <div className="calc--buttons--four" id="four" onClick={() => handleClick("4")}>4</div>
        <div className="calc--buttons--five" id="five" onClick={() => handleClick("5")}>5</div>
        <div className="calc--buttons--six" id="six" onClick={() => handleClick("6")}>6</div>
        <div className="calc--buttons--seven" id="seven" onClick={() => handleClick("7")}>7</div>
        <div className="calc--buttons--eight" id="eight" onClick={() => handleClick("8")}>8</div>
        <div className="calc--buttons--nine" id="nine" onClick={() => handleClick("9")}>9</div>
      </div>
    </div>
  )
}