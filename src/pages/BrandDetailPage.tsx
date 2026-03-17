import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Search, SlidersHorizontal, Wrench, Calendar, Tag } from "lucide-react";
import { api } from "../lib/api";

// Mock data for brands if not in DB
const MOCK_CARS_BY_BRAND: Record<string, any[]> = {
  "ford": [
    {
      id: "mock-3",
      name: "Mustang V8 Coupe",
      brand: "Ford",
      year: 1965,
      image: "https://images.unsplash.com/photo-1584345604482-8135a2153c3b?auto=format&fit=crop&q=80&w=1000",
      price: "₹37,80,000",
      engine: "4.7L 289 V8",
      transmission: "Automatic",
      location: "United Kingdom",
    }
  ],
  "rolls-royce": [
    {
      id: "rr-1",
      name: "Silver Cloud II",
      brand: "Rolls Royce",
      year: 1960,
      image: "https://images.unsplash.com/photo-1631214503951-37510075f748?auto=format&fit=crop&q=80&w=1000",
      price: "₹89,25,000",
      engine: "6.2L V8",
      transmission: "Automatic",
      location: "London, UK",
    }
  ],
  "mercedes-benz": [
    {
      id: "mb-1",
      name: "300SL Gullwing",
      brand: "Mercedes Benz",
      year: 1955,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1000",
      price: "₹10,80,00,000",
      engine: "3.0L I6",
      transmission: "Manual",
      location: "Stuttgart, Germany",
    }
  ]
};

export default function BrandDetailPage() {
  const { brandName } = useParams();
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const formattedBrandName = brandName?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        // Try to fetch from API
        const allCars = await api.cars.getAll();
        const dbCars = allCars.filter((c: any) => c.brand === formattedBrandName);
        
        // Combine with mock data if needed
        const mockCars = MOCK_CARS_BY_BRAND[brandName || ""] || [];
        
        // Filter out duplicates if any (by name)
        const combined = [...dbCars];
        mockCars.forEach(mc => {
          if (!combined.find((c: any) => c.name === mc.name)) {
            combined.push(mc);
          }
        });

        setCars(combined);
      } catch (error) {
        console.error("Error fetching brand cars:", error);
        // Fallback to mock data on error
        setCars(MOCK_CARS_BY_BRAND[brandName || ""] || []);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [brandName, formattedBrandName]);

  return (
    <div className="bg-zinc-950 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <Link to="/brands" className="inline-flex items-center text-amber-500 mb-8 hover:text-amber-400 transition-colors">
          <ArrowLeft className="mr-2 w-5 h-5" /> Back to Brands
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight">{formattedBrandName}</h1>
            <p className="text-zinc-500 mt-4 max-w-xl">
              Discover our curated selection of classic {formattedBrandName} vehicles, each representing a unique chapter in automotive history.
            </p>
          </div>
          <div className="bg-zinc-900/50 border border-white/5 px-6 py-3 rounded-2xl">
            <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Collection Size</span>
            <div className="text-2xl font-bold text-white">{cars.length} Vehicles</div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[40vh]">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden hover:border-amber-500/30 transition-all"
              >
                <Link to={`/cars/${car.id}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                      <span className="text-xs text-white font-bold">{car.year}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">{car.name}</h3>
                    <div className="flex items-center justify-between text-zinc-500 text-sm mb-4">
                      <span>{car.engine}</span>
                      <span>{car.location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-xl font-bold text-white">{car.price}</span>
                      <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">View Details</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-zinc-900/20 rounded-3xl border border-dashed border-white/10">
            <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-zinc-500">No vehicles found in this collection</h2>
            <p className="text-zinc-600 mt-2">Check back soon as we frequently update our inventory.</p>
          </div>
        )}
      </div>
    </div>
  );
}
