import React, { useState } from 'react';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      fetchResults(value);
    } else {
      setResults([]);
      setSuggestions([]);
    }
  };

  const fetchResults = async (query) => {
    try {
      const response = await fetch(`https://shopping-websiteapp-backend.cloud-stacks.com/api/search?query=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setResults(data.results);
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    fetchResults(suggestion);
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        value={query} 
        onChange={handleSearch} 
        className="search-input" 
        placeholder="Search for products..." 
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {results.length > 0 && (
        <ul className="results-list">
          {results.map((product, index) => (
            <li key={index} className="result-item">
              <span>{product.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;