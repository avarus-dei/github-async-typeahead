import { React, useState, useRef } from "react";

export default function SearchBar(props) {
  const nameInput = useRef();
  // const [inputValue, setInputValue] = useState("");
  const searchHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInput.current.value.toLowerCase();
    // setInputValue(event.target.value);
    props.onInput(enteredName);
  };

  return (
    <div>
      <input type="text" onChange={searchHandler} ref={nameInput} />
    </div>
  );
}
