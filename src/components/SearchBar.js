import React from "react";

const styles = {
  input: {
    border: "none",
    width: "100%",
    height: "50px"
  }
};

const SearchBar = ({ disabled, query, onSearch }) => (
  <input
    style={styles.input}
    value={query}
    onChange={onSearch}
    fullWidth
    disableUnderline
    disabled={disabled}
    placeholder="Search"
  />
);

export default SearchBar;
