import React from 'react';
import '../App.css';

const Search = ({userInput, updateUserInput}) => {
  return (
    <div className="inputContainer">
      <input
        type="text"
        placeholder="Search repositories"
        value={userInput}
        onChange={(e) => updateUserInput(e.target.value)}
        className="input"
      />
    </div>
  );
};

export default Search;
