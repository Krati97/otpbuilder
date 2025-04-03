import { useEffect, useRef, useState } from "react";
import "./styles.css";

// If number is changed below, the number of  otp digits will change automatically
const Num_of_otp_digits = 5;
export default function App() {
  const [inputArr, setInputArr] = useState(
    new Array(Num_of_otp_digits).fill("")
  );

  const refArr = useRef([]);

  // Focus on the first input when the component is mounted (for ex: on page refresh)
  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleOnChange = (value, index) => {
    if (isNaN(value)) return;

    // Remove all spaces from the input value
    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);

    // Focus on the next input box if the current input is not empty
    newValue && refArr.current[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    // If the current input is empty and the backspace key is pressed, focus on the previous input box
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
