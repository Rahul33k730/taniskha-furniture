import React, { useState, useEffect } from 'react';
import { Star, Quote, Send, User, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const staticTestimonials = [
  {
    _id: 'static1',
    name: 'Anjali Sharma',
    role: 'Homeowner',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    text: 'Taniskha Furniture has transformed my living room. The quality of the sofa is exceptional and the design is so modern and minimalist. Highly recommended!',
    rating: 5
  },
  {
    _id: 'static2',
    name: 'Rajiv Malhotra',
    role: 'Interior Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    text: "As a designer, I'm very picky about the pieces I choose for my clients. Taniskha consistently delivers high-quality, beautiful furniture that my clients love.",
    rating: 5
  }
];

const Testimonials = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    rating: 5
  });

  const fetchFeedbacks = async () => {
    try {
      const { data } = await api.get('/feedback');
      setFeedbacks(data.feedbacks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/feedback', formData);
      toast.success('Thank you for your feedback!');
      setFormData({ name: '', role: '', text: '', rating: 5 });
      setShowForm(false);
      fetchFeedbacks();
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const allFeedbacks = [...staticTestimonials, ...feedbacks];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 space-y-8 md:space-y-0">
          <div className="text-center md:text-left space-y-4">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">What Our Customers Say</h2>
            <div className="w-24 h-1 bg-accent mx-auto md:mx-0 rounded-full"></div>
            <p className="text-gray-500 max-w-lg leading-relaxed">
              Real stories from real customers who have transformed their homes with Taniskha Furniture.
            </p>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-3 hover:bg-opacity-90 transition-all shadow-xl"
          >
            <MessageSquare size={20} />
            <span>{showForm ? 'Close Feedback' : 'Write Feedback'}</span>
          </button>
        </div>

        {/* Feedback Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-16"
            >
              <div className="bg-secondary/10 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary px-1">Full Name</label>
                      <div className="relative group">
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all border border-gray-100"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary px-1">Your Role (Optional)</label>
                      <input
                        type="text"
                        name="role"
                        className="w-full px-6 py-4 bg-white rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all border border-gray-100"
                        placeholder="Homeowner, Designer, etc."
                        value={formData.role}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary px-1">Rating</label>
                      <div className="flex space-x-4 p-2 bg-white rounded-2xl border border-gray-100 justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormData({ ...formData, rating: star })}
                            className="transition-transform hover:scale-125"
                          >
                            <Star
                              size={28}
                              className={`${
                                formData.rating >= star ? 'text-accent fill-accent' : 'text-gray-200'
                              } transition-colors`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary px-1">Your Experience</label>
                      <textarea
                        name="text"
                        required
                        rows="8"
                        className="w-full px-6 py-4 bg-white rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all border border-gray-100 resize-none"
                        placeholder="Share your experience with Taniskha Furniture..."
                        value={formData.text}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-opacity-90 transition-all shadow-xl disabled:opacity-50 group"
                    >
                      {submitting ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          <span className="text-lg">Post Feedback</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {allFeedbacks.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary/10 p-10 rounded-3xl relative hover:bg-white hover:shadow-2xl transition-all duration-500 group border border-transparent hover:border-gray-100"
            >
              <Quote className="absolute top-6 right-6 text-accent/20 group-hover:text-accent transition-colors duration-500" size={60} />
              
              <div className="space-y-6">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-accent fill-accent" />
                  ))}
                </div>
                
                <p className="text-gray-600 italic leading-relaxed text-lg line-clamp-4">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center space-x-4 pt-4">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-accent"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-accent font-bold text-xl border-2 border-accent">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-primary">{testimonial.name}</span>
                    <span className="text-sm text-gray-500">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0"></div>
      </div>
    </section>
  );
};

export default Testimonials;
