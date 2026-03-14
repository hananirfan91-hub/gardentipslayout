import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Search, Star, TrendingUp, Users } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

export const Home: React.FC = () => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Perfect <span className="text-emerald-400">Vegetable Garden Layout</span> Ideas
            </h1>
            <p className="text-lg md:text-xl text-stone-200 mb-10 leading-relaxed">
              Design your dream garden with our interactive planner and expert guides. 
              From small backyard layouts to expansive raised beds.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/planner"
                className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-500 transition-all flex items-center gap-2 shadow-lg hover:shadow-emerald-500/20"
              >
                Start Planning <ArrowRight size={20} />
              </Link>
              <Link
                to="/guides"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
              >
                View Guides
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Garden Knowledge Base</h2>
            <p className="text-stone-600 max-w-2xl">
              Master your <strong>vegetable garden layout</strong> with our comprehensive guides on companion planting, 
              soil health, and seasonal planning.
            </p>
          </div>
          <Link to="/blog" className="text-emerald-700 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Explore All Articles <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6">
                <img 
                  src={post.image} 
                  alt={post.alt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-2">{post.category}</div>
              <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Topical Mapping Section */}
      <section className="bg-stone-900 py-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Topical Garden Map</h2>
              <p className="text-stone-400 text-lg mb-12 leading-relaxed">
                We've mapped out the essential pillars of a successful <strong>vegetable garden layout</strong>. 
                From soil biology to vertical design, our content is structured to take you from beginner to master.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Soil & Fertility', desc: 'The foundation of every healthy garden.' },
                  { title: 'Space Optimization', desc: 'Maximizing yields in small footprints.' },
                  { title: 'Pest Management', desc: 'Organic solutions for a thriving patch.' },
                  { title: 'Seasonal Planning', desc: 'Year-round productivity strategies.' }
                ].map((item, i) => (
                  <div key={i} className="bg-stone-800/50 p-6 rounded-2xl border border-stone-700">
                    <h4 className="font-bold text-emerald-400 mb-2">{item.title}</h4>
                    <p className="text-sm text-stone-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-emerald-900/20 rounded-full absolute -top-20 -right-20 w-96 h-96 blur-3xl"></div>
              <div className="relative bg-stone-800 p-12 rounded-[3rem] border border-stone-700 shadow-2xl">
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Topical Authority</div>
                      <div className="text-stone-400 text-sm">Comprehensive coverage of niche gardening topics.</div>
                    </div>
                  </div>
                  <div className="h-px bg-stone-700"></div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                      <Search size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-lg">SEO Optimized</div>
                      <div className="text-stone-400 text-sm">Targeting the right keywords for maximum reach.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 bg-emerald-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-600 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Happy Gardeners', value: '10,000+' },
              { label: 'Layouts Created', value: '25,000+' },
              { label: 'Plants Database', value: '500+' },
              { label: 'Expert Guides', value: '100+' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 text-emerald-400">{stat.value}</div>
                <div className="text-sm uppercase tracking-widest text-emerald-200 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Ad Section */}
      <section className="bg-stone-900 py-24 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=40&w=1920" 
            alt="Garden Texture" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Watch Our Latest Tips</h2>
            <p className="text-stone-400 text-lg mb-8 leading-relaxed">
              Get quick, actionable advice on how to optimize your vegetable garden layout 
              for maximum yield and beauty. Our short guides are perfect for busy gardeners.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <Link to="/blog/optimize-sunlight-layout" className="rounded-2xl overflow-hidden shadow-lg border border-stone-800 group block">
                <img 
                  src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600" 
                  alt="Garden Layout Tip 1" 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="p-4 bg-stone-800">
                  <p className="text-sm font-bold text-emerald-400">Sunlight Optimization</p>
                </div>
              </Link>
              <Link to="/blog/vertical-gardening-hacks" className="rounded-2xl overflow-hidden shadow-lg border border-stone-800 group block">
                <img 
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=600" 
                  alt="Garden Layout Tip 2" 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="p-4 bg-stone-800">
                  <p className="text-sm font-bold text-emerald-400">Vertical Hacks</p>
                </div>
              </Link>
            </div>
            <ul className="space-y-4">
              {[
                'Optimizing sunlight exposure',
                'Companion planting secrets',
                'Vertical space hacks',
                'Soil health essentials'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-stone-300">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[9/16] max-w-[350px] mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-stone-800">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/YPOXnS39Ufg?autoplay=1&mute=1&loop=1&playlist=YPOXnS39Ufg&controls=0"
              title="Vegetable Garden Layout Tips"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Detailed Content Section for SEO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="prose prose-stone lg:prose-lg">
            <h2 className="text-3xl font-bold text-stone-900 mb-6">The Science of a Productive Vegetable Garden Layout</h2>
            <p>
              Creating a successful <strong>vegetable garden layout</strong> is more than just placing seeds in the dirt. It's a delicate balance of biology, geometry, and timing. At GardenLayoutTips, we believe that every square inch of your garden should work toward a common goal: maximum health and maximum yield.
            </p>
            <p>
              One of the most critical factors in your layout is sunlight. Most vegetables require at least 6 to 8 hours of direct sun. When designing your garden, you must account for the path of the sun throughout the day and the shadows cast by taller plants like corn or trellised tomatoes. Our interactive planner helps you visualize these placements to ensure no plant is left in the dark.
            </p>
            <h3 className="text-2xl font-bold text-stone-900 mt-10 mb-4">Why Planning Your Garden Layout Matters</h3>
            <p>
              Without a plan, gardens often become overcrowded, leading to poor air circulation and the rapid spread of pests and diseases. A well-thought-out <strong>garden layout</strong> allows for proper spacing, which is essential for root development and nutrient absorption.
            </p>
            <ul>
              <li><strong>Companion Planting:</strong> Placing mutually beneficial plants together to deter pests and improve flavor.</li>
              <li><strong>Crop Rotation:</strong> Planning your layout across seasons to prevent soil depletion and break pest cycles.</li>
              <li><strong>Vertical Gardening:</strong> Utilizing trellises and towers to grow more in smaller footprints.</li>
            </ul>
          </div>
          <div className="prose prose-stone lg:prose-lg">
            <h2 className="text-3xl font-bold text-stone-900 mb-6">Maximizing Small Spaces with Smart Design</h2>
            <p>
              Not everyone has an acre of land to work with. In fact, some of the most productive gardens we've seen are small backyard patches or even balcony container gardens. The key is <strong>space optimization</strong>. By using intensive planting methods and high-quality soil mixes, you can produce a surprising amount of food in a tiny area.
            </p>
            <p>
              Our guides cover everything from the "Square Foot Gardening" method to permaculture-inspired "Garden Mandalas." We provide the tools and the knowledge to help you turn any space into a thriving ecosystem. Whether you are building your first raised bed or managing a complex multi-season plot, our expert tips are here to guide you.
            </p>
            <p>
              Soil health is the other half of the equation. A great layout won't save a garden with dead soil. We emphasize organic practices, composting, and minimal tillage to keep your soil biology thriving. Healthy soil leads to healthy plants, which in turn leads to a more resilient and productive garden layout.
            </p>
            <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h4 className="text-emerald-900 font-bold mb-2">Expert Tip:</h4>
              <p className="text-emerald-800 text-sm m-0">
                Always place your "heavy feeders" like broccoli and leafy greens in areas where you've recently added fresh compost. Use your layout to track these high-nutrient zones!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Users, label: 'Happy Gardeners', value: '10k+' },
            { icon: Star, label: 'Layout Ideas', value: '500+' },
            { icon: TrendingUp, label: 'Success Rate', value: '98%' },
            { icon: CheckCircle2, label: 'Expert Guides', value: '150+' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-8 bg-white rounded-2xl border border-stone-100 shadow-sm">
              <stat.icon className="mx-auto text-emerald-600 mb-4" size={32} />
              <div className="text-3xl font-bold text-stone-900 mb-1">{stat.value}</div>
              <div className="text-sm text-stone-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-800 rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700 rounded-full -mr-32 -mt-32 opacity-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-700 rounded-full -ml-32 -mb-32 opacity-20" />
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 relative z-10">
            Ready to design your perfect <br className="hidden md:block" /> vegetable garden layout?
          </h2>
          <p className="text-emerald-100 text-lg mb-12 max-w-2xl mx-auto relative z-10">
            Join thousands of gardeners using our interactive tools to plan their most productive season yet.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Link
              to="/login"
              className="bg-white text-emerald-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-stone-100 transition-all shadow-xl"
            >
              Create Free Account
            </Link>
            <Link
              to="/planner"
              className="bg-emerald-700 text-white border border-emerald-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all"
            >
              Try the Planner
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
