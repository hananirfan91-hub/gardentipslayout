import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '../constants';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2, Bookmark, Twitter, Facebook, Linkedin, Link as LinkIcon, CheckCircle, ArrowRight, Sprout } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

  useEffect(() => {
    if (!user || !post) return;

    const favRef = doc(db, 'users', user.uid, 'favorites', post.id);
    const unsub = onSnapshot(favRef, (doc) => {
      setIsFavorite(doc.exists());
    });

    return () => unsub();
  }, [user, post]);

  if (!post) return <Navigate to="/blog" />;

  const shareUrl = window.location.href;
  const shareTitle = `${post.title} | GardenLayoutTips`;

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const toggleFavorite = async () => {
    if (!user) {
      alert('Please sign in to save favorites!');
      return;
    }

    const favRef = doc(db, 'users', user.uid, 'favorites', post.id);
    if (isFavorite) {
      await deleteDoc(favRef);
    } else {
      await setDoc(favRef, {
        postId: post.id,
        title: post.title,
        slug: post.slug,
        image: post.image,
        savedAt: new Date().toISOString()
      });
    }
  };

  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <article className="pb-24">
      <Helmet>
        <title>{post.title} | GardenLayoutTips</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://gardenlayouttips.vercel.app/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:site_name" content="GardenLayoutTips" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
      </Helmet>

      {/* Header Section */}
      <header className="bg-stone-900 pt-32 pb-48 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={post.image} alt="" className="w-full h-full object-cover blur-sm" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-emerald-400 font-bold mb-12 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> Back to Knowledge Base
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em] bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
                {post.category}
              </span>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{post.date}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-12 leading-[0.9] tracking-tighter">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-8 pt-12 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-900/40">
                  GL
                </div>
                <div>
                  <div className="text-lg font-bold text-white">GardenLayoutTips Expert</div>
                  <div className="text-sm text-stone-400">Professional Horticulture Team</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button onClick={shareOnTwitter} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-sky-500 hover:border-sky-500 transition-all"><Twitter size={20} /></button>
                <button onClick={shareOnFacebook} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all"><Facebook size={20} /></button>
                <button onClick={copyLink} className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all ${copyStatus ? 'bg-emerald-500 border-emerald-500' : 'hover:bg-white/10'}`}>
                  {copyStatus ? <CheckCircle size={20} /> : <LinkIcon size={20} />}
                </button>
                <button 
                  onClick={toggleFavorite}
                  className={`w-12 h-12 rounded-xl border transition-all flex items-center justify-center ${isFavorite ? 'bg-emerald-500 border-emerald-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                >
                  <Bookmark size={20} fill={isFavorite ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="aspect-video rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white"
        >
          <img src={post.image} alt={post.alt} className="w-full h-full object-cover" fetchPriority="high" />
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Sidebar - Quick Info */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32 space-y-12">
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-6">Article Summary</h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-6">Key Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {['Layout', 'Organic', 'Yield', 'Planning'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-500 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100">
                <Sprout className="text-emerald-600 mb-4" size={32} />
                <h5 className="font-bold text-emerald-900 mb-2">Ready to Plan?</h5>
                <p className="text-emerald-800 text-xs mb-6">Use our free tool to design your layout.</p>
                <Link to="/planner" className="block text-center bg-emerald-600 text-white py-3 rounded-xl text-xs font-bold hover:bg-emerald-500 transition-colors">
                  Open Planner
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="prose prose-stone lg:prose-xl max-w-none prose-headings:text-stone-900 prose-headings:font-bold prose-p:text-stone-600 prose-p:leading-relaxed prose-a:text-emerald-700 prose-strong:text-stone-900 prose-img:rounded-[2rem] prose-img:shadow-xl">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Author Footer */}
            <div className="mt-24 p-12 bg-stone-50 rounded-[3rem] flex flex-col md:flex-row items-center gap-10 border border-stone-100">
              <div className="w-32 h-32 bg-emerald-800 rounded-[2rem] shrink-0 flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-emerald-900/20">
                GL
              </div>
              <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">About GardenLayoutTips</h3>
                <p className="text-lg text-stone-600 leading-relaxed mb-6">
                  Our team of professional horticulturists and landscape designers is dedicated to helping you create the most productive and beautiful vegetable garden layouts. We combine science with art to ensure your gardening success.
                </p>
                <div className="flex gap-4">
                  <Twitter size={20} className="text-stone-400 hover:text-sky-500 cursor-pointer transition-colors" />
                  <Facebook size={20} className="text-stone-400 hover:text-blue-600 cursor-pointer transition-colors" />
                  <Linkedin size={20} className="text-stone-400 hover:text-blue-700 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-stone-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-3xl font-bold text-stone-900">More from {post.category}</h2>
              <Link to="/blog" className="text-emerald-700 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                View All Articles <ArrowRight size={20} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} to={`/blog/${rp.slug}`} className="group">
                  <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 shadow-lg">
                    <img src={rp.image} alt={rp.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-3">{rp.date}</div>
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-tight">
                    {rp.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};
