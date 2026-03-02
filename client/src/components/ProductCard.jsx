import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { _id, name, price, category, images, stock } = product;
  const mainImage = images && images.length > 0 ? images[0].url : 'https://via.placeholder.com/400';

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
    >
      <Link to={`/product/${_id}`} className="relative block h-72 overflow-hidden bg-gray-100">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badge */}
        {stock < 5 && stock > 0 && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            Limited Stock
          </span>
        )}
        {stock === 0 && (
          <span className="absolute top-4 left-4 bg-gray-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            Sold Out
          </span>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
          <button className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-xl">
            <Heart size={20} />
          </button>
          <Link to={`/product/${_id}`} className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-xl">
            <Eye size={20} />
          </Link>
        </div>
      </Link>

      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">{category}</span>
          <Link to={`/product/${_id}`}>
            <h3 className="text-lg font-heading font-bold text-primary group-hover:text-accent transition-colors truncate">
              {name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <span className="text-xl font-heading font-bold text-primary">₹{price.toLocaleString()}</span>
          <Link
            to={`/product/${_id}`}
            className="flex items-center text-sm font-bold text-gray-400 group-hover:text-primary transition-colors"
          >
            Details <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
