import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Car, 
  Camera, 
  ClipboardList, 
  IndianRupee, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  Upload, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { api } from "../lib/api";

const STEPS = [
  {
    icon: <ClipboardList className="w-6 h-6" />,
    title: "Tell us about your car",
    description: "Provide basic details like make, model, year, and condition through our simple online form."
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Upload high-quality photos",
    description: "Submit clear photos of the exterior, interior, and engine bay to help us assess the value."
  },
  {
    icon: <IndianRupee className="w-6 h-6" />,
    title: "Receive a valuation",
    description: "Our specialists will review your submission and provide a competitive market valuation within 48 hours."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Secure transaction",
    description: "Once agreed, we handle all paperwork and logistics for a seamless, secure handover."
  }
];

const FAQS = [
  {
    question: "What types of cars do you buy?",
    answer: "We specialize in vintage, classic, and collector vehicles. While we focus on European and American classics from the 1950s to the 1990s, we are always interested in unique, rare, or historically significant automobiles of any era."
  },
  {
    question: "How do you determine the valuation?",
    answer: "Our valuations are based on current market trends, historical auction data, rarity, condition, and provenance. We use a combination of expert knowledge and real-time market analytics to ensure you receive a fair and competitive offer."
  },
  {
    question: "Do I need to bring the car to you?",
    answer: "Initially, no. We can provide a preliminary valuation based on your digital submission. If we proceed, we can arrange for an on-site inspection or coordinate transport to one of our showrooms."
  },
  {
    question: "How long does the process take?",
    answer: "Typically, you'll receive an initial response within 24-48 hours. The entire process from first contact to payment can be completed in as little as 7-10 days depending on the complexity of the transaction."
  }
];

export default function SellPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    condition: "Excellent",
    vin: "",
    description: "",
    fullName: "",
    email: "",
    phone: "",
    location: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Using the inquiries endpoint with type 'Sell'
      await api.inquiries.create({
        carName: `${formData.year} ${formData.make} ${formData.model}`,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.location,
        message: `SELL REQUEST:\nMileage: ${formData.mileage}\nCondition: ${formData.condition}\nVIN: ${formData.vin}\n\nDescription: ${formData.description}`,
        type: "Sell"
      });
      
      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error submitting sell request:", error);
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
          <h1 className="text-4xl font-serif font-bold text-white mb-6">Submission Received</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-10">
            Thank you for trusting Vintage Gallery with your vehicle. Our acquisition specialists have received your details and will review them shortly. You can expect a response within 48 hours.
          </p>
          <button 
            onClick={() => setSubmitSuccess(false)}
            className="px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all"
          >
            Submit Another Vehicle
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
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-30"
            alt="Sell Your Car"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-zinc-950/50 to-zinc-950" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-amber-500 text-xs font-black uppercase tracking-[0.5em] mb-4 block">Consignment & Acquisition</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tighter leading-none">
              Sell Your <span className="italic text-amber-500">Legacy</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-light tracking-widest uppercase max-w-2xl mx-auto">
              We provide a discreet, professional, and global platform for the world's finest automobiles.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* How It Works */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 hover:border-amber-500/20 transition-colors group"
              >
                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-4">{step.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Form */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-900 rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl">
              <h2 className="text-3xl font-serif font-bold text-white mb-8">Vehicle Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Vehicle Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Make / Brand</label>
                    <input 
                      required
                      type="text"
                      name="make"
                      placeholder="e.g. Porsche"
                      value={formData.make}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Model</label>
                    <input 
                      required
                      type="text"
                      name="model"
                      placeholder="e.g. 911 Carrera RS"
                      value={formData.model}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Year</label>
                    <input 
                      required
                      type="number"
                      name="year"
                      placeholder="e.g. 1973"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Mileage</label>
                    <input 
                      required
                      type="text"
                      name="mileage"
                      placeholder="e.g. 45,000 miles"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Condition</label>
                    <select 
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
                    >
                      <option value="Pristine">Pristine (Museum Quality)</option>
                      <option value="Excellent">Excellent (Show Quality)</option>
                      <option value="Good">Good (Driver Quality)</option>
                      <option value="Fair">Fair (Restoration Project)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">VIN (Optional)</label>
                    <input 
                      type="text"
                      name="vin"
                      placeholder="Vehicle Identification Number"
                      value={formData.vin}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Vehicle Description & History</label>
                  <textarea 
                    required
                    name="description"
                    rows={4}
                    placeholder="Tell us about the history, modifications, and any notable features..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                  />
                </div>

                <div className="pt-8 border-t border-white/5">
                  <h2 className="text-3xl font-serif font-bold text-white mb-8">Contact Information</h2>
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
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
                        <input 
                          required
                          type="tel"
                          name="phone"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
                        <input 
                          required
                          type="text"
                          name="location"
                          placeholder="City, Country"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/10 mb-8 flex items-start space-x-4">
                    <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      By submitting this form, you agree to our terms of service. We will use your information solely for the purpose of evaluating your vehicle and contacting you regarding an offer.
                    </p>
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
                        <span>Submit Valuation Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Info & FAQ */}
          <div className="lg:col-span-5 space-y-12">
            {/* Why Sell To Us */}
            <div className="space-y-8">
              <h2 className="text-3xl font-serif font-bold text-white">Why Sell to <span className="text-amber-500">Vintage Gallery</span>?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Global Network</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">Access to a worldwide network of high-net-worth collectors and enthusiasts.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Expert Marketing</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">Professional photography, cinematic videography, and targeted editorial features.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Seamless Logistics</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">We handle everything from international shipping to complex title transfers.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-serif font-bold text-white flex items-center">
                <HelpCircle className="w-6 h-6 mr-3 text-amber-500" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div 
                    key={idx}
                    className="bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden"
                  >
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <span className="text-white font-bold text-sm">{faq.question}</span>
                      {openFaq === idx ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6"
                        >
                          <p className="text-zinc-500 text-sm leading-relaxed border-t border-white/5 pt-4">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Car className="w-32 h-32" />
              </div>
              <p className="text-lg font-serif italic mb-8 relative z-10">
                "The team at Vintage Gallery handled the sale of my 1967 E-Type with absolute professionalism. The valuation was spot on, and the global reach of their platform ensured it went to a true enthusiast."
              </p>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full" />
                <div>
                  <h4 className="font-bold">Robert Sterling</h4>
                  <p className="text-white/60 text-xs uppercase tracking-widest">Collector, London</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
