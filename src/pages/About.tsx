import React from 'react';
import { motion } from 'motion/react';
import { Youtube, Facebook, Instagram, Twitter, Award, Heart, ShieldCheck, Sprout, ArrowRight, Quote } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const About: React.FC = () => {
  return (
    <div className="pb-24">
      <Helmet>
        <title>About Us | GardenLayoutTips - Our Story & Expertise</title>
        <meta name="description" content="Learn about GardenLayoutTips and our mission to help you create the perfect vegetable garden layout. Founded by Hanan Irfan, we combine 15+ years of horticultural expertise." />
        <link rel="canonical" href="https://gardenlayouttips.vercel.app/about" />
      </Helmet>

      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=2000" 
            alt="Lush green garden background representing our growth and passion" 
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-900/80 to-stone-900"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-[0.3em] mb-10">
              <Sprout size={14} /> Since 2011
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-10 leading-[0.85] tracking-tighter">
              Rooted in <br />
              <span className="text-emerald-400 italic font-serif">Expertise.</span>
            </h1>
            <p className="text-2xl md:text-3xl text-stone-300 mb-12 leading-relaxed font-light max-w-2xl">
              We're on a mission to democratize gardening knowledge, turning every backyard into a productive sanctuary.
            </p>
            <div className="flex flex-wrap gap-12 items-center">
              <div className="flex flex-col">
                <span className="text-5xl font-bold text-white">15+</span>
                <span className="text-xs text-emerald-500 font-bold uppercase tracking-widest mt-2">Years of Soil</span>
              </div>
              <div className="w-px h-16 bg-stone-700 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-5xl font-bold text-white">10k+</span>
                <span className="text-xs text-emerald-500 font-bold uppercase tracking-widest mt-2">Growers Empowered</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-500 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-stone-500 to-transparent"></div>
        </motion.div>
      </section>

      {/* Founder Section - Split Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=1000" 
                alt="Hanan Irfan - Founder of GardenLayoutTips" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-100 rounded-full -z-0 blur-3xl opacity-50"></div>
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-stone-100 rounded-full -z-0 blur-2xl opacity-50"></div>
            
            <div className="absolute bottom-12 left-12 z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] text-white">
              <div className="text-sm font-bold uppercase tracking-widest mb-1">Founder</div>
              <div className="text-3xl font-bold">Hanan Irfan</div>
            </div>
          </motion.div>

          <div className="space-y-10">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
              A Personal Journey from <br />
              <span className="text-emerald-600 italic">Trial to Triumph.</span>
            </h2>
            <div className="prose prose-stone lg:prose-xl text-stone-600 leading-relaxed">
              <p>
                Hi, I'm Hanan Irfan. My obsession with <strong>vegetable garden layouts</strong> didn't start in a sprawling estate, but in a cramped urban backyard with poor soil and even worse sunlight.
              </p>
              <p>
                I spent years failing—overcrowding plants, ignoring companion benefits, and losing harvests to pests. But every failure was a lesson. I realized that gardening isn't just about luck; it's about <strong>strategic design</strong>.
              </p>
              <p>
                Today, GardenLayoutTips is the culmination of 15 years of horticultural research and hands-on experience. We've distilled complex principles like <strong>square foot gardening</strong> and <strong>permaculture</strong> into simple, actionable tools for you.
              </p>
            </div>
            <div className="flex gap-6 pt-6">
              {[
                { icon: Youtube, color: 'hover:bg-red-600', url: 'https://www.youtube.com/@ancientmystery-0' },
                { icon: Facebook, color: 'hover:bg-blue-600', url: 'https://facebook.com/HananIrfan001' },
                { icon: Instagram, color: 'hover:bg-pink-600', url: 'https://instagram.com/tearswithhanan/' },
                { icon: Twitter, color: 'hover:bg-sky-500', url: 'https://x.com/hananirfan91' },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`w-14 h-14 rounded-2xl bg-stone-100 text-stone-600 flex items-center justify-center transition-all hover:text-white ${social.color} hover:-translate-y-1 shadow-sm`}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values - Grid Layout */}
      <section className="bg-stone-50 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold text-stone-900 mb-6 tracking-tight">What We Stand For</h2>
              <p className="text-xl text-stone-600 leading-relaxed">
                Our values aren't just words on a page; they are the principles that guide every article we write and every layout we design.
              </p>
            </div>
            <div className="hidden md:block w-32 h-px bg-stone-300 mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: Heart, 
                title: 'Passion for Nature', 
                desc: 'We believe in the healing power of the soil and the profound joy of watching a seed transform into a harvest.',
                color: 'bg-red-50 text-red-600'
              },
              { 
                icon: Award, 
                title: 'Expert Knowledge', 
                desc: 'No fluff, no guesswork. Every tip is backed by practical experience and horticultural science.',
                color: 'bg-emerald-50 text-emerald-600'
              },
              { 
                icon: ShieldCheck, 
                title: 'Sustainability', 
                desc: 'We promote organic, regenerative practices that give back to the earth more than they take.',
                color: 'bg-blue-50 text-blue-600'
              },
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-12 rounded-[3rem] shadow-xl shadow-stone-200/50 border border-stone-100 group hover:-translate-y-2 transition-all duration-500"
              >
                <div className={`w-20 h-20 ${value.color} rounded-[2rem] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                  <value.icon size={40} />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6">{value.title}</h3>
                <p className="text-stone-600 leading-relaxed text-lg">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="max-w-5xl mx-auto px-4 py-32 text-center">
        <Quote className="mx-auto text-emerald-200 mb-10" size={80} />
        <h3 className="text-3xl md:text-5xl font-serif italic text-stone-800 leading-tight mb-12">
          "A garden is not just a place to grow food; it's a place to grow yourself. Our mission is to provide the map for that journey."
        </h3>
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-stone-300"></div>
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-stone-500">Hanan Irfan</span>
          <div className="w-12 h-px bg-stone-300"></div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="bg-emerald-900 rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=40&w=1920" 
              alt="Garden Texture" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-12 relative z-10 tracking-tight">
            Let's Build Your <br />
            <span className="text-emerald-400 italic">Dream Layout.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-8 relative z-10">
            <a 
              href="/planner" 
              className="bg-emerald-500 text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-emerald-400 transition-all flex items-center gap-3 shadow-2xl shadow-emerald-950/50 hover:-translate-y-1"
            >
              Start Planning Now <ArrowRight size={24} />
            </a>
            <a 
              href="/contact" 
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-6 rounded-full font-bold text-xl hover:bg-white/20 transition-all hover:-translate-y-1"
            >
              Get Expert Advice
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
