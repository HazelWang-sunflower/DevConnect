import { useState } from "react";

export default function MagicInput() {
  const [text, setText] = useState("");
  const [sum, setSum] = useState(0);
  const debounceHandler = (e: any, fn: Function, timer: number) => {
    const val = e.target.value || "";
    return setTimeout(() => {
      fn(val);
    }, timer);
  };

  const changeHandler = (val: any) => {
    setText(val);
  };

  const operate = (num1: number, operator: string, num2: number) => {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
      default:
        return 0;
    }
  };

  const calculateHandler = (e: any) => {
    const values = e.target.value;
    setText(values);
    let tokens = values.match(/(\d+\.?\d*|\+|\-|\*|\/)/g) || [];
    const numbers: number[] = [];
    const operators: string[] = [];

    for (const token of tokens) {
      if (["+", "-", "*", "/"].includes(token)) {
        operators.push(token);
      } else {
        numbers.push(parseFloat(token));
      }
    }

    while (operators.length > 0) {
      let index = operators.findIndex((op) => op === "*" || op === "/");
      if (index === -1) index = 0;

      const operator = operators.splice(index, 1)[0];
      const b = numbers.splice(index + 1, 1)[0] ?? 0;
      const a = numbers.splice(index, 1)[0];

      switch (operator) {
        case "+":
          numbers.splice(index, 0, a + b);
          break;
        case "-":
          numbers.splice(index, 0, a - b);
          break;
        case "*":
          numbers.splice(index, 0, a * b);
          break;
        case "/":
          numbers.splice(index, 0, a / b);
          break;
      }
    }
    setSum(numbers[0]);
  };
  return (
    <div>
      Input:
      <input
        className="w-full"
        type="text"
        value={text}
        onChange={calculateHandler}
      />
      <p>This is {sum}</p>
    </div>
  );
}
