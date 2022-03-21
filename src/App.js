import { useState } from "react";
import styles from "./App.module.css";
import SearchBar from "./Components/SearchBar";
import UserOptions from "./Components/UserOptions";
import Button from "./Components/Button";
import useDebounce from "./Components/CostumHooks/DebounceHook";

const SEARCH_URI = "https://api.github.com/search/users";

export default function App() {
  const [searchOptions, setSearchOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInNightMode, setIsInNightMode] = useState(false);
  const [clickedOutside, setclickedOutside] = useState(false);
  const [query, setQuery] = useState("");

  const changeInputHandler = (value) => {
    setQuery(value);
    setclickedOutside(true);
  };

  const searchHandler = () => {
    if (!query) {
      setSearchOptions([]);
      return;
    }
    setIsLoading(true);
    const URL = encodeURI(
      `${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`
    );

    fetch(URL)
      .then((resp) => resp.json())
      .then(({ items }) => {
        const options = items.map((i) => ({
          avatar_url: i.avatar_url,
          id: i.id,
          login: i.login,
          url: i.html_url,
        }));

        setIsLoading(false);
        setSearchOptions(options);
        setclickedOutside(false);
      });
  };

  useDebounce(query, 500, searchHandler);

  const swichModesHandler = (event) => {
    event.preventDefault();
    setIsInNightMode(!isInNightMode);
  };

  const clickOutsideHandler = (event) => {
    if (event.target.className.includes(`${styles.body}`)) {
      setclickedOutside(true);
    }
  };

  return (
    <div
      className={`${styles.body} ${
        isInNightMode ? styles.inNightMode : styles.inLightMode
      }`}
      onClick={clickOutsideHandler}
    >
      <h1
        className={`${styles.header} ${
          isInNightMode ? styles.inNightMode : styles.inLightMode
        }`}
      >
        GitHub Async TapeAhead
      </h1>
      <Button swichModes={swichModesHandler} nightMode={isInNightMode} />
      <SearchBar
        onInput={changeInputHandler}
        nightMode={isInNightMode}
        isClickedOutside={clickedOutside}
      />
      {isLoading ? (
        <p style={isInNightMode ? { color: "white" } : { color: "black" }}>
          loading . . .
        </p>
      ) : (
        <UserOptions
          options={searchOptions}
          isClickedOutside={clickedOutside}
          nightMode={isInNightMode}
        />
      )}
    </div>
  );
}
