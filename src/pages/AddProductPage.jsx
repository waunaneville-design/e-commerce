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
