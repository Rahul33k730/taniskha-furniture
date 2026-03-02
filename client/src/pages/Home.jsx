import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import ProductCard from '../components/ProductCard';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setFeaturedProducts(data.products.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <Layout>
      <Hero />
      
      <CategorySection />

      {/* Featured Products Section */}
      <section className="py-24 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0">
            <div className="space-y-4">
              <span className="text-accent font-heading font-bold uppercase tracking-widest text-sm">Best Sellers</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">Featured Products</h2>
              <div className="w-24 h-1 bg-accent rounded-full"></div>
            </div>
            <p className="text-gray-500 max-w-md leading-relaxed">
              Explore our hand-picked collection of premium furniture that our customers love most.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <WhyChooseUs />
      
      <Testimonials />
    </Layout>
  );
};

export default Home;
