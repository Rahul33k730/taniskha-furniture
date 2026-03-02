import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/Layout';
import { ShoppingCart, MessageCircle, Phone, Truck, ShieldCheck, ArrowLeft, Plus, Minus, Star, Heart, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.product);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  if (!product) return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-heading font-bold text-primary">Product not found</h2>
        <Link to="/shop" className="text-accent hover:underline mt-4 inline-block">Back to Shop</Link>
      </div>
    </Layout>
  );

  const { name, price, description, category, images, stock } = product;

  const handleWhatsAppOrder = () => {
    const message = `Hello Trishka Furniture! I'm interested in ordering: ${name} (ID: ${id}) priced at ₹${price}. Please let me know the availability and delivery details.`;
    const whatsappUrl = `https://wa.me/919140989013?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/shop" className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold">Back to Collection</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <img
                src={images[activeImage]?.url || 'https://via.placeholder.com/600'}
                alt={name}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute top-6 right-6 flex flex-col space-y-3">
                <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:bg-white shadow-lg transition-all">
                  <Heart size={20} />
                </button>
                <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:bg-white shadow-lg transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </motion.div>

            <div className="flex space-x-4 overflow-x-auto pb-4">
              {images.map((img, index) => (
                <button
                  key={img.public_id}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === index ? 'border-primary shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-accent font-heading font-bold uppercase tracking-widest text-sm bg-primary/5 px-4 py-1.5 rounded-full inline-block">
                {category}
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary">{name}</h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-accent fill-accent" />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">(12 Customer Reviews)</span>
              </div>
              
              <p className="text-3xl font-heading font-bold text-primary">₹{price.toLocaleString()}</p>
            </div>

            <p className="text-gray-500 leading-relaxed text-lg whitespace-pre-line">
              {description}
            </p>

            <div className="space-y-6 pt-6 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <span className="font-bold text-primary">Quantity:</span>
                <div className="flex items-center border-2 border-gray-100 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors text-primary"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-bold text-primary text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                    className="p-3 hover:bg-gray-100 transition-colors text-primary"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="text-sm text-gray-400 font-medium">
                  {stock > 0 ? `${stock} units available` : 'Out of stock'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleWhatsAppOrder}
                  disabled={stock === 0}
                  className="bg-[#25D366] text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-[#128C7E] transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="text-lg">Order on WhatsApp</span>
                </button>
                <button
                  className="bg-primary text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-opacity-90 transition-all duration-300 shadow-xl"
                >
                  <Phone size={24} />
                  <span className="text-lg">Contact Seller</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-100">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                <div className="text-accent"><Truck size={24} /></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-primary">Free Delivery</span>
                  <span className="text-xs text-gray-400">On orders above ₹10,000</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                <div className="text-accent"><ShieldCheck size={24} /></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-primary">1 Year Warranty</span>
                  <span className="text-xs text-gray-400">Authentic materials</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
