import react, { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [screen, setScreen] = useState("0");
  const [state, setState] = useState("S1");
  const [lastOperator, setLastOperator] = useState("");
  const [firstOperand, setFirstOperand] = useState(0);

  const operatorDefault = () => {
    return {
      plus: lastOperator === "+" ? "btn-yellow" : "btn-green",
      minus: lastOperator === "-" ? "btn-yellow" : "btn-green",
    };
  };

  const updateScreen = (value) => setScreen(value.toString());

  const numberClicked = (number) => {
    if (state === "S1") {
      setScreen(number.toString());
      setState("S2");
    } else if (state === "S2") {
      if (screen.length < 9) setScreen(screen + number.toString());
    } else if (state === "S3") {
      setScreen(number.toString());
      setState("S2");
    }
  };

  const operatorClicked = (operator) => {
    if (state === "S2") {
      setFirstOperand(parseFloat(screen));
      setLastOperator(operator);
      setState("S3");
    } else if (state === "S3") {
      setLastOperator(operator);
    }
  };

  const equalsClicked = () => {
    if (state === "S2" && lastOperator) {
      const secondOperand = parseFloat(screen);
      let result;

      switch (lastOperator) {
        case "+":
          result = firstOperand + secondOperand;
          break;
        case "-":
          result = firstOperand - secondOperand;
          break;
        default:
          return;
      }

      setScreen(result.toString());
      setState("S1");
      setLastOperator("");
    }
  };

  const ceClicked = () => {
    setScreen("0");
    setState("S1");
    setLastOperator("");
    setFirstOperand(0);
  };

  const { plus, minus } = operatorDefault();

  return (
    <div className="cal-container">
      <div className="cal-screen" id="screen">{screen}</div>

      <div className="cal-btn">
        <button className="btn btn-green">MC</button>
        <button className="btn btn-green">MR</button>
        <button className="btn btn-green">M+</button>
        <button className="btn btn-green">M-</button>
        <button className="btn btn-red" onClick={ceClicked}>CE</button>
      </div>

      <div className="cal-btn">
        <button className="btn btn-blue" onClick={() => numberClicked(7)}>7</button>
        <button className="btn btn-blue" onClick={() => numberClicked(8)}>8</button>
        <button className="btn btn-blue" onClick={() => numberClicked(9)}>9</button>
        <button className="btn btn-green" id="divide">÷</button>
        <button className="btn btn-green">√</button>
      </div>

      <div className="cal-btn">
        <button className="btn btn-blue" onClick={() => numberClicked(4)}>4</button>
        <button className="btn btn-blue" onClick={() => numberClicked(5)}>5</button>
        <button className="btn btn-blue" onClick={() => numberClicked(6)}>6</button>
        <button className="btn btn-green" id="times">×</button>
        <button className="btn btn-green">%</button>
      </div>

      <div className="cal-btn">
        <button className="btn btn-blue" onClick={() => numberClicked(1)}>1</button>
        <button className="btn btn-blue" onClick={() => numberClicked(2)}>2</button>
        <button className="btn btn-blue" onClick={() => numberClicked(3)}>3</button>
        <button className={`btn ${minus}`} onClick={() => operatorClicked("-")} id="minus">−</button>
        <button className="btn btn-green">&</button>
      </div>

      <div className="cal-btn">
        <button className="btn btn-blue" onClick={() => numberClicked(0)}>0</button>
        <button className="btn btn-blue" onClick={() => numberClicked(".")}>.</button>
        <button className="btn btn-blue">±</button>
        <button className={`btn ${plus}`} onClick={() => operatorClicked("+")} id="plus">+</button>
        <button className="btn btn-green" onClick={equalsClicked} id="equals">=</button>
      </div>
    </div>
  );
}
