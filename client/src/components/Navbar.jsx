import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Shop', path: '/shop' },
    { title: 'Categories', path: '/#categories' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg">
              <span className="text-accent font-heading font-bold text-xl">TF</span>
            </div>
            <div className="flex flex-col">
              <span className="text-primary font-heading font-bold text-lg leading-tight">Taniskha</span>
              <span className="text-gray-500 text-xs tracking-widest uppercase">Furniture</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <Link to="/admin/login" className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
              <User size={20} />
              <span className="text-sm font-medium">Admin</span>
            </Link>
            <div className="flex items-center text-primary font-bold">
              <Phone size={18} className="mr-2" />
              <span className="text-sm font-bold">+91 91409 89013</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-lg absolute w-full">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              className="block text-gray-600 hover:text-primary font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </Link>
          ))}
          <div className="flex flex-col items-center pt-4 border-t border-gray-100">
            <Link to="/admin/login" className="flex items-center space-x-2 text-primary font-bold mb-4" onClick={() => setIsOpen(false)}>
              <User size={22} />
              <span>Admin Login</span>
            </Link>
            <div className="flex items-center text-primary font-bold">
              <Phone size={18} className="mr-2" />
              <span className="text-sm">Call Us</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
