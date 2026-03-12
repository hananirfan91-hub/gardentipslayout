import React from 'react';
import { motion } from 'motion/react';
import { Youtube, Facebook, Instagram, Twitter, Award, Heart, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=2000" 
            alt="Garden Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Our Mission & Story
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[0.9] tracking-tight">
                Cultivating <span className="text-emerald-400 italic font-serif">Greener</span> Backyards.
              </h1>
              <p className="text-xl md:text-2xl text-stone-300 mb-10 leading-relaxed font-light">
                We believe that everyone deserves a productive, beautiful vegetable garden, 
                no matter how small their space is. Our tools empower you to grow your own food.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-white">15+</span>
                  <span className="text-xs text-stone-400 uppercase tracking-widest">Years Expertise</span>
                </div>
                <div className="w-px h-12 bg-stone-700 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-white">10k+</span>
                  <span className="text-xs text-stone-400 uppercase tracking-widest">Happy Gardeners</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="bg-emerald-50 p-12 rounded-[3rem] border border-emerald-100 shadow-inner">
            <div className="text-4xl font-bold text-emerald-800 mb-2">15+ Years</div>
            <div className="text-sm text-emerald-600 font-bold uppercase tracking-widest mb-6">Expertise in Horticulture</div>
            <p className="text-stone-600 leading-relaxed">
              Our journey is rooted in a deep passion for sustainable living and the belief that every backyard, 
              no matter its size, holds the potential for a bountiful harvest. We've spent over a decade 
              refining the art of <strong>vegetable garden layout</strong> design to help you succeed.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
              <div className="text-2xl font-bold text-stone-900 mb-1">500+</div>
              <div className="text-xs text-stone-500 font-bold uppercase tracking-wider">Layout Designs</div>
            </div>
            <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
              <div className="text-2xl font-bold text-stone-900 mb-1">10k+</div>
              <div className="text-xs text-stone-500 font-bold uppercase tracking-wider">Happy Gardeners</div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-stone-900 mb-6">Our Story & Expertise</h2>
          <p className="text-stone-600 text-lg mb-6 leading-relaxed">
            Hi, I'm Hanan Irfan, the founder of GardenLayoutTips. My journey began in a tiny urban backyard 
            where I struggled to fit all the vegetables I wanted to grow. Through trial and error, 
            I discovered the power of strategic <strong>vegetable garden layout</strong> planning. 
            I realized that with the right design, even the smallest space can produce an abundance of food.
          </p>
          <p className="text-stone-600 text-lg mb-8 leading-relaxed">
            Today, our mission is to provide you with the tools and knowledge to transform your 
            outdoor space into a flourishing oasis of organic produce. We combine traditional 
            horticultural wisdom with modern design principles like <strong>square foot gardening</strong> 
            and <strong>companion planting</strong> to ensure your success.
          </p>
          <div className="flex gap-4">
            {[
              { icon: Youtube, color: 'hover:text-red-600' , url: 'https://www.youtube.com/@ancientmystery-0'},
              { icon: Facebook, color: 'hover:text-blue-600',url: 'https://facebook.com/HananIrfan001' },
              { icon: Instagram, color: 'hover:text-pink-600',url: 'https://instagram.com/tearswithhanan/' },
              { icon: Twitter, color: 'hover:text-sky-500',url: 'https://x.com/hananirfan91/' },
            ].map((social, i) => (
              <a key={i} href="#" className={`text-stone-400 transition-colors ${social.color}`}>
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-stone-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Our Core Values</h2>
            <p className="text-stone-500">What drives us to help you grow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Passion for Nature', desc: 'We love the earth and everything that grows in it.' },
              { icon: Award, title: 'Expert Knowledge', desc: 'Our advice is backed by years of practical experience.' },
              { icon: ShieldCheck, title: 'Sustainability', desc: 'We promote eco-friendly gardening practices for a better future.' },
            ].map((value, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 text-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-4">{value.title}</h3>
                <p className="text-stone-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
