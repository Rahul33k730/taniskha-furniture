import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    title: 'Sofa',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/shop?category=Sofa'
  },
  {
    title: 'Bed',
    image: 'https://images.unsplash.com/photo-1505693419173-42b9258a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/shop?category=Bed'
  },
  {
    title: 'Table',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/shop?category=Table'
  },
  {
    title: 'Chair',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/shop?category=Chair'
  },
  {
    title: 'Cupboard',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/shop?category=Cupboard'
  },
  {
    title: 'Dining Set',
    image: 'https://images.unsplash.com/photo-1617806118233-f8e10741a248?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/shop?category=Dining Set'
  }
];

const CategorySection = () => {
  return (
    <section id="categories" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">Browse by Category</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
            Find the perfect piece for every corner of your home, designed with care and crafted with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative h-80 overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            >
              <Link to={category.path}>
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white space-y-1">
                  <h3 className="text-2xl font-heading font-bold">{category.title}</h3>
                  <span className="text-accent text-sm font-bold flex items-center group-hover:underline">
                    View Collection <span className="ml-2">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
