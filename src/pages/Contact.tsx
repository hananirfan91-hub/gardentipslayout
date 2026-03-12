import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';

import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [captcha, setCaptcha] = useState(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { a, b, result: a + b };
  });
  const [captchaInput, setCaptchaInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaInput) !== captcha.result) {
      alert('Incorrect security check answer. Please try again.');
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
      // Reset form and captcha
      setFormData({ name: '', email: '', message: '' });
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      setCaptcha({ a, b, result: a + b });
      setCaptchaInput('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Get in Touch</h1>
        <p className="text-lg text-stone-600">
          Have questions about your <strong>vegetable garden layout</strong>? We're here to help you grow.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Mail, label: 'Email Us', value: 'hananirfan91@gmail.com' },
              { icon: Phone, label: 'Call Us', value: '+92 310 6359 235' },
              { icon: MapPin, label: 'Visit Us', value: 'View on Google Maps' },
              { icon: MessageSquare, label: 'Live Chat', value: 'Available 9am - 5pm' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <item.icon size={24} />
                </div>
                <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{item.label}</div>
                {item.label === 'Visit Us' ? (
                  <a href="https://share.google/M1tuMmyFRyLWel2d5" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold hover:underline">
                    {item.value}
                  </a>
                ) : (
                  <div className="text-stone-900 font-bold">{item.value}</div>
                )}
              </div>
            ))}
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl h-[300px] border-8 border-white">
            <iframe
              title="GardenLayout Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111245.3468511796!2d70.2316499!3d28.4211634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39375c32666321b3%3A0x8243f7aa4488d06!2sRahim%20Yar%20Khan%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1625612345678!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-stone-100">
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Message Sent!</h3>
              <p className="text-stone-600 mb-8">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-emerald-700 font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-stone-50 border-stone-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-stone-50 border-stone-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-stone-50 border-stone-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                  placeholder="Tell us about your garden..."
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">What is {captcha.a} + {captcha.b}? (Security Check)</label>
                <input
                  type="number"
                  required
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="w-full bg-stone-50 border-stone-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="Enter the result"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-800 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
