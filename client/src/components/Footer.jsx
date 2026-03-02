import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-lg">
                <span className="text-primary font-heading font-bold text-xl">TF</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-heading font-bold text-lg leading-tight tracking-wide">Taniskha</span>
                <span className="text-accent text-xs tracking-widest uppercase">Furniture</span>
              </div>
            </Link>
            <p className="text-gray-300 leading-relaxed text-sm">
              "Crafting Comfort, Designing Dreams" - We provide premium quality, modern and minimalist furniture for your dream home.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-gray-300 hover:text-accent transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-bold text-accent">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/#categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition-colors text-accent/60">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-bold text-accent">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/shop?category=Sofa" className="hover:text-white transition-colors">Sofa</Link></li>
              <li><Link to="/shop?category=Bed" className="hover:text-white transition-colors">Bed</Link></li>
              <li><Link to="/shop?category=Table" className="hover:text-white transition-colors">Table</Link></li>
              <li><Link to="/shop?category=Chair" className="hover:text-white transition-colors">Chair</Link></li>
              <li><Link to="/shop?category=Dining Set" className="hover:text-white transition-colors">Dining Set</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-bold text-accent">Contact Info</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-accent flex-shrink-0" />
                <span>Gurudwara building Dr. Ambedkar road furniture Market Dadar (E) mumbai 400014</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-accent" />
                <span>+91 91409 89013</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-accent" />
                <span>taniskhafurniture@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Taniskha Furniture. All rights reserved. Designed with ❤️ by Taniskha Team.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
