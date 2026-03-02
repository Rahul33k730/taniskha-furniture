import React from 'react';
import { ShieldCheck, IndianRupee, Paintbrush, Truck, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <ShieldCheck size={32} />,
    title: 'Premium Quality',
    description: 'We use the finest materials to ensure durability and lasting comfort in every piece.'
  },
  {
    icon: <IndianRupee size={32} />,
    title: 'Affordable Prices',
    description: 'Luxury designs that fit your budget. We believe quality should be accessible to all.'
  },
  {
    icon: <Paintbrush size={32} />,
    title: 'Custom Designs',
    description: 'Tailor your furniture to your unique style. We offer personalized design services.'
  },
  {
    icon: <Truck size={32} />,
    title: 'Fast Delivery',
    description: 'Swift and safe delivery to your doorstep, with expert assembly services included.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-accent font-heading font-bold uppercase tracking-widest text-sm">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">
                Why Choose <span className="text-accent italic">Trishka Furniture?</span>
              </h2>
              <p className="text-gray-500 leading-relaxed text-lg">
                We don't just sell furniture; we create experiences. Our commitment to craftsmanship and design ensures that every piece tells a story of comfort and elegance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-3 p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-accent w-14 h-14 bg-primary flex items-center justify-center rounded-xl shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Furniture Crafting"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-10 -left-10 bg-primary text-white p-8 rounded-2xl shadow-2xl z-20 hidden md:block border-4 border-white">
              <div className="flex items-center space-x-4">
                <span className="text-5xl font-heading font-bold text-accent">15+</span>
                <div className="flex flex-col">
                  <span className="text-lg font-bold leading-tight">Years of</span>
                  <span className="text-accent font-medium">Excellence</span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
