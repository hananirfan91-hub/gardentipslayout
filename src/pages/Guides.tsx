import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Download, Play, ChevronRight, CheckCircle2, X } from 'lucide-react';
import { jsPDF } from 'jspdf';

export const Guides: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);

  const handleDownloadPDF = (title: string) => {
    const doc = new jsPDF();
    
    // Add Branding
    doc.setFillColor(90, 90, 64); // #5A5A40
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('GardenLayoutTips', 20, 25);
    
    // Add Content
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(20);
    doc.text(title, 20, 60);
    
    doc.setFontSize(12);
    doc.text('Expert Guide for Vegetable Garden Layouts', 20, 70);
    
    doc.setLineWidth(0.5);
    doc.line(20, 75, 190, 75);
    
    const content = title === 'Mastering the Square Foot Garden Layout' ? [
      '1. Layout: Arrange garden in squares, not rows. Layout 4\' x 4\' planting areas.',
      '2. Boxes: Build bottomless boxes to hold new soil mix.',
      '3. Aisles: Space boxes 3\' apart to form walking aisles.',
      '4. Soil: Fill boxes with special "Soil" mix: 1/3 compost, 1/3 peat moss, 1/3 vermiculite.',
      '5. Grid: Make a square foot grid for the top of each box. A MUST!',
      '6. Care: NEVER WALK ON YOUR GROWING SOIL. Tend your garden from the aisles.',
      '7. Select: Plant a different crop in each square foot; using 1, 4, 9, or 16 plants.',
      '8. Plant: Conserve seeds. Plant only a pinch (2 or 3 seeds) per hole.',
      '9. Water: Water by hand or drip irrigation system.',
      '10. Harvest: When you finish harvesting, add compost and replant with a new crop.',
      '',
      'LOCATION TIPS:',
      '- Pick an area that gets 6-8 hours of sunshine daily.',
      '- Be sure it is not near trees and shrubs (watch for roots and shade).',
      '- Have it as close as possible to the house for convenience.'
    ] : [
      'Comprehensive Garden Layout Bundle',
      'This bundle includes all our top-rated guides for:',
      '- Square Foot Gardening Mastery',
      '- Small Space Optimization',
      '- Raised Bed Construction',
      '- Companion Planting Layouts',
      '- Seasonal Rotation Strategies',
      '',
      'Visit gardenlayouttips.vercel.app for interactive tools!'
    ];
    
    let y = 90;
    content.forEach(line => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 20, y);
      y += 10;
    });
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('© 2026 GardenLayoutTips. All rights reserved.', 20, 285);
    doc.text('gardenlayouttips.vercel.app', 150, 285);

    doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
  };
  const guides = [
    {
      title: 'The Beginner\'s Guide to Garden Layouts',
      desc: 'Everything you need to know to start your first vegetable patch.',
      image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600&h=400',
      duration: '15 min read',
      level: 'Beginner'
    },
    {
      title: 'Small Space Mastery',
      desc: 'Advanced vertical gardening and container layout techniques.',
      image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=600&h=400',
      duration: '20 min read',
      level: 'Intermediate'
    },
    {
      title: 'Raised Bed Revolution',
      desc: 'Design and build the perfect raised bed system for your backyard.',
      image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=600&h=400',
      duration: '25 min read',
      level: 'Advanced'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Interactive Gardening Guides</h1>
        <p className="text-lg text-stone-600">
          Step-by-step tutorials and downloadable resources to help you master your <strong>vegetable garden layout</strong>.
        </p>
      </div>

      {/* Featured Guide */}
      <section className="bg-emerald-900 rounded-[3rem] overflow-hidden shadow-2xl mb-24 flex flex-col lg:flex-row">
        <div className="lg:w-1/2 relative">
          <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1000&h=800" alt="Featured Guide" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-emerald-900/20"></div>
          <button 
            onClick={() => setShowVideo(true)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white text-emerald-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-10"
          >
            <Play size={32} fill="currentColor" />
          </button>
        </div>
        <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center">
          <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">Featured Tutorial</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Mastering the Square Foot Garden Layout</h2>
          <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
            Learn how to maximize your harvest by partitioning your garden into one-foot squares. 
            Perfect for small backyards and high-efficiency growing.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setShowVideo(true)}
              className="bg-white text-emerald-900 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-all flex items-center gap-2"
            >
              Watch Video <ChevronRight size={18} />
            </button>
            <button 
              onClick={() => handleDownloadPDF('Mastering the Square Foot Garden Layout')}
              className="bg-emerald-800 text-white border border-emerald-700 px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all flex items-center gap-2"
            >
              <Download size={18} /> Download PDF
            </button>
          </div>
        </div>
      </section>

      {/* Guide Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            onClick={() => alert(`Starting guide: ${guide.title}`)}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 group cursor-pointer"
          >
            <div className="aspect-video overflow-hidden relative">
              <img src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                {guide.level}
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 text-stone-400 text-xs mb-4">
                <BookOpen size={14} />
                <span>{guide.duration}</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4 group-hover:text-emerald-800 transition-colors">
                {guide.title}
              </h3>
              <p className="text-stone-600 text-sm mb-6 leading-relaxed">
                {guide.desc}
              </p>
              <button className="text-emerald-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              <a href="https://growgive.extension.colostate.edu/wp-content/uploads/sites/63/2021/01/Colorado-Vegetable-Guide-2.1.pdf">Start Guide </a> <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Checklist Section */}
      <section className="mt-24 bg-stone-50 rounded-[3rem] p-12 md:p-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-8">Garden Layout Checklist</h2>
            <div className="space-y-4">
              {[
                'Measure your available space accurately',
                'Identify sun and shade patterns',
                'Test your soil pH and nutrient levels',
                'Plan for easy water access',
                'Choose your preferred gardening method (Raised beds, In-ground, etc.)',
                'Select companion plants for natural pest control'
              ].map((item, i) => {
                const [checked, setChecked] = useState(false);
                return (
                  <motion.div 
                    key={i} 
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setChecked(!checked)}
                    className={`flex items-start gap-4 p-4 rounded-2xl transition-all cursor-pointer ${checked ? 'bg-emerald-100/50' : 'hover:bg-white hover:shadow-sm'}`}
                  >
                    <div className={`mt-1 p-1 rounded-full transition-colors ${checked ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-600'}`}>
                      <CheckCircle2 size={16} />
                    </div>
                    <p className={`font-medium transition-colors ${checked ? 'text-emerald-800 line-through opacity-60' : 'text-stone-700'}`}>{item}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100">
            <h3 className="text-xl font-bold text-stone-900 mb-6">Download All Guides</h3>
            <p className="text-stone-500 text-sm mb-8">
              Get our complete collection of vegetable garden layout guides in one convenient PDF bundle.
            </p>
            <button 
              onClick={() => handleDownloadPDF('Complete Garden Layout Bundle')}
              className="w-full bg-emerald-800 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-900/20"
            >
              <Download size={20} /> Download Bundle (12MB)
            </button>
          </div>
        </div>
      </section>
      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          >
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-8 right-8 text-white hover:text-stone-300 transition-colors"
            >
              <X size={32} />
            </button>
            <div className="w-full max-w-4xl aspect-video bg-stone-900 rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/YPOXnS39Ufg"
                title="Square Foot Gardening Guide"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
