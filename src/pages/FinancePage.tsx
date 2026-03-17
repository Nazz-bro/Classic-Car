import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calculator, 
  ShieldCheck, 
  Clock, 
  TrendingDown, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  DollarSign, 
  User, 
  Mail, 
  Phone, 
  Briefcase,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Percent,
  Calendar,
  Car,
  IndianRupee
} from "lucide-react";
import { api } from "../lib/api";

const FAQS = [
  {
    question: "Can I finance a car older than 25 years?",
    answer: "Absolutely. We specialize in classic car financing, which differs from traditional auto loans. Our partners understand the value of vintage vehicles and offer terms specifically designed for collector cars of any age."
  },
  {
    question: "What is the minimum down payment required?",
    answer: "Typically, our lenders require a minimum of 10-20% down payment. However, this can vary based on your credit profile and the specific vehicle being financed."
  },
  {
    question: "How long are the loan terms?",
    answer: "We offer flexible terms ranging from 36 months up to 120 months for high-value collector vehicles, allowing you to manage your monthly cash flow effectively."
  },
  {
    question: "Is there a penalty for early repayment?",
    answer: "Most of our financing partners offer simple interest loans with no prepayment penalties, allowing you to pay off your loan early and save on interest."
  }
];

export default function FinancePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Calculator State
  const [vehiclePrice, setVehiclePrice] = useState(5000000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [interestRate, setInterestRate] = useState(5.9);
  const [loanTerm, setLoanTerm] = useState(60);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    employmentStatus: "Employed",
    annualIncome: "",
    desiredLoanAmount: "",
    interestedVehicle: ""
  });

  useEffect(() => {
    const principal = vehiclePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;

    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
    } else {
      const x = Math.pow(1 + monthlyRate, numberOfPayments);
      const monthly = (principal * x * monthlyRate) / (x - 1);
      setMonthlyPayment(monthly);
    }
  }, [vehiclePrice, downPayment, interestRate, loanTerm]);

  useEffect(() => {
    const total = monthlyPayment * loanTerm;
    const interest = total - (vehiclePrice - downPayment);
    setTotalInterest(interest);
    setTotalCost(vehiclePrice + interest);
  }, [monthlyPayment, loanTerm, vehiclePrice, downPayment]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await api.inquiries.create({
        carName: formData.interestedVehicle || "General Finance Inquiry",
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: "N/A",
        message: `FINANCE APPLICATION:\nEmployment: ${formData.employmentStatus}\nAnnual Income: ${formData.annualIncome}\nDesired Loan: ${formData.desiredLoanAmount}\n\nCalculator Settings used:\nPrice: ${vehiclePrice}\nDown: ${downPayment}\nRate: ${interestRate}%\nTerm: ${loanTerm}mo`,
        type: "Finance"
      });
      
      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error submitting finance request:", error);
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
          <h1 className="text-4xl font-serif font-bold text-white mb-6">Application Submitted</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-10">
            Your financing application has been received. Our financial specialists will review your details and contact you within one business day to discuss your options.
          </p>
          <button 
            onClick={() => setSubmitSuccess(false)}
            className="px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all"
          >
            Back to Finance Page
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-20"
            alt="Financing"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-zinc-950/50 to-zinc-950" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-amber-500 text-xs font-black uppercase tracking-[0.5em] mb-4 block">Tailored Financial Solutions</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tighter leading-none">
              Drive Your <span className="italic text-amber-500">Dream</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-light tracking-widest uppercase max-w-2xl mx-auto">
              Competitive rates and flexible terms designed specifically for the collector car market.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* Key Benefits */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/50 p-10 rounded-3xl border border-white/5 text-center">
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mx-auto mb-6">
                <TrendingDown className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Competitive Rates</h3>
              <p className="text-zinc-500 leading-relaxed">Industry-leading interest rates starting as low as 5.49% for qualified buyers.</p>
            </div>
            <div className="bg-zinc-900/50 p-10 rounded-3xl border border-white/5 text-center">
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mx-auto mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Extended Terms</h3>
              <p className="text-zinc-500 leading-relaxed">Flexible repayment options up to 120 months to fit your monthly budget.</p>
            </div>
            <div className="bg-zinc-900/50 p-10 rounded-3xl border border-white/5 text-center">
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Specialist Expertise</h3>
              <p className="text-zinc-500 leading-relaxed">Our partners understand the appreciating nature of classic automobiles.</p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="mb-32">
          <div className="bg-zinc-900 rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Calculator Inputs */}
              <div className="p-8 md:p-12 lg:p-16 bg-zinc-900">
                <div className="flex items-center space-x-4 mb-10">
                  <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-white">Payment Calculator</h2>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Vehicle Price</label>
                      <span className="text-white font-bold">₹{vehiclePrice.toLocaleString('en-IN')}</span>
                    </div>
                    <input 
                      type="range" 
                      min="500000" 
                      max="100000000" 
                      step="100000"
                      value={vehiclePrice}
                      onChange={(e) => setVehiclePrice(parseInt(e.target.value))}
                      className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Down Payment</label>
                      <span className="text-white font-bold">₹{downPayment.toLocaleString('en-IN')}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max={vehiclePrice * 0.9} 
                      step="1000"
                      value={downPayment}
                      onChange={(e) => setDownPayment(parseInt(e.target.value))}
                      className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Interest Rate</label>
                        <span className="text-white font-bold">{interestRate}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="15" 
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Loan Term</label>
                        <span className="text-white font-bold">{loanTerm} mo</span>
                      </div>
                      <select 
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                        className="w-full bg-zinc-800 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                      >
                        <option value={36}>36 Months</option>
                        <option value={48}>48 Months</option>
                        <option value={60}>60 Months</option>
                        <option value={72}>72 Months</option>
                        <option value={84}>84 Months</option>
                        <option value={120}>120 Months</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculator Results */}
              <div className="p-8 md:p-12 lg:p-16 bg-zinc-800/50 flex flex-col justify-center">
                <div className="space-y-10">
                  <div className="text-center lg:text-left">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Estimated Monthly Payment</span>
                    <div className="text-7xl font-black text-white tracking-tighter">
                      <span className="text-amber-500 text-4xl mr-1">₹</span>
                      {Math.round(monthlyPayment).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5">
                    <div>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Total Interest</span>
                      <span className="text-xl font-bold text-white">₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Total Cost</span>
                      <span className="text-xl font-bold text-white">₹{Math.round(totalCost).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500 italic leading-relaxed">
                    * This calculator is for illustrative purposes only. Actual rates and terms will be determined upon credit approval.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Application Form */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-900 rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl">
              <h2 className="text-3xl font-serif font-bold text-white mb-8">Quick Application</h2>
              
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
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Employment Status</label>
                    <div className="relative">
                      <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
                      <select 
                        name="employmentStatus"
                        value={formData.employmentStatus}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
                      >
                        <option value="Employed">Employed</option>
                        <option value="Self-Employed">Self-Employed</option>
                        <option value="Retired">Retired</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Annual Income (Est.)</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
                      <input 
                        required
                        type="text"
                        name="annualIncome"
                        placeholder="e.g. ₹12,00,000"
                        value={formData.annualIncome}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Desired Loan Amount</label>
                    <div className="relative">
                      <TrendingDown className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
                      <input 
                        required
                        type="text"
                        name="desiredLoanAmount"
                        placeholder="e.g. ₹40,00,000"
                        value={formData.desiredLoanAmount}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Vehicle of Interest (Optional)</label>
                  <div className="relative">
                    <Car className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
                    <input 
                      type="text"
                      name="interestedVehicle"
                      placeholder="e.g. 1965 Ford Mustang"
                      value={formData.interestedVehicle}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-8">
                  <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/10 mb-8 flex items-start space-x-4">
                    <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Your information is encrypted and secure. By clicking submit, you authorize Vintage Gallery and its partners to perform a soft credit inquiry which will not affect your credit score.
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
                        <span>Submit Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right: FAQ & Partners */}
          <div className="lg:col-span-5 space-y-12">
            {/* FAQ Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-serif font-bold text-white flex items-center">
                <HelpCircle className="w-6 h-6 mr-3 text-amber-500" />
                Financing FAQ
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

            {/* Partner Logos (Mock) */}
            <div className="p-10 bg-zinc-900/50 rounded-[2.5rem] border border-white/5">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8 text-center">Our Financing Partners</h3>
              <div className="grid grid-cols-2 gap-8 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="h-12 bg-zinc-800 rounded-lg flex items-center justify-center font-serif font-bold text-white">CHASE</div>
                <div className="h-12 bg-zinc-800 rounded-lg flex items-center justify-center font-serif font-bold text-white">ALLY</div>
                <div className="h-12 bg-zinc-800 rounded-lg flex items-center justify-center font-serif font-bold text-white">WELLS FARGO</div>
                <div className="h-12 bg-zinc-800 rounded-lg flex items-center justify-center font-serif font-bold text-white">CAPITAL ONE</div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-amber-500/10 rounded-[2.5rem] p-10 border border-amber-500/20">
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Need Assistance?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Our finance team is available to walk you through the application process and answer any specific questions about international financing.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-white font-bold">
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span>+1 (555) FINANCE</span>
                </div>
                <div className="flex items-center space-x-3 text-white font-bold">
                  <Mail className="w-4 h-4 text-amber-500" />
                  <span>finance@vintagegallery.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
