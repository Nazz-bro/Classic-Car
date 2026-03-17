import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { api } from "../lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await api.contacts.create(formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 max-w-2xl mx-auto"
          >
            Whether you're looking to acquire a classic or simply want to learn more about our collection, our experts are here to assist you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-zinc-950 p-8 rounded-3xl border border-white/5">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-amber-500/10 p-3 rounded-2xl">
                  <Phone className="text-amber-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-serif font-bold">Call Us</h3>
                  <p className="text-zinc-500 text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-amber-500/10 p-3 rounded-2xl">
                  <Mail className="text-amber-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-serif font-bold">Email Us</h3>
                  <p className="text-zinc-500 text-sm">concierge@vintagegallery.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-amber-500/10 p-3 rounded-2xl">
                  <MapPin className="text-amber-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-serif font-bold">Visit Us</h3>
                  <p className="text-zinc-500 text-sm">123 Heritage Drive, London, UK</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-600 p-8 rounded-3xl text-white">
              <h3 className="text-xl font-serif font-bold mb-4">Showroom Hours</h3>
              <div className="space-y-2 text-sm opacity-90">
                <div className="flex justify-between">
                  <span>Mon - Fri</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>By Appointment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-950 p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6">
                    <CheckCircle className="text-emerald-500 w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-white mb-4">Message Received</h2>
                  <p className="text-zinc-500 mb-8">Thank you for your inquiry. Our concierge team will contact you within 24 hours.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-zinc-500 text-xs uppercase tracking-widest mb-2 font-bold">Full Name</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-500 text-xs uppercase tracking-widest mb-2 font-bold">Email Address</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-xs uppercase tracking-widest mb-2 font-bold">Subject</label>
                    <input
                      required
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="Inquiry about DB5"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-xs uppercase tracking-widest mb-2 font-bold">Your Message</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-4 bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-amber-600/20 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

