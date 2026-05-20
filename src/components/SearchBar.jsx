import React from 'react';
import { useId } from 'react';

export default function SearchBar({ value, onChange, inputRef }) {
  const id = useId();

  return (
    <label className="search-bar" htmlFor={id}>
      <span>Search products</span>
      <input
        id={id}
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Title, category, or description"
      />
    </label>
  );
}

export default SearchBar;