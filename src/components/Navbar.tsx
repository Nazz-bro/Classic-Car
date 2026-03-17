import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Tag, 
  ClipboardList, 
  Wrench, 
  MapPin, 
  Car, 
  X, 
  Menu 
} from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/cars", label: "Inventory" },
    { to: "/brands", label: "Brands" },
    { to: "/sell", label: "Sell/Trade" },
    { to: "/finance", label: "Finance" },
    { to: "/services", label: "Service" },
    { to: "/locations", label: "Locations" },
  ];

  return (
    <header className="relative z-50">
      {/* Main Navbar */}
      <nav className="bg-zinc-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <Link to="/" className="group">
                <Car className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" />
              </Link>
              <Link to="/" className="flex flex-col group">
                <span className="text-xl font-serif font-bold text-white tracking-wider uppercase leading-none group-hover:text-amber-500 transition-colors">Vintage Cars</span>
                <span className="text-[10px] text-zinc-500 font-bold tracking-[0.3em] uppercase">Est. 1970</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4 lg:space-x-8 items-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center space-x-1 lg:space-x-2 text-[10px] lg:text-sm font-bold uppercase tracking-widest"
                >
                  <span className="hidden lg:inline">{link.label}</span>
                  <span className="lg:hidden">{link.label.split(' ')[0]}</span>
                </Link>
              ))}
              <div className="flex items-center ml-2 lg:ml-4">
                <Link to="/contact" className="px-4 lg:px-8 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-all shadow-lg shadow-amber-600/20">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-zinc-950 border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.to}
                    to={link.to} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-4 text-zinc-400 hover:text-amber-500 transition-colors py-2 text-lg font-bold uppercase tracking-widest border-b border-white/5"
                  >
                    <span>{link.label}</span>
                  </Link>
                ))}
                <div className="pt-4">
                  <Link 
                    to="/contact" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-4 bg-amber-600 text-white text-center rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg shadow-amber-600/20"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
