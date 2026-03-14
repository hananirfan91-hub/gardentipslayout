import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '../constants';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2, Bookmark, Twitter, Facebook, Linkedin, Link as LinkIcon, CheckCircle } from 'lucide-react';
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
      {/* Header */}
      <header className="bg-stone-100 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-emerald-700 font-bold mb-8 hover:gap-3 transition-all">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
          <div className="flex items-center gap-4 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-6">
            <span>{post.category}</span>
            <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
            <span className="text-stone-400">{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-between border-t border-stone-200 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center text-white font-bold">
                GL
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900">GardenLayoutTips Expert</div>
                <div className="text-xs text-stone-500">Professional Contributor</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 mr-4 border-r border-stone-200 pr-4">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mr-2">Share:</span>
                <button onClick={shareOnTwitter} className="text-stone-400 hover:text-sky-500 transition-colors" title="Share on Twitter"><Twitter size={18} /></button>
                <button onClick={shareOnFacebook} className="text-stone-400 hover:text-blue-600 transition-colors" title="Share on Facebook"><Facebook size={18} /></button>
                <button onClick={shareOnLinkedIn} className="text-stone-400 hover:text-blue-700 transition-colors" title="Share on LinkedIn"><Linkedin size={18} /></button>
                <button onClick={copyLink} className={`${copyStatus ? 'text-emerald-600' : 'text-stone-400'} hover:text-emerald-700 transition-colors`} title="Copy Link">
                  {copyStatus ? <CheckCircle size={18} /> : <LinkIcon size={18} />}
                </button>
              </div>
              <button 
                onClick={toggleFavorite}
                className={`${isFavorite ? 'text-emerald-600' : 'text-stone-400'} hover:text-emerald-700 transition-colors`} 
                title={isFavorite ? "Remove from favorites" : "Save for later"}
              >
                <Bookmark size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 md:-mt-16 mb-16">
        <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
          <img src={post.image} alt={post.alt} className="w-full h-full object-cover" fetchPriority="high" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-stone prose-lg max-w-none prose-headings:text-stone-900 prose-headings:font-bold prose-p:text-stone-600 prose-p:leading-relaxed prose-a:text-emerald-700 prose-strong:text-stone-900">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Tags */}
        <div className="mt-16 pt-8 border-t border-stone-100 flex flex-wrap gap-2">
          {['Vegetable Garden', 'Layout Ideas', 'Backyard', 'Gardening Tips'].map(tag => (
            <span key={tag} className="bg-stone-100 text-stone-500 px-4 py-1.5 rounded-full text-xs font-medium">
              #{tag.replace(/\s+/g, '')}
            </span>
          ))}
        </div>

        {/* Author Bio */}
        <div className="mt-16 p-8 bg-stone-50 rounded-3xl flex items-center gap-6">
          <div className="w-20 h-20 bg-emerald-800 rounded-2xl shrink-0 flex items-center justify-center text-white text-2xl font-bold">
            GL
          </div>
          <div>
            <h3 className="font-bold text-lg text-stone-900 mb-2">About GardenLayoutTips</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              GardenLayoutTips is a team of passionate horticulturists and landscape designers dedicated to 
              helping you create the most productive and beautiful vegetable garden layouts.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
