import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    navigate(`/${query}`);
  };

  return (
    <form onSubmit={searchSubmitHandler}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
