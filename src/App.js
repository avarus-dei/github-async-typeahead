import { useState } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import UserOptions from "./Components/UserOptions";
import Button from "./Components/Button";
import useDebounce from "./Components/CostumHooks/DebounceHook";

const SEARCH_URI = "https://api.github.com/search/users";

export default function App() {
  const [searchOptions, setSearchOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInNightMode, setIsInNightMode] = useState(false);
  const [query, setQuery] = useState("");

  const changeInputHandler = (value) => {
    setQuery(value);
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
      });
  };

  useDebounce(query, 500, searchHandler);

  const swichModesHandler = () => {
    setIsInNightMode(!isInNightMode);
  };

  const clickOutsideHandler = (event) => {
    if (event.target.className.includes("body")) {
      setSearchOptions([]);
    }
  };

  return (
    <div
      className={`body ${isInNightMode ? "inNightMode" : "inLightMode"}`}
      onClick={clickOutsideHandler}
    >
      <h1 className={`header ${isInNightMode ? "inNightMode" : "inLightMode"}`}>
        GitHub Async TapeAhead
      </h1>
      <Button swichModes={swichModesHandler} nightMode={isInNightMode} />
      <SearchBar onInput={changeInputHandler} nightMode={isInNightMode} />
      {isLoading ? (
        <p style={isInNightMode ? { color: "white" } : { color: "black" }}>
          loading . . .
        </p>
      ) : (
        <UserOptions options={searchOptions} nightMode={isInNightMode} />
      )}
    </div>
  );
}
