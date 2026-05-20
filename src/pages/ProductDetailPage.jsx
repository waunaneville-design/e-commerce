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
