import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Search, Star, TrendingUp, Users, Sprout, Layout, ShieldCheck, Zap, HelpCircle, Quote } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import { Helmet } from 'react-helmet-async';

export const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-24 pb-24">
      <Helmet>
        <title>Vegetable Garden Layout Ideas & Interactive Planner | GardenLayoutTips</title>
        <meta name="description" content="Discover expert vegetable garden layout ideas and use our interactive garden planner to design your perfect backyard patch. Maximize your harvest today!" />
        <meta property="og:title" content="Vegetable Garden Layout Ideas & Interactive Planner" />
        <meta property="og:description" content="Design your dream garden with our interactive planner and expert guides. From small backyard layouts to expansive raised beds." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=75&w=1280&h=720" 
            alt="Lush and productive vegetable garden layout with diverse organic crops" 
            className="w-full h-full object-cover brightness-50"
            fetchPriority="high"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-4 py-2 rounded-full text-emerald-300 text-sm font-bold mb-8"
            >
              <Sprout size={16} /> #1 Garden Planning Tool of 2026
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-tight">
              Grow More with <span className="text-emerald-400">Smarter Layouts</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-200 mb-12 leading-relaxed max-w-2xl">
              Stop guessing and start growing. Our interactive planner and expert-led <strong>vegetable garden layout</strong> guides help you maximize every square inch of your soil.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                to="/planner"
                className="bg-emerald-600 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-emerald-500 transition-all flex items-center gap-3 shadow-2xl shadow-emerald-900/40 hover:-translate-y-1"
              >
                Start Your Layout <ArrowRight size={24} />
              </Link>
              <Link
                to="/blog"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-all hover:-translate-y-1"
              >
                Explore Ideas
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Why Choose Us - Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Why GardenLayoutTips?</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            We combine traditional gardening wisdom with modern digital tools to give you the ultimate growing advantage.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -10 }}
            className="md:col-span-2 bg-stone-50 p-10 rounded-[3rem] border border-stone-100 flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="flex-1">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Layout size={32} />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Interactive Drag-and-Drop Planner</h3>
              <p className="text-stone-600 leading-relaxed">
                Visualize your <strong>vegetable garden layout</strong> before you even pick up a shovel. Our tool accounts for plant spacing and companion benefits automatically.
              </p>
            </div>
            <div className="w-full md:w-1/2 aspect-video bg-white rounded-2xl shadow-inner border border-stone-200 overflow-hidden relative">
              <div className="absolute inset-4 border-2 border-dashed border-stone-100 rounded-xl flex items-center justify-center">
                <div className="flex gap-2">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl">🍅</div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl">🥕</div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">🥬</div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-emerald-900 p-10 rounded-[3rem] text-white flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-emerald-800 text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Expert-Verified Content</h3>
              <p className="text-emerald-100/70 leading-relaxed">
                Every guide and tip is reviewed by professional horticulturists to ensure your garden's success.
              </p>
            </div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-emerald-400 font-bold hover:gap-3 transition-all">
              Meet the Experts <ArrowRight size={18} />
            </Link>
          </motion.div>
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-stone-100 text-stone-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Instant Yield Optimization</h3>
              <p className="text-stone-600 leading-relaxed">
                Our algorithms suggest the best <strong>garden layout ideas</strong> to maximize your harvest based on your specific space.
              </p>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ y: -10 }}
            className="md:col-span-2 bg-stone-900 p-10 rounded-[3rem] text-white flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="w-full md:w-1/3 aspect-square bg-emerald-500/10 rounded-full flex items-center justify-center relative overflow-hidden">
              <TrendingUp size={80} className="text-emerald-500/20 absolute" />
              <div className="text-4xl font-bold text-emerald-500 relative z-10">98%</div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Success Rate for Beginners</h3>
              <p className="text-stone-400 leading-relaxed">
                Users who follow our <strong>vegetable garden layout</strong> plans report a 98% success rate in their first growing season compared to traditional methods.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our 3-Step Process */}
      <section className="bg-stone-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-stone-900 mb-6">How It Works</h2>
            <p className="text-stone-600">Three simple steps to your most productive garden ever.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-stone-200 -translate-y-1/2 z-0"></div>
            {[
              { step: '01', title: 'Measure & Map', desc: 'Input your garden dimensions and sunlight levels into our tool.' },
              { step: '02', title: 'Design & Optimize', desc: 'Drag and drop plants. Our tool suggests companion pairings.' },
              { step: '03', title: 'Grow & Harvest', desc: 'Follow your custom plan and expert maintenance guides.' }
            ].map((item, i) => (
              <div key={i} className="relative z-10 bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-sm text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 text-xl font-bold shadow-lg shadow-emerald-600/20">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">{item.title}</h3>
                <p className="text-stone-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Garden Knowledge Base</h2>
            <p className="text-stone-600 max-w-2xl">
              Master your <strong>vegetable garden layout</strong> with our comprehensive guides on companion planting, 
              soil health, and seasonal planning.
            </p>
          </div>
          <Link to="/blog" className="bg-stone-100 text-stone-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-stone-200 transition-all">
            Explore All Articles <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {BLOG_POSTS.slice(0, 3).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/blog/${post.slug}`} className="group block">
                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 shadow-lg">
                  <img 
                    src={post.image} 
                    alt={post.alt} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-[0.2em] bg-emerald-50 px-3 py-1 rounded-full">{post.category}</span>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-tight">
                  {post.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-emerald-900 py-24 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">Loved by Gardeners</h2>
            <p className="text-emerald-100/70">Join 10,000+ happy growers worldwide.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Jenkins', role: 'Home Gardener', quote: 'The interactive planner changed everything. I used to struggle with spacing, but now my garden looks professional and produces twice as much!' },
              { name: 'Michael Chen', role: 'Urban Farmer', quote: 'Finding small backyard garden layout ideas that actually work is hard. GardenLayoutTips provided the perfect vertical solution for my patio.' },
              { name: 'Emma Thompson', role: 'Beginner', quote: 'I was overwhelmed by companion planting. The guides here made it so simple to understand. My tomatoes have never tasted better!' }
            ].map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/10 relative">
                <Quote className="text-emerald-500/20 absolute top-8 right-8" size={60} />
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-emerald-400 text-emerald-400" />)}
                </div>
                <p className="text-lg text-emerald-50 mb-8 italic leading-relaxed">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-sm text-emerald-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Content Section for SEO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="prose prose-stone lg:prose-xl"
          >
            <h2 className="text-4xl font-bold text-stone-900 mb-8">The Science of a Productive Vegetable Garden Layout</h2>
            <p>
              Creating a successful <strong>vegetable garden layout</strong> is more than just placing seeds in the dirt. It's a delicate balance of biology, geometry, and timing. At GardenLayoutTips, we believe that every square inch of your garden should work toward a common goal: maximum health and maximum yield.
            </p>
            <p>
              One of the most critical factors in your layout is sunlight. Most vegetables require at least 6 to 8 hours of direct sun. When designing your garden, you must account for the path of the sun throughout the day and the shadows cast by taller plants like corn or trellised tomatoes. Our interactive planner helps you visualize these placements to ensure no plant is left in the dark.
            </p>
            <h3 className="text-3xl font-bold text-stone-900 mt-12 mb-6">Why Planning Your Garden Layout Matters</h3>
            <p>
              Without a plan, gardens often become overcrowded, leading to poor air circulation and the rapid spread of pests and diseases. A well-thought-out <strong>garden layout</strong> allows for proper spacing, which is essential for root development and nutrient absorption.
            </p>
            <ul className="space-y-4">
              <li><strong>Companion Planting:</strong> Placing mutually beneficial plants together to deter pests and improve flavor.</li>
              <li><strong>Crop Rotation:</strong> Planning your layout across seasons to prevent soil depletion and break pest cycles.</li>
              <li><strong>Vertical Gardening:</strong> Utilizing trellises and towers to grow more in smaller footprints.</li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="prose prose-stone lg:prose-xl"
          >
            <h2 className="text-4xl font-bold text-stone-900 mb-8">Maximizing Small Spaces with Smart Design</h2>
            <p>
              Not everyone has an acre of land to work with. In fact, some of the most productive gardens we've seen are small backyard patches or even balcony container gardens. The key is <strong>space optimization</strong>. By using intensive planting methods and high-quality soil mixes, you can produce a surprising amount of food in a tiny area.
            </p>
            <p>
              Our guides cover everything from the "Square Foot Gardening" method to permaculture-inspired "Garden Mandalas." We provide the tools and the knowledge to help you turn any space into a thriving ecosystem. Whether you are building your first raised bed or managing a complex multi-season plot, our expert tips are here to guide you.
            </p>
            <p>
              Soil health is the other half of the equation. A great layout won't save a garden with dead soil. We emphasize organic practices, composting, and minimal tillage to keep your soil biology thriving. Healthy soil leads to healthy plants, which in turn leads to a more resilient and productive garden layout.
            </p>
            <div className="mt-12 p-10 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 relative overflow-hidden">
              <Sprout className="absolute -bottom-6 -right-6 text-emerald-200/50" size={120} />
              <h4 className="text-emerald-900 text-2xl font-bold mb-4 relative z-10">Expert Tip:</h4>
              <p className="text-emerald-800 relative z-10 m-0">
                Always place your "heavy feeders" like broccoli and leafy greens in areas where you've recently added fresh compost. Use your layout to track these high-nutrient zones!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h2>
          <p className="text-stone-600">Common questions about vegetable garden layouts.</p>
        </div>
        <div className="space-y-6">
          {[
            { q: 'What is the best vegetable garden layout for beginners?', a: 'For beginners, a raised bed layout is often best. It provides clear boundaries, better soil control, and easier weed management. Start with a simple 4x4 or 4x8 foot bed.' },
            { q: 'How much space do I need for a vegetable garden?', a: 'You can grow a surprising amount in just 10-20 square feet using intensive methods like square foot gardening or vertical trellises.' },
            { q: 'What are the best plants for a small backyard layout?', a: 'Focus on high-yield, vertical plants like pole beans, cucumbers, and indeterminate tomatoes. Leafy greens and herbs are also great for small spaces.' },
            { q: 'How do I plan for sunlight in my garden layout?', a: 'Map your yard throughout the day. Place sun-loving crops (tomatoes, peppers) in the sunniest spots and shade-tolerant crops (lettuce, spinach) in areas with partial shade.' }
          ].map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm"
            >
              <h4 className="font-bold text-stone-900 text-lg mb-3 flex items-center gap-3">
                <HelpCircle className="text-emerald-600" size={20} /> {faq.q}
              </h4>
              <p className="text-stone-600 leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-emerald-800 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700 rounded-full -mr-48 -mt-48 opacity-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-700 rounded-full -ml-48 -mb-48 opacity-20 blur-3xl" />
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 relative z-10 leading-tight">
            Ready to design your perfect <br className="hidden md:block" /> vegetable garden layout?
          </h2>
          <p className="text-emerald-100 text-xl mb-14 max-w-2xl mx-auto relative z-10 leading-relaxed">
            Join thousands of gardeners using our interactive tools to plan their most productive season yet. It's free to start!
          </p>
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <Link
              to="/login"
              className="bg-white text-emerald-900 px-12 py-5 rounded-full font-bold text-xl hover:bg-stone-100 transition-all shadow-xl hover:-translate-y-1"
            >
              Create Free Account
            </Link>
            <Link
              to="/planner"
              className="bg-emerald-700 text-white border border-emerald-600 px-12 py-5 rounded-full font-bold text-xl hover:bg-emerald-600 transition-all hover:-translate-y-1"
            >
              Try the Planner
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
