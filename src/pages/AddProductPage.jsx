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

