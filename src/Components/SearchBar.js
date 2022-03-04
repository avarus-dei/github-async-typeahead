import { React, useState, useRef } from "react";
import styles from "./SearchBar.module.css";

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
      <input
        className={styles.input}
        type="text"
        placeholder="Search GitHub Users"
        onChange={searchHandler}
        ref={nameInput}
      />
    </div>
  );
}
