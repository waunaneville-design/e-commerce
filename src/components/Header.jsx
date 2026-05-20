import React from 'react';
import { NavLink } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

export default function Header() {
  const { products } = useProductContext();

  return (
    <header className="app-header">
      <div className="brand-block">
        <div>
          <h1>Admin e-Portal</h1>
          <p>Manage your product catalog and pricing in one place.</p>
        </div>
        <span className="product-count">{products.length} products</span>
      </div>

      <nav className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/new-product">Add product</NavLink>
      </nav>
    </header>
  );
}