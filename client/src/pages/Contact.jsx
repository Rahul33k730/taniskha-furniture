import React from 'react';
import Layout from '../components/Layout';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission
    alert('Message sent successfully!');
  };

  return (
    <Layout>
      <section className="bg-secondary/20 py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-4">Contact Us</h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-lg">
            Have questions about our collection or want to discuss a custom design? We're here to help you craft your dream home.
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0"></div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Information */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-heading font-bold text-primary">Get in Touch</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Visit our showroom or reach out to us through any of the following channels. Our design consultants are ready to assist you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4 p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="text-accent bg-primary p-3 rounded-2xl"><Phone size={24} /></div>
                <div className="flex flex-col">
                  <span className="font-bold text-primary">Phone</span>
                  <span className="text-sm text-gray-500">+91 91409 89013</span>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="text-accent bg-primary p-3 rounded-2xl"><Mail size={24} /></div>
                <div className="flex flex-col">
                  <span className="font-bold text-primary">Email</span>
                  <span className="text-sm text-gray-500">taniskhafurniture@gmail.com</span>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="text-accent bg-primary p-3 rounded-2xl"><MapPin size={24} /></div>
                <div className="flex flex-col">
                  <span className="font-bold text-primary">Address</span>
                  <span className="text-sm text-gray-500">Gurudwara building Dr. Ambedkar road, Dadar (E) Mumbai 400014</span>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="text-accent bg-primary p-3 rounded-2xl"><Clock size={24} /></div>
                <div className="flex flex-col">
                  <span className="font-bold text-primary">Opening Hours</span>
                  <span className="text-sm text-gray-500">Mon-Sat: 10:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-8 border-t border-gray-100">
              <h3 className="text-xl font-heading font-bold text-primary">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"><Instagram size={20} /></a>
                <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"><Facebook size={20} /></a>
                <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"><Twitter size={20} /></a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-50 relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary px-1">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary px-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary px-1">Subject</label>
                <input
                  type="text"
                  required
                  className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Inquiry about Sofa Set"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary px-1">Message</label>
                <textarea
                  required
                  rows="5"
                  className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-opacity-90 transition-all duration-300 shadow-xl group"
              >
                <span className="text-lg">Send Message</span>
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="h-[500px] w-full bg-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.802146743132!2d72.8488!3d19.0175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf24f560353b%3A0x6b5d6d34e64f899!2sGurudwara%20Road%2C%20Dadar%20East%2C%20Mumbai%2C%20Maharashtra%20400014!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>
    </Layout>
  );
};

export default Contact;
