import { React, useState } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import UserOptions from "./Components/UserOptions";

const SEARCH_URI = "https://api.github.com/search/users";

export default function App() {
  const [searchOptions, setSearchOptions] = useState([]);
  const [isInNightMode, setIsInNightMode] = useState(false);

  const searchInputHandler = (query) => {
    if (query.length === 0) {
      setSearchOptions([]);
      return;
    }
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
        setSearchOptions(options);
      });
  };

  const swichModes = () => {

    setIsInNightMode(!isInNightMode);
  }

  return (
    <div className="body">
      <hi>GitHub async TapeAhead</hi>
      <a onClick={swichModes}>swich</a>
      <img className="github-img" src="https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU" />
      <SearchBar onInput={searchInputHandler} nightMode={isInNightMode} />
      <UserOptions options={searchOptions} nightMode={isInNightMode} />
    </div>
  );
}
