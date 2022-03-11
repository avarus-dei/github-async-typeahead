import { useRef } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
  const nameInput = useRef();

  let inputClasses = styles.input;
  if (props.nightMode) {
    inputClasses += ` ${styles.inNigthMode}`;
  } else {
    inputClasses += ` ${styles.inLigthMode}`;
  }

  const searchHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInput.current.value.trim().toLowerCase();
    props.onInput(enteredName);
  };

  return (
    <input
      className={inputClasses}
      type="search"
      placeholder="Search GitHub Users"
      aria-label="Search"
      onChange={searchHandler}
      ref={nameInput}
    />
  );
}
