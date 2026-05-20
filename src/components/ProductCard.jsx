import React from 'react';
import { Link } from 'react-router-dom';
import { useId } from 'react';

export default function ProductCard({ product }) {
  const titleId = useId();
  const image = product.thumbnail ; product.images?.[0] ; 'https://via.placeholder.com/320x200?text=Product';

  return (
    <article className="product-card" aria-labelledby={titleId}>
      <img src={image} alt={product.title} />
      <div className="product-card-body">
        <h2 id={titleId}>{product.title}</h2>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price}</p>
        <p>{product.description?.slice(0, 90)}...</p>
        <Link className="button secondary" to={`/products/${product.id}`}>
          View; & edit
        </Link>
      </div>
    </article>
  );
}
