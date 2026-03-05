import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  Plus, 
  X, 
  Upload, 
  Save, 
  ArrowLeft, 
  Package, 
  Layers, 
  IndianRupee, 
  FileText, 
  Box, 
  ImageIcon, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['Sofa', 'Bed', 'Table', 'Chair', 'Cupboard', 'Dining Set'];

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      const { name, price, description, category, stock, images } = data.product;
      setFormData({ name, price, description, category, stock });
      setPreviews(images.map(img => ({ url: img.url, type: 'image' })));
    } catch (error) {
      toast.error('Failed to fetch product details');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const filePreviews = files.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video/') ? 'video' : 'image'
    }));
    setPreviews(filePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(20);

    const productData = new FormData();
    Object.keys(formData).forEach(key => productData.append(key, formData[key]));
    images.forEach(image => productData.append('images', image));

    try {
      setUploadProgress(60);
      
      if (isEdit) {
        await api.put(`/products/${id}`, productData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product updated successfully!');
      } else {
        await api.post('/products', productData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product added successfully!');
      }
      setUploadProgress(100);
      setTimeout(() => navigate('/admin/dashboard'), 500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 p-8 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <div className="flex items-center space-x-6">
          <Link
            to="/admin/dashboard"
            className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all text-primary"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>Inventory</span>
              <ChevronRight size={12} />
              <span className="text-accent">{isEdit ? 'Update Piece' : 'New Creation'}</span>
            </div>
            <h1 className="text-3xl font-heading font-bold text-primary">
              {isEdit ? 'Refine Product' : 'Add New Product'}
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-8 py-4 bg-gray-50 text-gray-400 rounded-2xl font-bold hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button
            form="product-form"
            type="submit"
            disabled={loading}
            className="px-10 py-4 bg-primary text-white rounded-2xl font-bold flex items-center space-x-3 hover:bg-opacity-90 transition-all shadow-xl disabled:opacity-50 group"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
            ) : (
              <>
                <Save size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-lg">{isEdit ? 'Commit Changes' : 'Launch Product'}</span>
              </>
            )}
          </button>
        </div>
      </header>

      <main className="flex-grow p-8 max-w-7xl mx-auto w-full">
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-6 bg-primary text-white rounded-[2rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
                  <span className="font-bold text-lg">Synchronizing with Cloud Servers...</span>
                </div>
                <span className="font-heading font-bold text-2xl text-accent">{uploadProgress}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden relative z-10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  className="h-full bg-accent shadow-[0_0_20px_rgba(212,175,55,0.8)]"
                ></motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form id="product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50 space-y-8">
              <div className="flex items-center space-x-4 border-b border-gray-50 pb-6">
                <div className="p-3 bg-secondary/30 rounded-2xl text-primary"><FileText size={24} /></div>
                <h2 className="text-2xl font-heading font-bold text-primary">Core Details</h2>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary px-1">Product Name</label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all focus:bg-white border border-transparent focus:border-gray-100"
                      placeholder="e.g., Majestic Velvet Sofa"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary px-1">Detailed Description</label>
                  <div className="relative group">
                    <textarea
                      name="description"
                      required
                      rows="8"
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all focus:bg-white border border-transparent focus:border-gray-100 resize-none"
                      placeholder="Describe the craftsmanship, materials, and unique features..."
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50 space-y-8">
              <div className="flex items-center space-x-4 border-b border-gray-50 pb-6">
                <div className="p-3 bg-secondary/30 rounded-2xl text-primary"><ImageIcon size={24} /></div>
                <h2 className="text-2xl font-heading font-bold text-primary">Media Gallery</h2>
              </div>
              
              <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <AnimatePresence>
                    {previews.map((preview, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="aspect-square rounded-2xl overflow-hidden relative group shadow-md border border-gray-100"
                      >
                        {preview.type === 'video' ? (
                          <video src={preview.url} className="w-full h-full object-cover" muted playsInline />
                        ) : (
                          <img src={preview.url || preview} className="w-full h-full object-cover" alt="" />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <CheckCircle2 className="text-white" size={32} />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  <label className="aspect-square rounded-2xl border-4 border-dashed border-gray-100 hover:border-accent hover:bg-accent/5 transition-all flex flex-col items-center justify-center cursor-pointer group space-y-2">
                    <div className="p-4 bg-gray-50 rounded-full text-gray-400 group-hover:text-accent transition-colors"><Upload size={24} /></div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-accent">Upload Photos/Videos</span>
                    <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-blue-50 text-blue-600 rounded-2xl text-sm font-medium">
                  <AlertCircle size={20} className="shrink-0" />
                  <p>Upload high-resolution photos (min 1000x1000px) or videos (max 100MB). Maximum 10 files allowed.</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50 space-y-8 sticky top-32">
              <div className="flex items-center space-x-4 border-b border-gray-50 pb-6">
                <div className="p-3 bg-secondary/30 rounded-2xl text-primary"><Layers size={24} /></div>
                <h2 className="text-2xl font-heading font-bold text-primary">Classification</h2>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary px-1">Collection Category</label>
                  <div className="relative">
                    <select
                      name="category"
                      required
                      className="w-full appearance-none px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all focus:bg-white border border-transparent focus:border-gray-100 font-bold text-primary cursor-pointer"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <Box className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary px-1">Price Point (₹)</label>
                  <div className="relative group">
                    <input
                      type="number"
                      name="price"
                      required
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all focus:bg-white border border-transparent focus:border-gray-100 font-bold text-primary"
                      placeholder="9,999"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary px-1">Inventory Stock</label>
                  <div className="relative group">
                    <input
                      type="number"
                      name="stock"
                      required
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all focus:bg-white border border-transparent focus:border-gray-100 font-bold text-primary"
                      placeholder="10"
                      value={formData.stock}
                      onChange={handleInputChange}
                    />
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-50 flex flex-col space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-bold uppercase tracking-widest">Visibility</span>
                  <span className="text-green-500 font-bold">Public</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-bold uppercase tracking-widest">Status</span>
                  <span className="text-primary font-bold">{isEdit ? 'Live' : 'Draft'}</span>
                </div>
              </div>
            </section>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;