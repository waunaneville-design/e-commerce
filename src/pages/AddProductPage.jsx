import React, { useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

const initialForm = {
  title: '',
  description: '',
  price: '',
  stock: '',
  category: '',
};

export default function AddProductPage() {
  const { addProduct } = useProductContext();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const nameInputRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const priceId = useId();
  const stockId = useId();
  const categoryId = useId();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus('Saving new product...');

      try {
      const saved = await addProduct({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
});
      setStatus(`Saved product: ${saved.title}`);
      setForm(initialForm);
      navigate('/products');
    } catch (error) {
      setStatus(`Unable to save product: ${error.message}`);
    } finally {
      setSubmitting(false);
      nameInputRef.current?.focus();
    }
  };

  return (
    <section className="product-detail">
      <div className="page-header">
        <div>
          <h1>Add a new product</h1>
          <p>Create an inventory item with price, stock, and category fields.</p>
        </div>
      </div>

<form className="product-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor={titleId}>Title</label>
          <input
            id={titleId}
            ref={nameInputRef}
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Wireless headphones"
          />
        </div>

 <div className="form-row">
          <label htmlFor={descriptionId}>Description</label>
          <textarea
            id={descriptionId}
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            required
            placeholder="Write a clear product description"
          />
        </div>

<div className="form-row split-row">
          <label htmlFor={priceId}>Price ($)</label>
          <input
            id={priceId}
            name="price"
            type="number"
            min="0"
            step="5"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

 <div className="form-row split-row">
          <label htmlFor={stockId}>Stock quantity</label>
          <input
            id={stockId}
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>

<div className="form-row split-row">
          <label htmlFor={categoryId}>Category</label>
          <input
            id={categoryId}
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            required
            placeholder="Electronics"
          />
        </div>

<div className="button-group">
          <button className="button primary" type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : 'Create product'}
          </button>
        </div>
      </form>

      {status && <p className="status-text">{status}</p>}
    </section>
  );
}

