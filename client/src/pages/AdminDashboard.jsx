import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Plus, 
  Settings, 
  LogOut, 
  LayoutDashboard, 
  Package, 
  Layers, 
  Image as ImageIcon, 
  Clock, 
  MoreVertical, 
  Search, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Edit, 
  Trash2, 
  ChevronRight, 
  ArrowLeft 
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/products');
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Products', value: products.length, icon: <Package size={24} />, color: 'bg-primary' },
    { label: 'Categories', value: [...new Set(products.map(p => p.category))].length, icon: <Layers size={24} />, color: 'bg-accent' },
    { label: 'Total Inventory', value: products.reduce((acc, curr) => acc + curr.stock, 0), icon: <ShoppingBag size={24} />, color: 'bg-green-500' },
    { label: 'Est. Stock Value', value: `₹${products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0).toLocaleString()}`, icon: <DollarSign size={24} />, color: 'bg-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-primary text-white p-8 space-y-12 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
            <span className="text-primary font-heading font-bold text-xl">TF</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-heading font-bold tracking-wide">Admin Dashboard</span>
            <span className="text-xs text-accent uppercase tracking-widest font-medium">Taniskha Furniture</span>
          </div>
        </div>

        <nav className="flex-grow space-y-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-4 p-4 rounded-2xl font-bold transition-all ${
              activeTab === 'overview' ? 'bg-accent text-primary shadow-xl scale-105' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center space-x-4 p-4 rounded-2xl font-bold transition-all ${
              activeTab === 'products' ? 'bg-accent text-primary shadow-xl scale-105' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Package size={20} />
            <span>Manage Products</span>
          </button>
          <button
            className={`w-full flex items-center space-x-4 p-4 rounded-2xl font-bold transition-all text-gray-400 hover:text-white hover:bg-white/5`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="pt-8 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-4 p-4 rounded-2xl font-bold text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-y-auto">
        <header className="bg-white border-b border-gray-100 p-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 sticky top-0 z-20 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-3xl font-heading font-bold text-primary">
              Welcome Back, Admin
            </h1>
            <p className="text-gray-400 font-medium">Manage your production catalog here.</p>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-80">
              <input
                type="text"
                placeholder="Search catalog..."
                className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all focus:bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <Link
              to="/admin/products/add"
              className="bg-primary text-white p-4 rounded-2xl font-bold flex items-center justify-center hover:bg-opacity-90 transition-all shadow-xl hover:-translate-y-1"
            >
              <Plus size={24} />
            </Link>
          </div>
        </header>

        <div className="p-8 space-y-12">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50 flex items-center space-x-6 group"
              >
                <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
                  <span className="text-2xl font-heading font-bold text-primary">{stat.value}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50 space-y-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-heading font-bold text-primary flex items-center space-x-3">
                      <TrendingUp className="text-accent" />
                      <span>Recent Activity</span>
                    </h2>
                    <button className="text-sm font-bold text-accent hover:underline">View History</button>
                  </div>
                  <div className="space-y-6">
                    {filteredProducts.slice(0, 5).map((p, i) => (
                      <div key={p._id} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
                        <div className="flex items-center space-x-6">
                          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md">
                            <img src={p.images[0]?.url} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-primary group-hover:text-accent transition-colors">{p.name}</span>
                            <span className="text-sm text-gray-400 flex items-center space-x-2">
                              <Clock size={12} />
                              <span>Modified 2h ago</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <span className="text-sm font-bold bg-white px-4 py-2 rounded-full text-primary border border-gray-100">₹{p.price.toLocaleString()}</span>
                          <ChevronRight className="text-gray-300" size={20} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary text-white p-10 rounded-[2.5rem] shadow-2xl space-y-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
                  <div className="space-y-6 relative z-10">
                    <h2 className="text-2xl font-heading font-bold">Quick Actions</h2>
                    <div className="space-y-4">
                      <Link to="/admin/products/add" className="flex items-center space-x-4 p-6 bg-white/10 rounded-2xl hover:bg-accent hover:text-primary transition-all font-bold group">
                        <Plus size={20} />
                        <span>Add New Product</span>
                      </Link>
                      <button onClick={() => navigate('/shop')} className="w-full flex items-center space-x-4 p-6 bg-white/10 rounded-2xl hover:bg-white/20 transition-all font-bold group">
                        <ArrowLeft size={20} />
                        <span>View Public Store</span>
                      </button>
                    </div>
                  </div>
                  <div className="pt-10 border-t border-white/10 space-y-6 relative z-10">
                    <h3 className="font-heading font-bold text-accent">Store Performance</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-sm text-gray-400">Inventory Health</span>
                        <span className="text-lg font-bold">94%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-[94%] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="products"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden"
              >
                <div className="p-10 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-2xl font-heading font-bold text-primary">Production Catalog</h2>
                  <div className="flex space-x-3">
                    <button className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><Layers size={18} /></button>
                    <button className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><MoreVertical size={18} /></button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50/50">
                        <th className="px-10 py-6 text-left text-sm font-bold text-gray-400 uppercase tracking-widest">Product</th>
                        <th className="px-10 py-6 text-left text-sm font-bold text-gray-400 uppercase tracking-widest">Category</th>
                        <th className="px-10 py-6 text-left text-sm font-bold text-gray-400 uppercase tracking-widest">Price</th>
                        <th className="px-10 py-6 text-left text-sm font-bold text-gray-400 uppercase tracking-widest">Stock</th>
                        <th className="px-10 py-6 text-right text-sm font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="text-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mx-auto"></div>
                          </td>
                        </tr>
                      ) : filteredProducts.map((p) => (
                        <tr key={p._id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-10 py-6">
                            <div className="flex items-center space-x-6">
                              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                                <img src={p.images[0]?.url} className="w-full h-full object-cover" alt="" />
                              </div>
                              <span className="font-bold text-primary group-hover:text-accent transition-colors">{p.name}</span>
                            </div>
                          </td>
                          <td className="px-10 py-6">
                            <span className="px-4 py-2 bg-secondary/30 text-primary text-xs font-bold rounded-full uppercase tracking-widest">
                              {p.category}
                            </span>
                          </td>
                          <td className="px-10 py-6">
                            <span className="font-bold text-primary">₹{p.price.toLocaleString()}</span>
                          </td>
                          <td className="px-10 py-6">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${p.stock > 10 ? 'bg-green-500' : p.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                              <span className="font-bold text-primary">{p.stock} units</span>
                            </div>
                          </td>
                          <td className="px-10 py-6 text-right">
                            <div className="flex justify-end space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                                className="p-3 bg-white shadow-lg rounded-xl text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p._id)}
                                className="p-3 bg-white shadow-lg rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
