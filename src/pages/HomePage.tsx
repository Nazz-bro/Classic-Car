import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, ShieldCheck, History, Calendar, Tag, Heart, MapPin, Camera, MessageSquare } from "lucide-react";
import { api } from "../lib/api";

interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  image: string;
  description: string;
  price?: string;
  location?: string;
  engine?: string;
  mileage?: string;
  transmission?: string;
  bids?: number;
  timeLeft?: string;
  isSpotlight?: boolean;
  countryCode?: string;
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070",
  "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&q=80&w=2070",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2070",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070"
];

export default function HomePage() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const cars = await api.cars.getAll();
        if (!cars || cars.length === 0) {
          // Provide mock data if DB is empty so the user can see the implementation
          const mockCars: Car[] = [
            {
              id: "mock-1",
              name: "Manta Ray Beach Buggy",
              brand: "Volkswagen",
              year: 1970,
              image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=1000",
              description: "A classic beach buggy with a unique design. This Manta Ray features a professionally built 1300cc engine and a reinforced chassis, making it as reliable as it is fun.",
              price: "₹5,25,000",
              location: "Market Drayton, UK",
              engine: "1300cc Air-cooled Flat-4",
              mileage: "4,378 miles",
              transmission: "4-Speed Manual",
              bids: 16,
              timeLeft: "5h 10m 51s",
              countryCode: "🇬🇧"
            },
            {
              id: "mock-2",
              name: "Delta GT ie 1600",
              brand: "Lancia",
              year: 1989,
              image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1000",
              description: "An iconic Italian hatchback. This Delta GT ie is a remarkably original example, recently imported from Italy and showing minimal wear for its age.",
              price: "₹2,34,000",
              location: "Turin, Italy",
              engine: "1585cc Twin-Cam i.e.",
              mileage: "213,124 km",
              transmission: "5-Speed Manual",
              bids: 4,
              timeLeft: "1d 3h 00m",
              countryCode: "🇮🇹"
            },
            {
              id: "mock-3",
              name: "Mustang V8 Coupe",
              brand: "Ford",
              year: 1965,
              image: "https://images.unsplash.com/photo-1584345604482-8135a2153c3b?auto=format&fit=crop&q=80&w=1000",
              description: "The quintessential American muscle car. This 'A-code' Mustang features the desirable 289 V8 and is finished in stunning Wimbledon White over a Red Pony interior.",
              price: "₹37,80,000",
              location: "London, UK",
              engine: "4.7L 289ci V8",
              mileage: "47,020 miles",
              transmission: "3-Speed Automatic",
              bids: 0,
              timeLeft: "7d 12h",
              isSpotlight: true,
              countryCode: "🇬🇧"
            },
            {
              id: "mock-4",
              name: "Singer Nine Le Mans Sports",
              brand: "Singer",
              year: 1934,
              image: "https://images.unsplash.com/photo-1527247043589-98e6ac08f56c?auto=format&fit=crop&q=80&w=1000",
              description: "A rare pre-war sports car with significant racing pedigree. This Le Mans Sports model has been part of a private collection in Germany for the last two decades.",
              price: "₹44,82,000",
              location: "Munich, Germany",
              engine: "972cc Overhead Cam",
              mileage: "9,999 km",
              transmission: "4-Speed Manual",
              bids: 0,
              timeLeft: "14d 2h",
              isSpotlight: true,
              countryCode: "🇩🇪"
            }
          ];
          setFeaturedCars(mockCars);
        } else {
          const carsData = cars.slice(0, 4).map((car: any) => {
            return {
              ...car,
              price: car.price || `₹${(Math.random() * 5000000 + 200000).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
              location: car.location || ["Market Drayton", "Province of Turin", "United Kingdom", "Germany"][Math.floor(Math.random() * 4)],
              engine: car.engine || "1300cc",
              mileage: car.mileage || `${Math.floor(Math.random() * 100000)} miles`,
              transmission: car.transmission || "Manual",
              bids: car.bids || Math.floor(Math.random() * 20),
              timeLeft: car.timeLeft || `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
              isSpotlight: car.isSpotlight || Math.random() > 0.7,
              countryCode: car.countryCode || ["🇬🇧", "🇮🇹", "🇬🇧", "🇩🇪"][Math.floor(Math.random() * 4)]
            };
          }) as Car[];
          setFeaturedCars(carsData);
        }
      } catch (error) {
        console.error("Error fetching featured cars:", error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-zinc-950">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={HERO_IMAGES[currentImageIndex]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              alt="Vintage Car Background"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-zinc-950"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tighter">
              Timeless <span className="text-amber-500">Vintage</span> Cars
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-10 font-light tracking-wide max-w-2xl mx-auto">
              Experience the elegance, power, and history of the world's most iconic classic automobiles.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/cars"
                className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-semibold transition-all flex items-center group"
              >
                Explore Collection
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold backdrop-blur-sm transition-all"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentImageIndex ? "bg-amber-500 w-8" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Marketplace Section - Styled like the uploaded image */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Live Auctions & Marketplace</h2>
          <Link to="/cars" className="text-amber-500 hover:text-amber-400 font-medium flex items-center">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link to={`/cars/${car.id}`}>
                {/* Image Container */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 mb-4">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Top Overlays */}
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-full flex items-center space-x-1 border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-white">{car.timeLeft}</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-3 right-3">
                    <button className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:text-amber-500 transition-colors border border-white/10">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Overlays */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                    <span className="text-xs">{car.countryCode}</span>
                    <span className="text-[10px] text-white/90 font-medium">{car.location}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                    <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-white/90">
                      <MessageSquare className="w-3 h-3" />
                      <span className="text-[10px] font-bold">{car.bids}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-white/90">
                      <Camera className="w-3 h-3" />
                      <span className="text-[10px] font-bold">1</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white leading-tight group-hover:text-amber-500 transition-colors">
                    {car.year} {car.brand} {car.name}
                  </h3>
                  <p className="text-zinc-500 text-[11px] font-medium">
                    {car.engine} • Petrol • {car.mileage} • {car.transmission} • 4 speed • RHD
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xl font-bold text-white">{car.price}</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                        {car.bids ? `${car.bids} Bids` : "Asking price"}
                      </span>
                    </div>
                    {car.isSpotlight && (
                      <div className="bg-zinc-800/50 px-2 py-0.5 rounded text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-white/5">
                        Spotlight
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              whileHover={{ y: -10 }}
              className="p-8 bg-zinc-950 border border-white/5 rounded-2xl text-center"
            >
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-4">Curated Excellence</h3>
              <p className="text-zinc-400">Every vehicle in our gallery is hand-selected for its historical significance and pristine condition.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="p-8 bg-zinc-950 border border-white/5 rounded-2xl text-center"
            >
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-4">Authentic Heritage</h3>
              <p className="text-zinc-400">We verify the provenance and specifications of every classic car to ensure absolute authenticity.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="p-8 bg-zinc-950 border border-white/5 rounded-2xl text-center"
            >
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <History className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-4">Living History</h3>
              <p className="text-zinc-400">More than just machines, these cars represent the evolution of design and engineering through the ages.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

