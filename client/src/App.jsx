import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import AdminAuth from './pages/AdminAuth';
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/products/edit/:id" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
