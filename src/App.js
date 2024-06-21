import React, { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HistoryIcon from "@mui/icons-material/History";

function App() {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(0);
  const [isSecondary, setIsSecondary] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick = (value) => {
    // Replace 0 with the clicked button value
    const newInput = input === "0" ? value : input + value;
    setInput(newInput);

    // Handle secondary functions
    // Handle secondary functions
    if (isSecondary) {
      switch (value) {
        case "²":
          setInput(`Math.pow(${newInput}, 2)`);
          break;
        case "³":
          setInput(`Math.pow(${newInput}, 3)`);
          break;
        case "ʸ":
          setInput(`${newInput}**`);
          break;
        // Add more cases for other secondary functions
        default:
          break;
      }
      setIsSecondary(false); // Reset back to primary mode after handling the secondary function
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClear = () => {
    setInput("0");
    setResult("");
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = eval(input);
      setResult(calculatedResult);

      // Check if the input involves 5+6 or 6+5
      if (/^5\+6$|^6\+5$/.test(input)) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
      // Update the input with the result
      setHistory([...history, { input, result: calculatedResult.toString() }]);
      setInput(calculatedResult.toString());

      // Reset the result after calculation
      setTimeout(() => {
        setResult("");
      }); // Reset after 3 seconds (adjust as needed)
    } catch (e) {
      setResult("Error");
    }
  };

  const factorial = (n) => {
    if (n < 0) return "Error";
    return n === 0 ? 1 : n * factorial(n - 1);
  };

  const handleSpecialOperation = (operation) => {
    let currentValue = input;
    if (currentValue === "") return;

    switch (operation) {
      case "²":
      case "³":
      case "ʸ":
        setIsSecondary(true);
        break;
      // Add more cases for other secondary functions
      default:
        setIsSecondary(false);
        break;
    }

    try {
      switch (operation) {
        case "e^x":
          const newInput1 = setResult(Math.exp(eval(currentValue)));
          setInput(newInput1);
          break;
        case "1/x":
          const newInput2 = setResult(1 / eval(currentValue));
          setInput(newInput2);
          break;
        case "sqrt":
          const newInput3 = setResult(Math.sqrt(eval(currentValue)));
          setInput(newInput3);
          break;
        case "cbrt":
          const newInput4 = setResult(Math.cbrt(eval(currentValue)));
          setInput(newInput4);
          break;
        case "rootxy":
          const y = prompt("Enter the value of y:");
          if (y !== null) {
            setResult(Math.pow(eval(currentValue), 1 / eval(y)));
          }
          break;
        case "ln":
          const newInput6 = setResult(Math.log(eval(currentValue)));
          setInput(newInput6);
          break;
        case "log10":
          const newInput7 = setResult(Math.log10(eval(currentValue)));
          setInput(newInput7);
          break;
        case "10^x":
          const newInput = setResult(Math.pow(10, eval(currentValue)));
          setInput(newInput);
          break;
        case "x!":
          const newInput8 = setResult(factorial(eval(currentValue)));
          setInput(newInput8);
          break;
        case "sin":
          const newInput9 = setResult(Math.sin(eval(currentValue)));
          setInput(newInput9);
          break;
        case "cos":
          const newInput10 = setResult(Math.cos(eval(currentValue)));
          setInput(newInput10);
          break;
        case "tan":
          const newInput11 = setResult(Math.tan(eval(currentValue)));
          setInput(newInput11);
          break;
        case "sinh":
          const newInput12 = setResult(Math.sinh(eval(currentValue)));
          setInput(newInput12);
          break;
        case "cosh":
          const newInput13 = setResult(Math.cosh(eval(currentValue)));
          setInput(newInput13);
          break;
        case "tanh":
          const newInput14 = setResult(Math.tanh(eval(currentValue)));
          setInput(newInput14);
          break;
        case "e":
          const newInput15 = setResult(Math.E);
          setInput(newInput15);
          break;
        case "π":
          const newInput16 = setResult(Math.PI);
          setInput(newInput16);
          break;
          case "Rand":
            const randomNum = Math.random();
            setInput(randomNum.toString());
            break;
        case "MC":
          setMemory(0);
          break;
        case "M+":
          setResult("");
          setInput("0");
          // Add the current value to memory
          setMemory(memory + parseFloat(currentValue));
          break;

        case "M-":
          setResult("");
          setInput("0");
          // Subtract the current value from memory
          setMemory(memory - parseFloat(currentValue));
          break;

        case "MR":
          setInput(memory.toString());
          break;
        default:
          setResult("Error");
          break;
      }
    } catch (e) {
      setResult("Error");
    }
  };

  return (
    <div className={`calculator ${darkMode ? "dark-mode" : ""}`}>
      <div className="display">
        <div className="circle"></div>
        <div className="circle1"></div>
        <div className="circle2"></div>

        <HistoryIcon className="history-icon" onClick={toggleDrawer} />
  

        <div className = "mode">
          <button  onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </button>
        </div>
        <div>{input}</div>
        <div>{result}</div>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <div onClick={toggleDrawer} onKeyDown={toggleDrawer}>
            <h1>History</h1>
            <List>
              {history.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item.input} secondary={item.result} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </div>
      <div className="buttons">
        <button onClick={() => handleClick("(")}>(</button>
        <button onClick={() => handleClick(")")}>)</button>
        <button onClick={() => handleSpecialOperation("MC")}>MC</button>
        <button onClick={() => handleSpecialOperation("M+")}>M+</button>
        <button onClick={() => handleSpecialOperation("M-")}>M-</button>
        <button onClick={() => handleSpecialOperation("MR")}>MR</button>
        <button onClick={handleClear}>C</button>
        <button onClick={() => handleClick("+/-")}>+/-</button>
        <button onClick={() => handleClick("%")}>%</button>
        <button className="operator" onClick={() => handleClick("/")}>
          ÷
        </button>
        <button onClick={() => handleClick("2nd")}>2nd</button>
        <button onClick={() => handleClick("x²")}>x²</button>
        <button onClick={() => handleClick("**3")}>x³</button>
        <button onClick={() => handleClick("**")}>xʸ</button>
        <button onClick={() => handleSpecialOperation("e^x")}>eˣ</button>
        <button onClick={() => handleSpecialOperation("10^x")}>10ˣ</button>
        <button className="operation" onClick={() => handleClick("7")}>
          7
        </button>
        <button className="operation" onClick={() => handleClick("8")}>
          8
        </button>
        <button className="operation" onClick={() => handleClick("9")}>
          9
        </button>
        <button className="operator" onClick={() => handleClick("*")}>
          x
        </button>
        <button onClick={() => handleSpecialOperation("1/x")}>1/x</button>
        <button onClick={() => handleSpecialOperation("sqrt")}>√x</button>
        <button onClick={() => handleSpecialOperation("cbrt")}>∛x</button>
        <button onClick={() => handleSpecialOperation("rootxy")}>y√(x) </button>
        <button onClick={() => handleSpecialOperation("ln")}>ln</button>
        <button onClick={() => handleSpecialOperation("log10")}>log₁₀</button>

        <button className="operation" onClick={() => handleClick("4")}>
          4
        </button>
        <button className="operation" onClick={() => handleClick("5")}>
          5
        </button>
        <button className="operation" onClick={() => handleClick("6")}>
          6
        </button>
        <button className="operator" onClick={() => handleClick("-")}>
          -
        </button>

        <button onClick={() => handleSpecialOperation("x!")}>x!</button>
        <button onClick={() => handleSpecialOperation("sin")}>sin</button>
        <button onClick={() => handleSpecialOperation("cos")}>cos</button>
        <button onClick={() => handleSpecialOperation("tan")}>tan</button>
        <button onClick={() => handleSpecialOperation("e")}>e</button>
        <button onClick={() => handleSpecialOperation("EE")}>EE</button>
        <button className="operation" onClick={() => handleClick("1")}>
          1
        </button>
        <button className="operation" onClick={() => handleClick("2")}>
          2
        </button>
        <button className="operation" onClick={() => handleClick("3")}>
          3
        </button>

        <button className="operator" onClick={() => handleClick("+")}>
          +
        </button>

        <button
          className="round"
          onClick={() => handleSpecialOperation("Rand")}
          style={{ borderBottomLeftRadius: "20px" }}
        >
          Rad
        </button>
        <button onClick={() => handleSpecialOperation("sinh")}>sinh</button>
        <button onClick={() => handleSpecialOperation("cosh")}>cosh</button>
        <button onClick={() => handleSpecialOperation("tanh")}>tanh</button>

        <button onClick={() => handleSpecialOperation("π")}>π</button>
        <button onClick={() => handleSpecialOperation("Rand")}>Rand</button>
        <button className="double" onClick={() => handleClick("0")}>
          0
        </button>

        <button className="operation" onClick={() => handleClick(".")}>
          .
        </button>
        <button
          className="operator"
          onClick={handleCalculate}
          style={{ borderBottomRightRadius: "20px" }}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
