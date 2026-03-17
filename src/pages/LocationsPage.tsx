import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  Car, 
  ExternalLink, 
  Navigation, 
  Calendar,
  CheckCircle2,
  User,
  MessageSquare,
  Globe,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { api } from "../lib/api";

const SHOWROOMS = [
  {
    id: "london",
    city: "London",
    name: "Mayfair Flagship",
    address: "12 Bruton Lane, Mayfair, London W1J 6QA",
    phone: "+44 20 7123 4567",
    email: "london@vintagegallery.com",
    hours: "Mon-Sat: 9:00 - 18:00",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&q=80&w=1000",
    mapUrl: "https://maps.google.com/?q=Mayfair+London",
    features: ["Private Viewing Suite", "On-site Restoration Workshop", "Concierge Service"]
  },
  {
    id: "new-york",
    city: "New York",
    name: "Manhattan Gallery",
    address: "450 Park Avenue, New York, NY 10022",
    phone: "+1 212 555 0199",
    email: "ny@vintagegallery.com",
    hours: "Mon-Fri: 10:00 - 19:00",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&q=80&w=1000",
    mapUrl: "https://maps.google.com/?q=Park+Avenue+New+York",
    features: ["Climate Controlled Storage", "Digital Auction Hub", "VIP Lounge"]
  },
  {
    id: "monaco",
    city: "Monaco",
    name: "Monte Carlo Atelier",
    address: "Place du Casino, 98000 Monaco",
    phone: "+377 98 06 20 00",
    email: "monaco@vintagegallery.com",
    hours: "Mon-Sat: 10:00 - 18:00",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=1000",
    mapUrl: "https://maps.google.com/?q=Place+du+Casino+Monaco",
    features: ["Race Heritage Collection", "Harbor-side Delivery", "Event Space"]
  },
  {
    id: "dubai",
    city: "Dubai",
    name: "Downtown Showroom",
    address: "Sheikh Mohammed bin Rashid Blvd, Dubai",
    phone: "+971 4 123 4567",
    email: "dubai@vintagegallery.com",
    hours: "Sun-Thu: 10:00 - 20:00",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000",
    mapUrl: "https://maps.google.com/?q=Downtown+Dubai",
    features: ["Desert Performance Lab", "24/7 Secure Access", "Luxury Transport"]
  }
];

export default function LocationsPage() {
  const [selectedShowroom, setSelectedShowroom] = useState(SHOWROOMS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredShowroom: SHOWROOMS[0].name,
    preferredDate: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await api.inquiries.create({
        carName: `Visit Request: ${formData.preferredShowroom}`,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.preferredShowroom,
        message: `SHOWROOM VISIT:\nPreferred Date: ${formData.preferredDate}\n\nMessage: ${formData.message}`,
        type: "General"
      });
      
      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error submitting visit request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-zinc-900 border border-amber-500/20 rounded-[3rem] p-12 text-center shadow-2xl"
        >
          <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-amber-500" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-white mb-6">Visit Requested</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-10">
            Thank you for your interest in visiting our {formData.preferredShowroom}. A concierge member will contact you shortly to finalize your private viewing appointment.
          </p>
          <button 
            onClick={() => setSubmitSuccess(false)}
            className="px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all"
          >
            Back to Showrooms
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-20"
            alt="Global Showrooms"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-zinc-950/50 to-zinc-950" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-amber-500 text-xs font-black uppercase tracking-[0.5em] mb-4 block">Global Presence</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tighter leading-none">
              Our <span className="italic text-amber-500">Showrooms</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-light tracking-widest uppercase max-w-2xl mx-auto">
              Experience our collection in person at our world-class galleries across the globe.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* Location Selector & Details */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Location List */}
            <div className="lg:col-span-4 space-y-4">
              {SHOWROOMS.map((showroom) => (
                <button
                  key={showroom.id}
                  onClick={() => setSelectedShowroom(showroom)}
                  className={`w-full text-left p-6 rounded-3xl border transition-all duration-500 flex items-center justify-between group ${
                    selectedShowroom.id === showroom.id 
                      ? "bg-amber-500 border-amber-500 text-black shadow-xl shadow-amber-500/20" 
                      : "bg-zinc-900 border-white/5 text-white hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selectedShowroom.id === showroom.id ? "text-black/60" : "text-amber-500"}`}>
                      {showroom.city}
                    </div>
                    <div className="text-xl font-serif font-bold">{showroom.name}</div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${selectedShowroom.id === showroom.id ? "translate-x-1" : "text-zinc-700 group-hover:text-white"}`} />
                </button>
              ))}
            </div>

            {/* Right: Active Location Detail */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedShowroom.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-zinc-900 rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="h-64 md:h-auto relative">
                      <img 
                        src={selectedShowroom.image} 
                        alt={selectedShowroom.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent md:hidden" />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-2 text-amber-500 mb-4">
                          <Globe className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">{selectedShowroom.city}</span>
                        </div>
                        <h2 className="text-4xl font-serif font-bold text-white mb-8">{selectedShowroom.name}</h2>
                        
                        <div className="space-y-6 mb-10">
                          <div className="flex items-start space-x-4">
                            <MapPin className="w-5 h-5 text-zinc-600 mt-1" />
                            <p className="text-zinc-400 text-sm leading-relaxed">{selectedShowroom.address}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Phone className="w-5 h-5 text-zinc-600" />
                            <p className="text-zinc-400 text-sm">{selectedShowroom.phone}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Mail className="w-5 h-5 text-zinc-600" />
                            <p className="text-zinc-400 text-sm">{selectedShowroom.email}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Clock className="w-5 h-5 text-zinc-600" />
                            <p className="text-zinc-400 text-sm">{selectedShowroom.hours}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-10">
                          {selectedShowroom.features.map((feature, idx) => (
                            <span key={idx} className="px-3 py-1 bg-zinc-950 border border-white/10 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <a 
                          href={selectedShowroom.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl flex items-center justify-center space-x-2 hover:bg-amber-500 transition-colors"
                        >
                          <Navigation className="w-4 h-4" />
                          <span>Get Directions</span>
                        </a>
                        <button 
                          onClick={() => {
                            setFormData(prev => ({ ...prev, preferredShowroom: selectedShowroom.name }));
                            const formElement = document.getElementById('visit-form');
                            formElement?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="flex-1 py-4 bg-zinc-800 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl flex items-center justify-center space-x-2 hover:bg-zinc-700 transition-colors"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Schedule Visit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Visit Request Form */}
        <section id="visit-form" className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-5xl font-serif font-bold text-white mb-8 leading-tight">
                Plan Your <span className="text-amber-500 italic">Private</span> Viewing
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                We offer exclusive, one-on-one viewing experiences at all our global locations. Let us know which showroom you'd like to visit and our concierge team will handle the rest.
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Curated Selection</h4>
                    <p className="text-zinc-500 text-sm">Request specific models to be ready for your arrival.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">VIP Experience</h4>
                    <p className="text-zinc-500 text-sm">Enjoy access to our private lounges and historical archives.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-zinc-900 rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
                        <input 
                          required
                          type="text"
                          name="fullName"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
                        <input 
                          required
                          type="email"
                          name="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Preferred Showroom</label>
                      <div className="relative">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
                        <select 
                          name="preferredShowroom"
                          value={formData.preferredShowroom}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
                        >
                          {SHOWROOMS.map(s => (
                            <option key={s.id} value={s.name}>{s.name} ({s.city})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
                        <input 
                          required
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Message / Specific Interests</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-6 top-6 text-zinc-600 w-4 h-4" />
                      <textarea 
                        name="message"
                        rows={4}
                        placeholder="Tell us about specific cars you'd like to see..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-5 bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-800 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all shadow-xl shadow-amber-600/20 flex items-center justify-center space-x-3"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Request Private Viewing</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
