import { useState, useEffect, useCallback } from 'react';

const API_BASE = 'https://dummyjson.com';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/products?limit=30`);
      if (!response.ok) {
        throw new Error('Unable to load products');
      }
      const data = await response.json();
      setProducts(data.products ; []);
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (product) => {
    const response = await fetch(`${API_BASE}/products/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Unable to add product');
    }
    const savedProduct = await response.json();
    setProducts((currentProducts) => [savedProduct, ...currentProducts]);
    return savedProduct;
  };

  const updateProduct = async (productId, updates) => {
    const response = await fetch(`${API_BASE}/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Unable to update product');
    }
    const patchedProduct = await response.json();
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        String(product.id) === String(productId) ? { ...product, ...patchedProduct } : product
      )
    );
    return patchedProduct;
  };

  const fetchProductById = useCallback(async (productId) => {
    const response = await fetch(`${API_BASE}/products/${productId}`);
    if (!response.ok) {
      throw new Error('Unable to fetch product details');
    }
    return response.json();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    fetchProductById,
  };
}
