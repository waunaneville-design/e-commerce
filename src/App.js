import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AppProductPage from './pages/AppProductPage';
import AddProductPage from './pages/AddProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <div className="app-shell">
          <Header />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/products" element={<AppProductPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/new-product" element={<AddProductPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
