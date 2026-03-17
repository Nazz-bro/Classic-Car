import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Car, ShieldAlert, ArrowLeft, Phone, Clock, Instagram, Facebook, Twitter } from "lucide-react";
import { api } from "./lib/api";
import HomePage from "./pages/HomePage";
import CarsPage from "./pages/CarsPage";
import CarDetailPage from "./pages/CarDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SellPage from "./pages/SellPage";
import FinancePage from "./pages/FinancePage";
import ServicesPage from "./pages/ServicesPage";
import LocationsPage from "./pages/LocationsPage";
import BrandsPage from "./pages/BrandsPage";
import BrandDetailPage from "./pages/BrandDetailPage";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<any, any> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 text-center">
          <div className="max-w-md bg-zinc-900 p-8 rounded-3xl border border-white/5">
            <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-white mb-4">Application Error</h2>
            <p className="text-zinc-400 mb-6">Something went wrong.</p>
            <button 
              onClick={() => window.location.href = "/"}
              className="px-8 py-3 bg-amber-600 text-white rounded-full font-bold uppercase tracking-widest text-xs"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start items-center space-x-2">
              <Car className="w-6 h-6 text-amber-500" />
              <span className="text-xl font-serif font-bold text-white tracking-widest uppercase">Vintage Gallery</span>
            </div>
            <p className="text-zinc-600 text-xs italic font-serif">Preserving the legacy of automotive excellence.</p>
            <p className="text-zinc-500 text-sm">© 2026 Vintage Car Gallery. All rights reserved.</p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center space-y-4 text-zinc-400 text-sm font-bold uppercase tracking-widest">
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-amber-500" />
              <span>+1 (555) VINTAGE</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Mon - Sat: 9:00 - 18:00</span>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-end space-y-6">
            <div className="flex items-center space-x-6">
              <a href="#" className="text-zinc-500 hover:text-amber-500 transition-all hover:scale-110"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-zinc-500 hover:text-amber-500 transition-all hover:scale-110"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-zinc-500 hover:text-amber-500 transition-all hover:scale-110"><Twitter className="w-5 h-5" /></a>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">Follow the Legacy</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md"
      >
        <h1 className="text-4xl font-serif font-bold text-white mb-4 uppercase tracking-widest">{title}</h1>
        <div className="h-1 w-20 bg-amber-500 mx-auto mb-8" />
        <p className="text-zinc-400 mb-8">This section is currently under development as we expand our digital showroom experience.</p>
        <Link to="/" className="inline-block px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-white transition-all">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(() => {
    const isFirstVisit = !sessionStorage.getItem('splashShown');
    return location.pathname === "/" && isFirstVisit;
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('splashShown', 'true');
  };

  const isHome = location.pathname === "/";

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col font-sans selection:bg-amber-500/30">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/cars/:id" element={<CarDetailPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/brands/:brandName" element={<BrandDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/locations" element={<LocationsPage />} />
          </Routes>
        </main>
        <Footer />

        {/* Global Back Button */}
        {!isHome && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => navigate(-1)}
            className="fixed top-24 left-8 z-[100] w-12 h-12 bg-zinc-900/90 backdrop-blur-xl border border-white/10 text-white rounded-full shadow-2xl hover:bg-amber-500 hover:text-black transition-all group flex items-center justify-center"
            title="Go Back"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </motion.button>
        )}
      </div>
    </ErrorBoundary>
  );
}


