ProductCard.jsx


import React from 'react';
import { Link } from 'react-router-dom';
import { useId } from 'react';

export default function ProductCard({ product }) {
  const titleId = useId();
  const image = product.thumbnail ; product.images?.[0] ; 'https://via.placeholder.com/320x200?text=Product';

