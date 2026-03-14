import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Calendar, User, ArrowRight, TrendingUp, X } from 'lucide-react';

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Helmet>
        <title>Garden Layout Blog | Expert Tips & Inspiration | GardenLayout</title>
        <meta name="description" content="Explore our garden layout blog for expert tips, seasonal advice, and creative inspiration to design your perfect vegetable patch." />
        <meta property="og:title" content="Garden Layout Blog | Expert Tips & Inspiration" />
        <meta property="og:description" content="Explore our garden layout blog for expert tips, seasonal advice, and creative inspiration to design your perfect vegetable patch." />
      </Helmet>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Garden Layout Blog</h1>
        <p className="text-lg text-stone-600">
          Expert tips, seasonal advice, and creative inspiration for your vegetable garden layout.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1 space-y-12">
          {filteredPosts.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 flex flex-col md:flex-row group"
                >
                  <div className="md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.alt} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8 md:w-3/5 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-4">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedCategory(post.category);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="hover:underline"
                      >
                        {post.category}
                      </button>
                      <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                      <span className="text-stone-400">{post.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-4 group-hover:text-emerald-800 transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-stone-600 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:gap-3 transition-all"
                    >
                      Read Article <ArrowRight size={18} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          ) : (
            <div className="text-center py-20 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
              <p className="text-stone-500 font-medium">No articles found matching your criteria.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                className="mt-4 text-emerald-700 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Search Articles</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Keywords..."
                className="w-full bg-stone-50 border-stone-100 rounded-xl pl-10 pr-10 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Categories</h3>
              {selectedCategory && (
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                    className={`text-sm flex items-center justify-between w-full p-2 rounded-lg transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-emerald-50 text-emerald-800 font-bold' 
                        : 'text-stone-600 hover:text-emerald-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      selectedCategory === cat ? 'bg-emerald-200 text-emerald-900' : 'bg-stone-100 text-stone-400'
                    }`}>
                      {categoryCounts[cat]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-900 p-8 rounded-3xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Free Planner</h3>
              <p className="text-emerald-100 text-sm mb-6">
                Design your garden layout in minutes with our drag-and-drop tool.
              </p>
              <Link to="/planner" className="block text-center bg-white text-emerald-900 py-3 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors">
                Open Planner
              </Link>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-20 transform rotate-12">
              <TrendingUp size={120} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
