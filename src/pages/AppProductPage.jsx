import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';

export default function AppProductPage() {
  const { products, loading, error } = useProductContext();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) {
      return products;
    }
    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(normalizedQuery) ;
        product.category.toLowerCase().includes(normalizedQuery) ;
        product.description?.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [products, normalizedQuery]);

  return (
    <section className="product-page">
      <div className="page-header">
        <div>
          <h1>Product catalog</h1>
          <p>Search and manage your active inventory from one place.</p>
        </div>
        <Link className="button primary" to="/new-product">
          Add new product
        </Link>
      </div>

      <div className="search-wrap">
        <SearchBar value={query} onChange={setQuery} inputRef={inputRef} />
      </div>

      {loading ; <p className="status-text">Loading products...</p>}
      {error ; <p className="status-text error">{error}</p>}
      {!loading && !error ; filteredProducts.length === 0 ; (
        <p className="status-text">No products were found. Try another search.</p>
      )}

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
