import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Settings, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Droplets,
  Zap,
  Warehouse,
  Award
} from "lucide-react";
import { api } from "../lib/api";

const SERVICES = [
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Mechanical Restoration",
    description: "Full engine rebuilds, transmission overhauls, and period-correct performance upgrades performed by master technicians.",
    features: ["Engine Rebuilds", "Gearbox Overhauls", "Suspension Tuning", "Brake Systems"]
  },
  {
    icon: <Droplets className="w-8 h-8" />,
    title: "Concours Detailing",
    description: "Museum-grade paint correction, leather rejuvenation, and preservation treatments to keep your investment in pristine condition.",
    features: ["Paint Correction", "Ceramic Coating", "Interior Restoration", "Engine Bay Cleaning"]
  },
  {
    icon: <Warehouse className="w-8 h-8" />,
    title: "Secure Storage",
    description: "Climate-controlled, high-security facilities with routine battery maintenance, tire rotation, and fluid checks.",
    features: ["Climate Control", "24/7 Security", "Maintenance Cycles", "Collection Management"]
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Electrical Systems",
    description: "Specialized repair and modernization of vintage wiring looms, ignition systems, and period-correct lighting.",
    features: ["Wiring Looms", "Ignition Tuning", "Lighting Upgrades", "Gauge Calibration"]
  }
];

const FAQS = [
  {
    question: "Do you use original manufacturer parts?",
    answer: "Whenever possible, we source New Old Stock (NOS) or high-quality OEM parts. For rare components that are no longer available, we work with specialized fabricators to create period-correct reproductions."
  },
  {
    question: "Can you handle full frame-off restorations?",
    answer: "Yes, we have the facilities and expertise to manage complete frame-off restorations, coordinating every aspect from metalwork and paint to mechanical and upholstery."
  },
  {
    question: "Do you provide pick-up and delivery services?",
    answer: "We offer enclosed transport services for all our clients. Whether your vehicle is coming in for a simple service or a multi-year restoration, we ensure it arrives safely and securely."
  },
  {
    question: "What is your typical lead time for service?",
    answer: "Routine maintenance can usually be scheduled within 1-2 weeks. Major restoration projects are subject to current workshop capacity and parts availability; we recommend a consultation to discuss your specific timeline."
  }
];

export default function ServicesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    vehicle: "",
    serviceType: "Maintenance",
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
        carName: formData.vehicle || "General Service Request",
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: "N/A",
        message: `SERVICE BOOKING:\nService Type: ${formData.serviceType}\nPreferred Date: ${formData.preferredDate}\n\nRequirements: ${formData.message}`,
        type: "Service"
      });
      
      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error submitting service request:", error);
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
          <h1 className="text-4xl font-serif font-bold text-white mb-6">Booking Confirmed</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-10">
            Your service inquiry has been received. A service advisor will contact you within 24 hours to confirm your appointment and discuss any specific requirements for your vehicle.
          </p>
          <button 
            onClick={() => setSubmitSuccess(false)}
            className="px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all"
          >
            Book Another Service
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
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-20"
            alt="Service Workshop"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-zinc-950/50 to-zinc-950" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-amber-500 text-xs font-black uppercase tracking-[0.5em] mb-4 block">Master Craftsmanship</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tighter leading-none">
              Preserving <span className="italic text-amber-500">Perfection</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-light tracking-widest uppercase max-w-2xl mx-auto">
              World-class maintenance and restoration services for the most discerning collectors.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* Service Cards */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 p-10 rounded-[3rem] border border-white/5 hover:border-amber-500/20 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="w-20 h-20 bg-amber-500/10 rounded-[2rem] flex items-center justify-center text-amber-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-zinc-500 leading-relaxed mb-6">{service.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {service.features.map((feature, fIdx) => (
                        <span key={fIdx} className="px-4 py-1.5 bg-zinc-950 border border-white/10 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats / Trust Section */}
        <section className="mb-32 py-20 border-y border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">25+</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">12</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Master Techs</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">500+</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Restorations</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">100%</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Authenticity</div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-900 rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl">
              <h2 className="text-3xl font-serif font-bold text-white mb-8">Service Booking</h2>
              
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
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Service Type</label>
                    <div className="relative">
                      <Wrench className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
                      <select 
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
                      >
                        <option value="Maintenance">Routine Maintenance</option>
                        <option value="Restoration">Mechanical Restoration</option>
                        <option value="Detailing">Concours Detailing</option>
                        <option value="Storage">Secure Storage</option>
                        <option value="Electrical">Electrical Systems</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Vehicle (Year/Make/Model)</label>
                    <input 
                      required
                      type="text"
                      name="vehicle"
                      placeholder="e.g. 1967 Jaguar E-Type"
                      value={formData.vehicle}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
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
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Specific Requirements or Issues</label>
                  <textarea 
                    required
                    name="message"
                    rows={4}
                    placeholder="Please describe the work required or any issues you've noticed..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                  />
                </div>

                <div className="pt-8">
                  <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/10 mb-8 flex items-start space-x-4">
                    <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Your vehicle is fully insured while in our care. We use only period-correct components and museum-grade preservation materials.
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
                        <span>Request Appointment</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right: FAQ & Info */}
          <div className="lg:col-span-5 space-y-12">
            {/* FAQ Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-serif font-bold text-white flex items-center">
                <HelpCircle className="w-6 h-6 mr-3 text-amber-500" />
                Service FAQ
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

            {/* Accreditations */}
            <div className="p-10 bg-zinc-900/50 rounded-[2.5rem] border border-white/5">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8 text-center">Certified Excellence</h3>
              <div className="grid grid-cols-2 gap-8 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="flex flex-col items-center text-center">
                  <Award className="w-10 h-10 text-white mb-2" />
                  <span className="text-[8px] font-bold text-white uppercase tracking-widest">Master Guild</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <ShieldCheck className="w-10 h-10 text-white mb-2" />
                  <span className="text-[8px] font-bold text-white uppercase tracking-widest">Heritage Certified</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Settings className="w-10 h-10 text-white mb-2" />
                  <span className="text-[8px] font-bold text-white uppercase tracking-widest">OEM Specialist</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <CheckCircle2 className="w-10 h-10 text-white mb-2" />
                  <span className="text-[8px] font-bold text-white uppercase tracking-widest">Concours Judge</span>
                </div>
              </div>
            </div>

            {/* Workshop Location */}
            <div className="bg-amber-500/10 rounded-[2.5rem] p-10 border border-amber-500/20">
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Our Workshop</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Visit our state-of-the-art restoration facility in Mayfair. We welcome collectors to view ongoing projects by appointment.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-white font-bold">
                  <Warehouse className="w-4 h-4 text-amber-500" />
                  <span>12 Bruton Lane, Mayfair, London</span>
                </div>
                <div className="flex items-center space-x-3 text-white font-bold">
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span>+44 20 7123 4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
