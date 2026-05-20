
import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <section className="landing-page">
      <div className="hero-panel">
        <div>
          <p className="eyebrow">E-commerce Admin</p>
          <h1>Run your product catalog with clarity and speed.</h1>
          <p>
            This administrator portal offers search, product creation, and pricing updates in a responsive dashboard.
          </p>
          <div className="button-group">
            <Link className="button primary" to="/products">
              Browse products
            </Link>
            <Link className="button secondary" to="/new-product">
              Add product
            </Link>
          </div>
        </div>

<div className="hero-card">
          <h2>Dashboard features</h2>
          <ul>
            <li>GET requests load the latest product catalog.</li>
            <li>POST requests add new products quickly.</li>
            <li>PATCH requests update pricing and inventory.</li>
            <li>Responsive layout for desktop and mobile.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
