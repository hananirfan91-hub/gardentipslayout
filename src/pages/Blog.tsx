import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, User, ArrowRight, TrendingUp, X, Sprout, Hash } from 'lucide-react';

export const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(BLOG_POSTS.map(post => post.category));
    return Array.from(cats);
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    BLOG_POSTS.forEach(post => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, []);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="pb-24">
      <Helmet>
        <title>Garden Layout Blog | Expert Tips & Inspiration | GardenLayoutTips</title>
        <meta name="description" content="Explore our garden layout blog for expert tips, seasonal advice, and creative inspiration to design your perfect vegetable patch. Maximize your harvest today!" />
        <meta property="og:title" content="Garden Layout Blog | Expert Tips & Inspiration" />
        <meta property="og:description" content="Explore our garden layout blog for expert tips, seasonal advice, and creative inspiration to design your perfect vegetable patch." />
        <link rel="canonical" href="https://gardenlayouttips.vercel.app/blog" />
      </Helmet>

      {/* Hero Header */}
      <section className="bg-stone-900 pt-32 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=40&w=1920" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-[0.3em] mb-8">
              <Sprout size={14} /> The Knowledge Base
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-[0.9]">
              Expert Insights for <br />
              <span className="text-emerald-400 italic font-serif">Productive Gardens.</span>
            </h1>
            <p className="text-xl text-stone-400 leading-relaxed font-light">
              Master the art of <strong>vegetable garden layout</strong> with our deep dives into soil science, companion planting, and space optimization.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        {/* Featured Post */}
        {!searchQuery && !selectedCategory && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-stone-100 flex flex-col lg:flex-row mb-24"
          >
            <div className="lg:w-1/2 aspect-[16/10] lg:aspect-auto overflow-hidden">
              <img src={featuredPost.image} alt={featuredPost.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-[0.3em] bg-emerald-50 px-4 py-1.5 rounded-full">Featured Article</span>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{featuredPost.date}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-8 leading-tight tracking-tight">
                <Link to={`/blog/${featuredPost.slug}`} className="hover:text-emerald-800 transition-colors">{featuredPost.title}</Link>
              </h2>
              <p className="text-xl text-stone-600 mb-10 leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <Link to={`/blog/${featuredPost.slug}`} className="inline-flex items-center gap-3 text-emerald-700 font-bold text-lg group">
                Read Full Story <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-3xl font-bold text-stone-900">
                {selectedCategory ? `Articles in ${selectedCategory}` : 'Latest Articles'}
              </h3>
              <div className="text-sm text-stone-400 font-medium">{filteredPosts.length} Articles Found</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post, i) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className="group"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-8 shadow-lg">
                        <img 
                          src={post.image} 
                          alt={post.alt} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-[0.2em] bg-emerald-50 px-3 py-1 rounded-full">{post.category}</span>
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{post.date}</span>
                      </div>
                      <h4 className="text-2xl font-bold text-stone-900 mb-4 group-hover:text-emerald-800 transition-colors leading-tight">
                        {post.title}
                      </h4>
                      <p className="text-stone-600 mb-6 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                        Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-32 bg-stone-50 rounded-[3rem] border-2 border-dashed border-stone-200">
                <div className="w-20 h-20 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={40} />
                </div>
                <h4 className="text-2xl font-bold text-stone-900 mb-2">No matches found</h4>
                <p className="text-stone-500 mb-8">Try adjusting your search or category filters.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                  className="bg-emerald-800 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-96 space-y-12">
            {/* Search */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/50">
              <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <Search size={20} className="text-emerald-600" /> Search
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Keywords..."
                  className="w-full bg-stone-50 border-stone-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Hash size={20} className="text-emerald-600" /> Categories
                </h3>
                {selectedCategory && (
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                      selectedCategory === cat 
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-lg shadow-emerald-900/20' 
                        : 'bg-stone-50 text-stone-600 border-stone-100 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800'
                    }`}
                  >
                    {cat} <span className={`ml-2 opacity-50 font-normal`}>{categoryCounts[cat]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Widget */}
            <div className="bg-emerald-900 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-emerald-800 text-emerald-400 rounded-2xl flex items-center justify-center mb-8">
                  <Sprout size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 leading-tight">Join Our Growing Community</h3>
                <p className="text-emerald-100/70 mb-8 leading-relaxed">
                  Get the latest <strong>garden layout ideas</strong> and seasonal tips delivered to your inbox.
                </p>
                <Link to="/contact" className="block w-full text-center bg-emerald-500 text-white py-4 rounded-2xl font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-950/50">
                  Subscribe Now
                </Link>
              </div>
              <TrendingUp size={150} className="absolute -bottom-10 -right-10 text-emerald-800/30 transform rotate-12" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
