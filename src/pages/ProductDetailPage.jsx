import React, { useEffect, useId, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products, fetchProductById, updateProduct } = useProductContext();
  const [product, setProduct] = useState(null);
  const [formValues, setFormValues] = useState({ title: '', price: '', stock: '', description: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const priceRef = useRef(null);
  const navigate = useNavigate();
  const titleId = useId();
  const priceId = useId();
  const stockId = useId();
  const descriptionId = useId();

  useEffect(() => {
    // Placeholder effect while component implementation is completed
  }, []);

  return null;
}

 if (existingProduct) {
      setProduct(existingProduct);
      setFormValues({
        title: existingProduct.title || '',
        price: existingProduct.price || '',
        stock: existingProduct.stock || '',
        description: existingProduct.description || '',
      });
      setLoading(false);
      return;
    }

async function loadProduct() {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setFormValues({
          title: data.title || '',
          price: data.price || '',
          stock: data.stock || '',
          description: data.description || '',
        });
      } catch (error) {
        setMessage(`Unable to load product: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

      loadProduct();
  }, [fetchProductById, id, products]);

  useEffect(() => {
    if (!loading) {
      priceRef.current?.focus();
    }
  }, [loading]);

   const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

const handleSubmit = async (event) => {
    event.preventDefault();
    if (!product) return;

    setSaving(true);
    setMessage('Saving updates...');

try {
      const updated = await updateProduct(product.id, {
        title: formValues.title,
        price: Number(formValues.price),
        stock: Number(formValues.stock),
        description: formValues.description,
      });

       setProduct((current) => ({ ...current, ...updated }));
      setMessage('Product updated successfully.');
    } catch (error) {
      setMessage(`Unable to update product: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="status-text">Loading product details...</p>;
  }

  if (!product) {
    return (
      <section className="product-detail">
        <p className="status-text error">Product not found.</p>
        <button className="button secondary" onClick={() => navigate('/products')}>
          Back to products
        </button>
      </section>
    );
  }

   return (
    <section className="product-detail">
      <div className="page-header">
        <div>
          <h1>Edit product</h1>
          <p>Update pricing, stock, and descriptions for your product.</p>
        </div>
      </div>

 <div className="detail-grid">
        <div className="detail-card">
          <img
            src={product.thumbnail || product.images?.[0] || 'https://via.placeholder.com/480x280?text=Product'}
            alt={product.title}
          />
          <div className="detail-meta">
            <h2>{product.title}</h2>
            <p className="product-price">${product.price}</p>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p className="small-text">Stock: {product.stock ?? 'N/A'}</p>
          </div>
        </div>

  <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor={titleId}>Title</label>
            <input
              id={titleId}
              name="title"
              type="text"
              value={formValues.title}
              onChange={handleChange}
              required
            />
          </div>

<div className="form-row split-row">
            <label htmlFor={priceId}>Price ($)</label>
            <input
              id={priceId}
              ref={priceRef}
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formValues.price}
              onChange={handleChange}
              required
            />
          </div>

<div className="form-row split-row">
            <label htmlFor={stockId}>Stock</label>
            <input
              id={stockId}
              name="stock"
              type="number"
              min="0"
              value={formValues.stock}
              onChange={handleChange}
              required
            />
          </div>
