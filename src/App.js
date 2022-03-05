import { React, useState } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import UserOptions from "./Components/UserOptions";
import Button from "./Components/Button";

const SEARCH_URI = "https://api.github.com/search/users";

export default function App() {
  const [searchOptions, setSearchOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInNightMode, setIsInNightMode] = useState(false);

  const searchInputHandler = (query) => {
    if (query.length === 0) {
      setSearchOptions([]);
      return;
    }
    setIsLoading(true);
    fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
      .then((resp) => resp.json())
      .then(({ items }) => {
        let options;
        if (items === undefined) {
          options = [];
        } else {
          options = items.map((i) => ({
            avatar_url: i.avatar_url,
            id: i.id,
            login: i.login,
            url: i.html_url,
          }));
        }
        setIsLoading(false);
        setSearchOptions(options);
      });
  };

  const swichModesHandler = () => {
    setIsInNightMode(!isInNightMode);
  };

  return (
    <div className={`body ${isInNightMode ? "inNightMode" : "inLightMode"}`}>
      <h1 className={`header ${isInNightMode ? "inNightMode" : "inLightMode"}`}>
        GitHub Async TapeAhead
      </h1>
      <Button
        swichModes={swichModesHandler}
        nightMode={isInNightMode}
        currentMode={
          isInNightMode ? "Switch to lightMode" : "Switch to nightMode"
        }
      />
      <SearchBar onInput={searchInputHandler} nightMode={isInNightMode} />
      {isLoading ? (
        <p>loading . . .</p>
      ) : (
        <UserOptions options={searchOptions} nightMode={isInNightMode} />
      )}
    </div>
  );
}
