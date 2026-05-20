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
