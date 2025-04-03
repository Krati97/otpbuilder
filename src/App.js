import { useEffect, useRef, useState } from "react";
import "./styles.css";

const Num_of_otp_digits = 5;
export default function App() {
  const [inputArr, setInputArr] = useState(
    new Array(Num_of_otp_digits).fill("")
  );

  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleOnChange = (value, index) => {
    if (isNaN(value)) return;
    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);

    newValue && refArr.current[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };

  return (
    <div className="App">
      <h1>Validate otp</h1>

      {inputArr.map((input, index) => {
        return (
          <input
            key={index}
            className="otp-input"
            type="text"
            value={inputArr[index]}
            ref={(input) => (refArr.current[index] = input)}
            onChange={(e) => handleOnChange(e.target.value, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
}
