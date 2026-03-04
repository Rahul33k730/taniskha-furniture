import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  // Forcing a redeploy by adding a comment
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Login Successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-0 animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-0 animate-pulse delay-700"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-12 relative z-10 border border-gray-50"
      >
        <button
          onClick={() => navigate('/')}
          className="absolute -top-16 left-0 text-primary font-bold flex items-center space-x-2 hover:underline"
        >
          <ArrowLeft size={20} />
          <span>Back to Site</span>
        </button>

        <div className="text-center space-y-4 mb-10">
          <div className="w-20 h-20 bg-primary flex items-center justify-center rounded-3xl mx-auto shadow-xl transform -rotate-6">
            <ShieldCheck size={40} className="text-accent" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-primary">Admin Portal</h1>
          <p className="text-gray-400">Secure access for Trishka Furniture</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-primary px-1">Admin Email</label>
            <div className="relative group">
              <input
                type="email"
                required
                className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all group-hover:bg-gray-100"
                placeholder="pudunfoundation@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary px-1">Password</label>
            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all group-hover:bg-gray-100"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-opacity-90 transition-all duration-300 shadow-xl disabled:opacity-50 group"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
            ) : (
              <>
                <span className="text-lg">Authorize Access</span>
                <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-widest">
            Protected by production-level encryption <br />
            © {new Date().getFullYear()} Trishka Furniture
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
