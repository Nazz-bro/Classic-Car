import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Search, Filter, Calendar, Tag, Heart, MessageSquare, Camera, ArrowRight, ChevronDown, SlidersHorizontal, LayoutGrid, List, X, Wrench, IndianRupee, Plus } from "lucide-react";
import { api } from "../lib/api";

interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  description: string;
  image: string;
  price?: string;
  numericPrice?: number;
  location?: string;
  engine?: string;
  mileage?: string;
  numericMileage?: number;
  transmission?: string;
  bids?: number;
  timeLeft?: string;
  isSpotlight?: boolean;
  countryCode?: string;
  bodyStyle?: string;
  condition?: "Pristine" | "Excellent" | "Restored" | "Original";
}

const BODY_STYLES = ["All", "Coupe", "Convertible", "Sedan", "Roadster", "Hatchback"];
const ERAS = ["All", "Pre-War (Before 1945)", "Post-War (1945-1970)", "Modern Classic (1970-1995)"];
const SORT_OPTIONS = [
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Year: Newest First", value: "year_desc" },
  { label: "Year: Oldest First", value: "year_asc" },
];

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedBodyStyle, setSelectedBodyStyle] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedEra, setSelectedEra] = useState("All");
  const [selectedCarForQuickView, setSelectedCarForQuickView] = useState<Car | null>(null);
  const [compareList, setCompareList] = useState<Car[]>([]);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await api.cars.getAll();
        if (carsData.length === 0) {
          const mockCars: Car[] = [
            {
              id: "mock-1",
              name: "Manta Ray Beach Buggy",
              brand: "Volkswagen",
              year: 1970,
              image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=1000",
              description: "A classic beach buggy with a unique design. This Manta Ray features a professionally built 1300cc engine and a reinforced chassis, making it as reliable as it is fun.",
              price: "₹5,25,000",
              numericPrice: 525000,
              location: "Market Drayton, UK",
              engine: "1300cc Air-cooled Flat-4",
              mileage: "4,378 miles",
              numericMileage: 4378,
              transmission: "4-Speed Manual",
              bids: 16,
              timeLeft: "5h 10m 51s",
              countryCode: "🇬🇧",
              bodyStyle: "Roadster",
              condition: "Excellent"
            },
            {
              id: "mock-2",
              name: "Delta GT ie 1600",
              brand: "Lancia",
              year: 1989,
              image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1000",
              description: "An iconic Italian hatchback. This Delta GT ie is a remarkably original example, recently imported from Italy and showing minimal wear for its age.",
              price: "₹2,34,000",
              numericPrice: 234000,
              location: "Turin, Italy",
              engine: "1585cc Twin-Cam i.e.",
              mileage: "213,124 km",
              numericMileage: 213124,
              transmission: "5-Speed Manual",
              bids: 4,
              timeLeft: "1d 3h 00m",
              countryCode: "🇮🇹",
              bodyStyle: "Hatchback",
              condition: "Restored"
            },
            {
              id: "mock-3",
              name: "Mustang V8 Coupe",
              brand: "Ford",
              year: 1965,
              image: "https://images.unsplash.com/photo-1584345604482-8135a2153c3b?auto=format&fit=crop&q=80&w=1000",
              description: "The quintessential American muscle car. This 'A-code' Mustang features the desirable 289 V8 and is finished in stunning Wimbledon White over a Red Pony interior.",
              price: "₹37,80,000",
              numericPrice: 3780000,
              location: "London, UK",
              engine: "4.7L 289ci V8",
              mileage: "47,020 miles",
              numericMileage: 47020,
              transmission: "3-Speed Automatic",
              bids: 0,
              timeLeft: "7d 12h",
              isSpotlight: true,
              countryCode: "🇬🇧",
              bodyStyle: "Coupe",
              condition: "Pristine"
            },
            {
              id: "mock-4",
              name: "Singer Nine Le Mans Sports",
              brand: "Singer",
              year: 1934,
              image: "https://images.unsplash.com/photo-1527247043589-98e6ac08f56c?auto=format&fit=crop&q=80&w=1000",
              description: "A rare pre-war sports car with significant racing pedigree. This Le Mans Sports model has been part of a private collection in Germany for the last two decades.",
              price: "₹44,82,000",
              numericPrice: 4482000,
              location: "Munich, Germany",
              engine: "972cc Overhead Cam",
              mileage: "9,999 km",
              numericMileage: 9999,
              transmission: "4-Speed Manual",
              bids: 0,
              timeLeft: "14d 2h",
              isSpotlight: true,
              countryCode: "🇩🇪",
              bodyStyle: "Roadster",
              condition: "Original"
            },
            {
              id: "mock-5",
              name: "911 Carrera RS",
              brand: "Porsche",
              year: 1973,
              image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000",
              description: "The ultimate classic 911. This Carrera RS 2.7 is one of the most sought-after collector cars in the world, featuring the iconic 'ducktail' spoiler and Fuchs wheels.",
              price: "₹2,20,50,000",
              numericPrice: 22050000,
              location: "Stuttgart, Germany",
              engine: "2.7L Flat-6 Air-cooled",
              mileage: "52,000 km",
              numericMileage: 52000,
              transmission: "5-Speed Manual",
              bids: 12,
              timeLeft: "2d 5h",
              countryCode: "🇩🇪",
              bodyStyle: "Coupe",
              condition: "Pristine"
            },
            {
              id: "mock-6",
              name: "E-Type Series 1",
              brand: "Jaguar",
              year: 1961,
              image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&q=80&w=1000",
              description: "Enzo Ferrari called it 'the most beautiful car ever made.' This Series 1 3.8-litre Roadster is a matching-numbers example in its original color of Opalescent Silver Blue.",
              price: "₹89,25,000",
              numericPrice: 8925000,
              location: "London, UK",
              engine: "3.8L Straight-6",
              mileage: "38,500 miles",
              numericMileage: 38500,
              transmission: "4-Speed Manual",
              bids: 8,
              timeLeft: "12h 45m",
              countryCode: "🇬🇧",
              bodyStyle: "Convertible",
              condition: "Excellent"
            }
          ];
          setAllCars(mockCars);
        } else {
          const processedCars = carsData.map((data: any) => {
            const priceNum = data.price ? parseInt(data.price.replace(/[^0-9]/g, "")) : Math.floor(Math.random() * 100000);
            return {
              ...data,
              numericPrice: priceNum,
              price: data.price || `₹${priceNum.toLocaleString('en-IN')}`,
              location: data.location || "Europe",
              engine: data.engine || "2.0L",
              mileage: data.mileage || "50,000 km",
              numericMileage: data.mileage ? parseInt(data.mileage.replace(/[^0-9]/g, "")) : 50000,
              transmission: data.transmission || "Manual",
              bids: data.bids || 0,
              timeLeft: data.timeLeft || "3d",
              countryCode: data.countryCode || "🇪🇺",
              bodyStyle: data.bodyStyle || "Coupe",
              condition: data.condition || "Excellent"
            };
          });
          setAllCars(processedCars);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const brands = useMemo(() => ["All", ...new Set(allCars.map(car => car.brand))], [allCars]);

  const filteredAndSortedCars = useMemo(() => {
    let result = allCars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            car.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand === "All" || car.brand === selectedBrand;
      const matchesBody = selectedBodyStyle === "All" || car.bodyStyle === selectedBodyStyle;
      const matchesPrice = (car.numericPrice || 0) >= priceRange[0] && (car.numericPrice || 0) <= priceRange[1];
      
      let matchesEra = true;
      if (selectedEra === "Pre-War (Before 1945)") matchesEra = car.year < 1945;
      else if (selectedEra === "Post-War (1945-1970)") matchesEra = car.year >= 1945 && car.year <= 1970;
      else if (selectedEra === "Modern Classic (1970-1995)") matchesEra = car.year > 1970 && car.year <= 1995;

      return matchesSearch && matchesBrand && matchesBody && matchesPrice && matchesEra;
    });

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "price_asc": return (a.numericPrice || 0) - (b.numericPrice || 0);
        case "price_desc": return (b.numericPrice || 0) - (a.numericPrice || 0);
        case "year_desc": return b.year - a.year;
        case "year_asc": return a.year - b.year;
        case "newest": default: return 0; // In a real app, sort by createdAt
      }
    });

    return result;
  }, [allCars, searchTerm, selectedBrand, selectedBodyStyle, priceRange, sortBy]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Header */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-30"
            alt="Inventory Header"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-zinc-950/50 to-zinc-950" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="text-amber-500 text-xs font-black uppercase tracking-[0.5em] mb-4 block">The Collection</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tighter leading-none">
              Automotive <span className="italic text-amber-500">Excellence</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-light tracking-widest uppercase max-w-2xl mx-auto">
              A curated selection of the world's most significant classic and collector vehicles.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-white/10"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white leading-none">150+</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Vehicles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white leading-none">24</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white leading-none">₹350Cr+</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Sold in 2025</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* Featured Section */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-white">Featured <span className="text-amber-500">Spotlight</span></h2>
            <div className="h-px flex-grow mx-8 bg-white/10 hidden md:block" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {allCars.filter(c => c.isSpotlight).slice(0, 2).map((car, idx) => (
              <motion.div 
                key={car.id}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group rounded-[2rem] overflow-hidden aspect-[16/9] lg:aspect-auto lg:h-[400px]"
              >
                <img src={car.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={car.name} referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-3 py-1 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full">Spotlight</span>
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{car.brand}</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-4">{car.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase">Year</span>
                        <span className="text-white font-bold">{car.year}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase">Price</span>
                        <span className="text-white font-bold">{car.price}</span>
                      </div>
                    </div>
                    <Link to={`/cars/${car.id}`} className="p-4 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-amber-500 hover:text-black transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 bg-zinc-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm shadow-2xl">
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <button 
              onClick={() => setIsFilterSidebarOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-zinc-800 rounded-xl text-white hover:bg-zinc-700 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Filters</span>
            </button>
            <div className="relative flex-grow lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search inventory..."
                className="w-full bg-zinc-950 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sort By:</span>
              <select
                className="bg-transparent text-white text-xs font-bold uppercase tracking-wider focus:outline-none cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value} className="bg-zinc-900">{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-zinc-950 p-1 rounded-lg border border-white/10">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-amber-500 text-black" : "text-zinc-500 hover:text-white"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-amber-500 text-black" : "text-zinc-500 hover:text-white"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 space-y-8 h-fit">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 flex items-center">
                <Tag className="w-3 h-3 mr-2 text-amber-500" />
                Make / Brand
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {brands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`block w-full text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${selectedBrand === brand ? "bg-amber-500/10 text-amber-500 font-bold" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 flex items-center">
                <Calendar className="w-3 h-3 mr-2 text-amber-500" />
                Era
              </h3>
              <div className="space-y-2">
                {ERAS.map(era => (
                  <button
                    key={era}
                    onClick={() => setSelectedEra(era)}
                    className={`block w-full text-left text-xs py-1.5 px-3 rounded-lg transition-colors ${selectedEra === era ? "bg-amber-500/10 text-amber-500 font-bold" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    {era}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 flex items-center">
                <Filter className="w-3 h-3 mr-2 text-amber-500" />
                Body Style
              </h3>
              <div className="space-y-2">
                {BODY_STYLES.map(style => (
                  <button
                    key={style}
                    onClick={() => setSelectedBodyStyle(style)}
                    className={`block w-full text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${selectedBodyStyle === style ? "bg-amber-500/10 text-amber-500 font-bold" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 flex items-center">
                <IndianRupee className="w-3 h-3 mr-2 text-amber-500" />
                Price Range
              </h3>
              <div className="space-y-4 px-2">
                <input 
                  type="range" 
                  min="0" 
                  max="50000000" 
                  step="100000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                  <span>₹0</span>
                  <span>Up to ₹{priceRange[1].toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <button 
                onClick={() => {
                  setSelectedBrand("All");
                  setSelectedBodyStyle("All");
                  setPriceRange([0, 100000000]);
                  setSearchTerm("");
                }}
                className="text-[10px] font-bold text-zinc-500 hover:text-amber-500 uppercase tracking-widest transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                Showing <span className="text-white">{filteredAndSortedCars.length}</span> results
              </p>
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "space-y-6"}>
              <AnimatePresence mode="popLayout">
                {filteredAndSortedCars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={`group bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden hover:border-amber-500/30 transition-all duration-500 ${viewMode === "list" ? "flex flex-col md:flex-row h-auto md:h-64" : ""}`}
                  >
                    <Link to={`/cars/${car.id}`} className={viewMode === "list" ? "flex flex-col md:flex-row w-full" : "block"}>
                      {/* Image */}
                      <div className={`relative overflow-hidden ${viewMode === "list" ? "w-full md:w-80 h-64 md:h-full" : "aspect-[16/10]"}`}>
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-2 border border-white/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">{car.timeLeft}</span>
                          </div>
                          {car.isSpotlight && (
                            <div className="bg-amber-500 px-3 py-1 rounded-full text-[10px] font-black text-black uppercase tracking-wider">
                              Spotlight
                            </div>
                          )}
                        </div>

                        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                          <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-white">
                            <span className="text-xs">{car.countryCode}</span>
                          </div>
                          <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                            <span className="text-[10px] text-white font-bold uppercase tracking-wider">{car.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className={`p-6 flex flex-col justify-between ${viewMode === "list" ? "flex-grow" : ""}`}>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">{car.brand}</span>
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{car.year}</span>
                          </div>
                          <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">
                            {car.name}
                          </h3>
                          <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 mb-4">
                            {car.description}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-t border-white/5 pt-4">
                            <div className="flex items-center space-x-2">
                              <Wrench className="w-3 h-3 text-zinc-600" />
                              <span className="text-[10px] text-zinc-400 font-bold uppercase">{car.engine}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-3 h-3 text-zinc-600" />
                              <span className="text-[10px] text-zinc-400 font-bold uppercase">{car.transmission}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <SlidersHorizontal className="w-3 h-3 text-zinc-600" />
                              <span className="text-[10px] text-zinc-400 font-bold uppercase">{car.mileage}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Tag className="w-3 h-3 text-zinc-600" />
                              <span className="text-[10px] text-zinc-400 font-bold uppercase">{car.condition}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white leading-none mb-1">{car.price}</span>
                            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                              {car.bids ? `${car.bids} Active Bids` : "Asking Price"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                if (compareList.find(c => c.id === car.id)) {
                                  setCompareList(compareList.filter(c => c.id !== car.id));
                                } else if (compareList.length < 3) {
                                  setCompareList([...compareList, car]);
                                }
                              }}
                              className={`p-2.5 rounded-xl transition-all ${compareList.find(c => c.id === car.id) ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400 hover:text-amber-500 hover:bg-zinc-700"}`}
                              title="Compare"
                            >
                              <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedCarForQuickView(car);
                              }}
                              className="px-5 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl group-hover:bg-amber-500 transition-colors"
                            >
                              Quick View
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredAndSortedCars.length === 0 && (
              <div className="text-center py-32 bg-zinc-900/20 rounded-3xl border border-dashed border-white/10">
                <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No matches found</h3>
                <p className="text-zinc-500 mb-8">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => {
                    setSelectedBrand("All");
                    setSelectedBodyStyle("All");
                    setSelectedEra("All");
                    setPriceRange([0, 100000000]);
                    setSearchTerm("");
                  }}
                  className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-amber-500 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Floating Bar */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] w-full max-w-xl px-4"
          >
            <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-3">
                  {compareList.map(car => (
                    <div key={car.id} className="w-10 h-10 rounded-full border-2 border-zinc-900 overflow-hidden bg-zinc-800">
                      <img src={car.image} className="w-full h-full object-cover" alt={car.name} referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{compareList.length} Cars Selected</div>
                  <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Compare up to 3 models</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setCompareList([])}
                  className="text-zinc-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  Clear
                </button>
                <button 
                  onClick={() => setIsCompareDrawerOpen(true)}
                  className="px-6 py-2.5 bg-amber-500 text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-colors"
                >
                  Compare Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedCarForQuickView && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCarForQuickView(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedCarForQuickView(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-amber-500 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={selectedCarForQuickView.image} 
                  alt={selectedCarForQuickView.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-[10px]">{selectedCarForQuickView.brand}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">{selectedCarForQuickView.year}</span>
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-white mb-6 leading-tight">{selectedCarForQuickView.name}</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8 italic">
                    {selectedCarForQuickView.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block">Engine</span>
                      <span className="text-white text-sm font-medium">{selectedCarForQuickView.engine}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block">Mileage</span>
                      <span className="text-white text-sm font-medium">{selectedCarForQuickView.mileage}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block">Transmission</span>
                      <span className="text-white text-sm font-medium">{selectedCarForQuickView.transmission}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block">Condition</span>
                      <span className="text-white text-sm font-medium">{selectedCarForQuickView.condition}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Asking Price</span>
                    <span className="text-3xl font-bold text-white">{selectedCarForQuickView.price}</span>
                  </div>
                  <Link 
                    to={`/cars/${selectedCarForQuickView.id}`}
                    className="px-8 py-4 bg-amber-500 text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-amber-400 transition-colors"
                  >
                    Full Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Comparison Drawer */}
      <AnimatePresence>
        {isCompareDrawerOpen && (
          <div className="fixed inset-0 z-[110] flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCompareDrawerOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl bg-zinc-950 rounded-t-[3rem] border-t border-white/10 p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-white mb-2">Compare Collection</h2>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">Side-by-side technical evaluation</p>
                </div>
                <button onClick={() => setIsCompareDrawerOpen(false)} className="p-3 bg-zinc-900 text-white rounded-full hover:bg-amber-500 hover:text-black transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="overflow-x-auto custom-scrollbar pb-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="p-4 border-b border-white/10 min-w-[200px]"></th>
                      {compareList.map(car => (
                        <th key={car.id} className="p-4 border-b border-white/10 min-w-[250px]">
                          <div className="relative group">
                            <button 
                              onClick={() => setCompareList(compareList.filter(c => c.id !== car.id))}
                              className="absolute -top-2 -right-2 p-1 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <img src={car.image} className="w-full h-32 object-cover rounded-xl mb-4" alt={car.name} referrerPolicy="no-referrer" />
                            <h3 className="text-lg font-serif font-bold text-white">{car.name}</h3>
                          </div>
                        </th>
                      ))}
                      {compareList.length < 3 && (
                        <th className="p-4 border-b border-white/10 min-w-[250px]">
                          <div className="h-48 border-2 border-dashed border-white/5 rounded-xl flex flex-col items-center justify-center text-zinc-700">
                            <Plus className="w-6 h-6 mb-2" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Add to compare</span>
                          </div>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="p-4 border-b border-white/5 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Price</td>
                      {compareList.map(car => (
                        <td key={car.id} className="p-4 border-b border-white/5 text-white font-bold">{car.price}</td>
                      ))}
                      {compareList.length < 3 && <td className="p-4 border-b border-white/5"></td>}
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-white/5 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Year</td>
                      {compareList.map(car => (
                        <td key={car.id} className="p-4 border-b border-white/5 text-white">{car.year}</td>
                      ))}
                      {compareList.length < 3 && <td className="p-4 border-b border-white/5"></td>}
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-white/5 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Engine</td>
                      {compareList.map(car => (
                        <td key={car.id} className="p-4 border-b border-white/5 text-white">{car.engine}</td>
                      ))}
                      {compareList.length < 3 && <td className="p-4 border-b border-white/5"></td>}
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-white/5 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Mileage</td>
                      {compareList.map(car => (
                        <td key={car.id} className="p-4 border-b border-white/5 text-white">{car.mileage}</td>
                      ))}
                      {compareList.length < 3 && <td className="p-4 border-b border-white/5"></td>}
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-white/5 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Transmission</td>
                      {compareList.map(car => (
                        <td key={car.id} className="p-4 border-b border-white/5 text-white">{car.transmission}</td>
                      ))}
                      {compareList.length < 3 && <td className="p-4 border-b border-white/5"></td>}
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-white/5 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Condition</td>
                      {compareList.map(car => (
                        <td key={car.id} className="p-4 border-b border-white/5">
                          <span className="px-2 py-1 bg-zinc-800 rounded text-[10px] font-bold text-amber-500 uppercase">{car.condition}</span>
                        </td>
                      ))}
                      {compareList.length < 3 && <td className="p-4 border-b border-white/5"></td>}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Filter Sidebar Overlay */}
      <AnimatePresence>
        {isFilterSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-zinc-950 z-[70] lg:hidden p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-serif font-bold text-white">Filters</h2>
                <button onClick={() => setIsFilterSidebarOpen(false)} className="p-2 text-zinc-500 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Filter Content (Same as desktop sidebar) */}
              <div className="space-y-10">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4">Era</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {ERAS.map(era => (
                      <button
                        key={era}
                        onClick={() => setSelectedEra(era)}
                        className={`text-[10px] py-2 px-3 rounded-lg text-center transition-colors ${selectedEra === era ? "bg-amber-500 text-black font-bold" : "bg-zinc-900 text-zinc-500"}`}
                      >
                        {era}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4">Make / Brand</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {brands.map(brand => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`text-xs py-2 px-3 rounded-lg text-center transition-colors ${selectedBrand === brand ? "bg-amber-500 text-black font-bold" : "bg-zinc-900 text-zinc-500"}`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4">Body Style</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {BODY_STYLES.map(style => (
                      <button
                        key={style}
                        onClick={() => setSelectedBodyStyle(style)}
                        className={`text-xs py-2 px-3 rounded-lg text-center transition-colors ${selectedBodyStyle === style ? "bg-amber-500 text-black font-bold" : "bg-zinc-900 text-zinc-500"}`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4">Price Range</h3>
                  <input 
                    type="range" 
                    min="0" 
                    max="50000000" 
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-amber-500 mb-4"
                  />
                  <div className="text-center text-sm font-bold text-amber-500 uppercase tracking-widest">
                    Up to ₹{priceRange[1].toLocaleString('en-IN')}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedBrand("All");
                    setSelectedBodyStyle("All");
                    setSelectedEra("All");
                    setPriceRange([0, 100000000]);
                    setSearchTerm("");
                    setIsFilterSidebarOpen(false);
                  }}
                  className="w-full py-4 border border-white/10 text-zinc-500 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

