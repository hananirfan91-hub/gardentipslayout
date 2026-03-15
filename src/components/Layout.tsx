import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Sprout, Menu, X, User, LogOut, Youtube, Facebook, Instagram, Twitter, MapPin, Phone, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [subscribeStatus, setSubscribeStatus] = React.useState<'idle' | 'loading' | 'success'>('idle');
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || subscribeStatus === 'loading') return;

    setSubscribeStatus('loading');
    try {
      const email = newsletterEmail.toLowerCase().trim();
      await setDoc(doc(db, 'newsletter_subscribers', email), {
        email,
        subscribedAt: serverTimestamp(),
      });
      setSubscribeStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'newsletter_subscribers');
    } finally {
      setSubscribeStatus('idle');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Guides', path: '/guides' },
    { name: 'Planner', path: '/planner' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f0] text-stone-900 font-sans">
      {/* Floating Social Sidebar */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4">
        {[
          { icon: Youtube, color: 'bg-red-600', url: 'https://www.youtube.com/@ancientmystery-0' },
          { icon: Facebook, color: 'bg-blue-600', url: 'https://facebook.com/HananIrfan001' },
          { icon: Instagram, color: 'bg-pink-600', url: 'https://instagram.com/tearswithhanan/' },
          { icon: Twitter, color: 'bg-sky-500', url: 'https://x.com/hananirfan91' },
        ].map((social, i) => (
          <motion.a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, x: 5 }}
            className={`${social.color} text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all`}
          >
            <social.icon size={20} />
          </motion.a>
        ))}
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-emerald-800 p-1 rounded-lg group-hover:bg-emerald-700 transition-colors">
                <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10C30 10 10 30 10 50C10 70 30 90 50 90C70 90 90 70 90 50C90 30 70 10 50 10Z" fill="#5A5A40"/>
                  <path d="M50 25C50 25 35 45 35 60C35 68.2843 41.7157 75 50 75C58.2843 75 65 68.2843 65 60C65 45 50 25 50 25Z" fill="#10B981"/>
                  <path d="M50 35L55 50H45L50 35Z" fill="white" opacity="0.5"/>
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-emerald-900 hidden sm:block">
                GardenLayoutTips
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-emerald-700 ${
                    location.pathname === link.path ? 'text-emerald-800' : 'text-stone-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <div className="flex items-center gap-4 border-l border-stone-200 pl-6">
                  <div className="flex items-center gap-2">
                    {profile?.photoURL ? (
                      <img src={profile.photoURL} alt="" className="w-8 h-8 rounded-full border border-stone-200" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200">
                        <User size={16} className="text-stone-400" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-stone-700 max-w-[100px] truncate">
                      {profile?.displayName || user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-stone-400 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-emerald-800 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-stone-100 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg text-base font-medium ${
                      location.pathname === link.path
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {!user && (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center bg-emerald-800 text-white py-3 rounded-xl font-medium mt-4"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-emerald-800 p-1 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10C30 10 10 30 10 50C10 70 30 90 50 90C70 90 90 70 90 50C90 30 70 10 50 10Z" fill="#5A5A40"/>
                  <path d="M50 25C50 25 35 45 35 60C35 68.2843 41.7157 75 50 75C58.2843 75 65 68.2843 65 60C65 45 50 25 50 25Z" fill="#10B981"/>
                </svg>
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">GardenLayoutTips</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Empowering gardeners to design productive and beautiful vegetable patches with ease.
            </p>
            <div className="pt-4 space-y-2 text-sm">
              <p className="flex items-center gap-2"><MapPin size={14} className="text-emerald-500" /> 123 Garden Lane, RYK, PK</p>
              <p className="flex items-center gap-2"><Phone size={14} className="text-emerald-500" /> +92 310 6359 235</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-emerald-500 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://quickworkitcenter.lovable.app/" className="hover:text-emerald-500 transition-colors">QuickWork IT</a></li>
              <li><a href="https://hadithwisdomhub0.vercel.app/" className="hover:text-emerald-500 transition-colors">Hadith Wisdom</a></li>
              <li><a href="https://hananirfanportfolio.vercel.app/" className="hover:text-emerald-500 transition-colors">Portfolio</a></li>
              <li><a href="https://aiblogs0.vercel.app/" className="hover:text-emerald-500 transition-colors">AI Blogs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Get gardening tips delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Email address"
                className="bg-stone-800 border-none rounded-lg px-4 py-2 text-sm flex-1 focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-50"
                disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              />
              <button 
                type="submit"
                disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {subscribeStatus === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 
                 subscribeStatus === 'success' ? <CheckCircle size={16} /> : 'Join'}
              </button>
            </form>
            {subscribeStatus === 'success' && (
              <p className="text-emerald-500 text-xs mt-2 animate-pulse">Thanks for joining!</p>
            )}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-800 text-center text-xs">
          <p>© 2026 GardenLayoutTips. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
