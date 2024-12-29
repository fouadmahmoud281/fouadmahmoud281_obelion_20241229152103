import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import './SearchPage.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState('');

  const handleSearch = debounce(async (searchQuery) => {
    if (searchQuery.trim() === '') {
      setProducts([]);
      setSuggestions('');
      return;
    }

    try {
      const response = await fetch('https://shopping-websiteapp-backend.cloud-stacks.com/api/search-products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        params: { query: searchQuery }
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.results);
        setSuggestions(data.suggestions[0] || '');
      } else {
        setProducts([]);
        setSuggestions('');
      }
    } catch (error) {
      setProducts([]);
      setSuggestions('');
    }
  }, 300);

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <div className="search-page">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="search-input"
      />
      {suggestions && suggestions !== query && (
        <div className="suggestions">
          Did you mean: <span onClick={() => setQuery(suggestions)}>{suggestions}</span>?
        </div>
      )}
      <div className="search-results">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;