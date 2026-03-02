import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center overflow-hidden bg-secondary/30">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Furniture Hero"
          className="w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl space-y-6"
        >
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-sm bg-primary/40 px-3 py-1 rounded">New Collection 2026</span>
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
            Crafting Comfort, <br />
            <span className="text-accent italic font-normal">Designing Dreams</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg">
            Experience the fusion of luxury, modern design, and minimalist aesthetics for your home sanctuary.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Link
              to="/shop"
              className="bg-primary text-white px-8 py-4 rounded-md font-bold flex items-center justify-center space-x-2 hover:bg-opacity-90 transition-all duration-300 shadow-xl"
            >
              <span>Explore Collection</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/#categories"
              className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-md font-bold flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"
            >
              View Categories
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
