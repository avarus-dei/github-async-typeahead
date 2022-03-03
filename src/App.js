import { React, useState } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import UserOptions from "./Components/UserOptions";

const SEARCH_URI = "https://api.github.com/search/users";

function App() {
  const [searchOptions, setSearchOptions] = useState([]);

  const searchInputHandler = (query) => {
    fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
      .then((resp) => resp.json())
      .then(({ items }) => {
        const options = items.map((i) => ({
          avatar_url: i.avatar_url,
          id: i.id,
          login: i.login,
          url: i.html_url,
        }));

        setSearchOptions(options);
      });
  };

  return (
    <>
      <SearchBar onInput={searchInputHandler} />
      <UserOptions options={searchOptions} />
    </>
  );
}

export default App;
