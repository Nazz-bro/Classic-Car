import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Globe, Zap, Settings, History, Calendar, ChevronLeft, ChevronRight, Camera, Gavel, MessageSquare, Heart, CheckCircle2, Info, Star, Tag, Car, X, Send, Phone, User, MapPin } from "lucide-react";
import { api } from "../lib/api";

interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  description: string;
  image: string;
  gallery?: string[];
  specs: {
    engine: string;
    origin: string;
    transmission: string;
    topSpeed: string;
  };
  highlights?: string[];
  history: string;
  paperwork?: string;
  price?: string;
  bids?: number;
  timeLeft?: string;
  location?: string;
  reserveMet?: boolean;
  endingTime?: string;
  commentsCount?: number;
  savedCount?: number;
}

const MOCK_CARS: Record<string, any> = {
  "mock-1": {
    name: "Manta Ray Beach Buggy",
    brand: "Volkswagen",
    year: 1970,
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=1000",
    description: "A classic beach buggy with a unique design. This Manta Ray features a professionally built 1300cc engine and a reinforced chassis, making it as reliable as it is fun. Perfect for coastal cruising and vintage enthusiasts who want a car that stands out.",
    price: "₹5,25,000",
    bids: 16,
    timeLeft: "5h 10m 51s",
    location: "Market Drayton, UK",
    engine: "1300cc Air-cooled Flat-4",
    transmission: "4-Speed Manual",
    mileage: "4,378 miles",
    condition: "Excellent",
    origin: "Germany",
    topSpeed: "85 mph",
    history: "This Manta Ray has been meticulously maintained by a single family for over 30 years. It recently underwent a light mechanical restoration to ensure it's ready for the road. The car has spent most of its life in a dry garage, preserving its fiberglass body and chassis.",
    highlights: [
      "Professionally built 1300cc air-cooled engine",
      "Reinforced off-road chassis",
      "Period-correct bucket seats",
      "Custom chrome exhaust system",
      "Full weather equipment included"
    ],
    paperwork: "The car comes with a comprehensive history file, including original build photos, maintenance invoices from the last three decades, and a valid technical inspection certificate."
  },
  "mock-2": {
    name: "Delta GT ie 1600",
    brand: "Lancia",
    year: 1989,
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1000",
    description: "An iconic Italian hatchback with a sporty soul. The Delta GT ie offers a perfect blend of 80s style and driving dynamics. This particular example is remarkably original, showing minimal wear for its age and mileage.",
    price: "₹2,34,000",
    bids: 4,
    timeLeft: "1d 3h 00m",
    location: "Turin, Italy",
    engine: "1585cc Twin-Cam i.e.",
    transmission: "5-Speed Manual",
    mileage: "213,124 km",
    condition: "Restored",
    origin: "Italy",
    topSpeed: "125 mph",
    history: "Imported from Italy in 2022, this Delta has seen significant investment in its bodywork and interior. It remains a very usable and charming example of Lancia's engineering, having been serviced regularly by Italian car specialists.",
    highlights: [
      "Fuel-injected 1.6L twin-cam engine",
      "Original Alcantara interior in great condition",
      "Factory-fitted alloy wheels",
      "Recent major service including timing belt",
      "Italian heritage and styling"
    ],
    paperwork: "Complete with Italian registration documents, a folder of recent service receipts, and the original Lancia owner's manual."
  },
  "mock-3": {
    name: "Mustang V8 Coupe",
    brand: "Ford",
    year: 1965,
    image: "https://images.unsplash.com/photo-1584345604482-8135a2153c3b?auto=format&fit=crop&q=80&w=1000",
    description: "The quintessential American muscle car. Finished in classic Wimbledon White with a red interior, this 'A-code' Mustang features the desirable 289 V8 and offers a truly authentic 60s driving experience.",
    price: "₹37,80,000",
    bids: 0,
    timeLeft: "7d 12h",
    location: "London, UK",
    engine: "4.7L 289ci V8",
    transmission: "3-Speed Automatic",
    mileage: "47,020 miles",
    condition: "Pristine",
    origin: "USA",
    topSpeed: "120 mph",
    history: "A highly original 'A-code' Mustang that has spent most of its life in a climate-controlled garage. It was imported to the UK in 2015 and has been used sparingly for shows and weekend drives since then.",
    highlights: [
      "Desirable 'A-code' 289 cubic inch V8",
      "Factory Red Pony interior",
      "Original Wimbledon White paintwork",
      "Power steering and power brakes",
      "Period-correct AM radio"
    ],
    paperwork: "Includes the original US title, UK V5C, a Marti Report confirming its factory specifications, and a collection of show trophies."
  },
  "mock-5": {
    name: "911 Carrera RS",
    brand: "Porsche",
    year: 1973,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000",
    description: "The ultimate classic 911. This Carrera RS 2.7 is one of the most sought-after collector cars in the world. Built to meet racing homologation requirements, it's a pure, lightweight driving machine.",
    price: "₹2,20,50,000",
    bids: 12,
    timeLeft: "2d 5h",
    location: "Stuttgart, Germany",
    engine: "2.7L Flat-6 Air-cooled",
    transmission: "5-Speed Manual",
    mileage: "52,000 km",
    condition: "Pristine",
    origin: "Germany",
    topSpeed: "150 mph",
    history: "This RS has a documented history from new, including participation in several prestigious European rallies in the late 70s. It underwent a total nut-and-bolt restoration by Porsche Classic in 2018.",
    highlights: [
      "Authentic Carrera RS 2.7 Lightweight",
      "Iconic 'ducktail' rear spoiler",
      "Matching numbers engine and gearbox",
      "Restored to concours standards",
      "Fuchs forged alloy wheels"
    ],
    paperwork: "Accompanied by a Porsche Certificate of Authenticity, a detailed restoration book with hundreds of photos, and a full FIA historic passport."
  },
  "mock-6": {
    name: "E-Type Series 1",
    brand: "Jaguar",
    year: 1961,
    image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&q=80&w=1000",
    description: "Enzo Ferrari called it 'the most beautiful car ever made.' This early Series 1 3.8-litre Roadster is a stunning example of British automotive art, offering a level of elegance that is simply unmatched.",
    price: "₹89,25,000",
    bids: 8,
    timeLeft: "12h 45m",
    location: "London, UK",
    engine: "3.8L Straight-6",
    transmission: "4-Speed Manual",
    mileage: "38,500 miles",
    condition: "Excellent",
    origin: "UK",
    topSpeed: "150 mph",
    history: "Delivered new to New York in 1961, this E-Type returned to the UK in the 90s. It has been maintained by renowned Jaguar specialists and has won several club-level awards for its condition and originality.",
    highlights: [
      "Early 'flat floor' Series 1 Roadster",
      "3.8-litre triple-carburetted engine",
      "Opalescent Silver Blue over Dark Blue leather",
      "Chrome wire wheels with knock-off hubs",
      "Original tool kit and jack"
    ],
    paperwork: "Includes a Jaguar Heritage Trust Certificate, a comprehensive file of service records spanning 40 years, and original sales literature."
  },
  "rr-1": {
    name: "Silver Cloud II",
    brand: "Rolls Royce",
    year: 1960,
    image: "https://images.unsplash.com/photo-1631214503951-37510075f748?auto=format&fit=crop&q=80&w=1000",
    description: "A masterpiece of British engineering and luxury. The Silver Cloud II introduced the legendary V8 engine to the Rolls-Royce lineup, providing a level of silent power that set a new global standard.",
    price: "₹89,25,000",
    bids: 2,
    timeLeft: "3d 8h",
    location: "London, UK",
    engine: "6.2L V8",
    transmission: "4-Speed Automatic",
    mileage: "62,000 miles",
    condition: "Excellent",
    origin: "UK",
    topSpeed: "115 mph",
    history: "Originally owned by a prominent British industrialist, this Silver Cloud II has been part of a significant private collection for the last 15 years. It has been maintained regardless of cost and remains in superb mechanical order.",
    highlights: [
      "Smooth 6.2-litre V8 engine",
      "Exquisite Connolly leather interior",
      "Polished walnut picnic tables",
      "Power-assisted steering",
      "Original radio with modern internals"
    ],
    paperwork: "The car comes with its original build sheets from the Crewe factory, a complete service history, and a recent appraisal report."
  }
};

export default function CarDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [relatedCars, setRelatedCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dealerInfo, setDealerInfo] = useState({
    name: "Vintage Classics Ltd.",
    phone: "+1 (555) 123-4567",
    email: "concierge@vintageclassics.com",
    location: "Mayfair, London, UK"
  });

  // Inquiry Modal State
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCertifiedModalOpen, setIsCertifiedModalOpen] = useState(false);
  const [isInquiriesListModalOpen, setIsInquiriesListModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    message: "Interested in this car"
  });

  const handleInquiryClick = (type: string) => {
    setInquiryType(type);
    setIsInquiryModalOpen(true);
    setSubmitSuccess(false);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;

    setIsSubmitting(true);
    try {
      await api.inquiries.create({
        carId: car.id,
        carName: car.name,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        message: formData.message,
        type: inquiryType
      });
      setSubmitSuccess(true);
      
      // Increment inquiry count locally
      setCar(prev => prev ? { ...prev, commentsCount: (prev.commentsCount || 0) + 1 } : null);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        message: "Interested in this car"
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    setCar(prev => {
      if (!prev) return null;
      return {
        ...prev,
        savedCount: isSaved ? (prev.savedCount || 1) - 1 : (prev.savedCount || 0) + 1
      };
    });
  };

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      try {
        let data: any = null;
        try {
          data = await api.cars.getById(id);
        } catch (e) {
          if (MOCK_CARS[id]) {
            data = MOCK_CARS[id];
          }
        }

        if (data) {
          const gallery = data.gallery || [
            data.image,
            "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1542362567-b055002b91f4?auto=format&fit=crop&q=80&w=1000"
          ];
          
          const carData = { 
            id: id, 
            ...data,
            gallery,
            specs: data.specs || {
              engine: data.engine || "N/A",
              origin: data.origin || "N/A",
              transmission: data.transmission || "N/A",
              topSpeed: data.topSpeed || "N/A"
            },
            price: data.price || "₹2,34,000",
            bids: data.bids || 4,
            timeLeft: data.timeLeft || "1d 2h 32m",
            location: data.location || "Italy",
            reserveMet: data.reserveMet ?? false,
            endingTime: data.endingTime || "13 March, 23:35",
            commentsCount: data.commentsCount || 0,
            savedCount: data.savedCount || 29,
            highlights: data.highlights || [
              "Original matching numbers engine",
              "Comprehensive service history from new",
              "Recent professional detailing and ceramic coating",
              "Rare factory color combination",
              "Fully functional period-correct electronics"
            ],
            paperwork: data.paperwork || "The car comes with a thick file of invoices dating back to the late 1980s, original owner's manual, and a stamped service book. It has a valid registration and recent technical inspection certificate."
          } as Car;
          
          setCar(carData);

          // Get related cars (same brand or similar era)
          const related = Object.entries(MOCK_CARS)
            .filter(([key, c]) => key !== id && (c.brand === data.brand || Math.abs(c.year - data.year) < 10))
            .slice(0, 3)
            .map(([key, c]) => ({ id: key, ...c }));
          setRelatedCars(related);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchDealer = async () => {
      try {
        const dealerData = await api.dealer.getInfo();
        if (dealerData) {
          setDealerInfo(dealerData);
        }
      } catch (error) {
        console.error("Error fetching dealer info:", error);
      }
    };

    fetchCar();
    fetchDealer();
  }, [id]);

  const nextImage = () => {
    if (car?.gallery) {
      setCurrentImageIndex((prev) => (prev + 1) % car.gallery!.length);
    }
  };

  const prevImage = () => {
    if (car?.gallery) {
      setCurrentImageIndex((prev) => (prev - 1 + car.gallery!.length) % car.gallery!.length);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] bg-zinc-950">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl font-serif mb-4">Car Not Found</h1>
        <Link to="/cars" className="text-amber-500 hover:underline flex items-center">
          <ArrowLeft className="mr-2 w-5 h-5" /> Back to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen pb-24 font-sans text-zinc-100">
      {/* Top Navigation Bar */}
      <div className="bg-zinc-900/50 backdrop-blur-md py-4 px-6 sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/cars" className="flex items-center text-zinc-400 hover:text-gold transition-colors text-sm font-medium">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Collection
          </Link>
          <div className="flex items-center space-x-2">
            <span className="text-gold text-xs uppercase tracking-widest font-bold">{car.brand}</span>
            <span className="text-white font-serif font-bold">{car.name}</span>
          </div>
          <div className="w-20"></div> {/* Spacer */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Image Slider */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-[16/10] bg-zinc-900 rounded-3xl overflow-hidden group shadow-2xl border border-white/5">
              <img
                src={car.gallery?.[currentImageIndex] || car.image}
                alt={car.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Navigation Arrows */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/60 backdrop-blur-md text-white rounded-xl flex items-center space-x-2 text-sm font-bold">
                <Camera className="w-4 h-4" />
                <span>{car.gallery?.length || 1}</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex space-x-4 overflow-x-auto pb-2 custom-scrollbar">
              {car.gallery?.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-24 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-gold scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Bidding Card */}
          <div className="lg:col-span-4">
            <div className="bg-zinc-900 rounded-[2rem] p-8 shadow-2xl border border-white/5 sticky top-24">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-zinc-500 text-xs font-black uppercase tracking-widest">Estimated Value</span>
                    <span className="px-3 py-1 bg-zinc-800 text-gold text-[10px] font-bold rounded-full border border-gold/20">
                      {car.reserveMet ? 'Reserve Met' : 'Reserve Not Met'}
                    </span>
                  </div>
                  <div className="text-5xl font-black text-white tracking-tight">{car.price}</div>
                </div>

                <div className="flex items-center space-x-3 text-zinc-400 font-medium">
                  <div className="w-3 h-3 bg-gold rounded-full animate-pulse"></div>
                  <span>{car.timeLeft}</span>
                  <span className="text-zinc-700">•</span>
                  <span className="text-sm">Ending {car.endingTime}</span>
                </div>

                <div className="pt-4 space-y-3">
                  <button 
                    onClick={() => handleInquiryClick("Price Request")}
                    className="w-full py-4 bg-gold hover:bg-gold-light text-zinc-950 rounded-2xl font-black text-lg transition-all shadow-lg shadow-gold/20 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    REQUEST PRICE
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => handleInquiryClick("Contact Dealer")}
                      className="py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-gold border border-gold/30 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Phone size={16} />
                      CONTACT
                    </button>
                    <button 
                      onClick={() => handleInquiryClick("Test Drive")}
                      className="py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-gold border border-gold/30 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Calendar size={16} />
                      TEST DRIVE
                    </button>
                  </div>

                  <button 
                    onClick={() => handleInquiryClick("General Inquiry")}
                    className="w-full py-3 bg-transparent hover:bg-gold/10 text-gold border border-gold/50 rounded-xl font-bold transition-all"
                  >
                    SEND INQUIRY
                  </button>
                </div>

                <div className="bg-zinc-800/30 rounded-2xl p-6 border border-white/5">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-zinc-800 rounded-xl shadow-sm">
                      <Info className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{dealerInfo.name}</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        Our specialists at {dealerInfo.location} are available to assist with your inquiry. <span className="text-gold font-bold cursor-pointer hover:underline">Learn more</span>
                      </p>
                      <div className="mt-2 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                          <Phone size={10} className="text-gold" />
                          <span>{dealerInfo.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                          <Globe size={10} className="text-gold" />
                          <span>{dealerInfo.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div 
                    onClick={() => setIsCertifiedModalOpen(true)}
                    className="flex items-center space-x-2 text-zinc-500 hover:text-gold cursor-pointer transition-colors"
                  >
                    <Star className="w-4 h-4" />
                    <span className="text-xs font-bold underline">Certified Classic</span>
                  </div>
                  <div 
                    onClick={() => setIsInquiriesListModalOpen(true)}
                    className="flex items-center space-x-2 text-zinc-500 hover:text-gold cursor-pointer transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs font-bold underline">{car.commentsCount} Inquiries</span>
                  </div>
                  <div 
                    onClick={toggleSave}
                    className={`flex items-center space-x-2 transition-colors cursor-pointer ${isSaved ? 'text-amber-500' : 'text-zinc-500 hover:text-gold'}`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                    <span className="text-xs font-bold underline">{car.savedCount} Saved</span>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-3 pt-4">
                  <span className="text-white font-bold underline">Excellent</span>
                  <div className="flex space-x-0.5">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-5 h-5 bg-[#00B67A] flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-1 text-white font-bold">
                    <Star className="w-4 h-4 fill-white" />
                    <span>Trustpilot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-16">
            {/* Description Section */}
            <section>
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-zinc-900 rounded-2xl shadow-sm border border-white/5">
                  <Info className="w-6 h-6 text-gold" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-white">The Story</h2>
              </div>
              <div className="bg-zinc-900/50 rounded-3xl p-8 border border-white/5">
                <p className="text-zinc-400 leading-relaxed text-lg">
                  {car.description}
                </p>
              </div>
            </section>

            {/* Highlights */}
            <section>
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-zinc-900 rounded-2xl shadow-sm border border-white/5">
                  <Zap className="w-6 h-6 text-gold" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-white">Highlights</h2>
              </div>
              <div className="bg-zinc-900/50 rounded-3xl p-8 border border-white/5">
                <ul className="space-y-4">
                  {car.highlights?.map((h, i) => (
                    <li key={i} className="flex items-start space-x-4">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0"></div>
                      <span className="text-zinc-300 leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* History and Paperwork */}
            <section>
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-zinc-900 rounded-2xl shadow-sm border border-white/5">
                  <History className="w-6 h-6 text-gold" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-white">History and Paperwork</h2>
              </div>
              <div className="bg-zinc-900/50 rounded-3xl p-8 border border-white/5 space-y-6">
                <p className="text-zinc-400 leading-relaxed">
                  {car.history}
                </p>
                <div className="p-6 bg-zinc-800/50 rounded-2xl border border-white/5 italic text-zinc-500 text-sm">
                  {car.paperwork}
                </div>
              </div>
            </section>

            {/* Gallery Grid */}
            <section>
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-zinc-900 rounded-2xl shadow-sm border border-white/5">
                  <Camera className="w-6 h-6 text-gold" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-white">Full Gallery</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {car.gallery?.map((img, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm cursor-pointer border border-white/5"
                    onClick={() => setCurrentImageIndex(i)}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Gallery ${i}`} referrerPolicy="no-referrer" />
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Specs (Repurposed) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-white/5">
              <h3 className="text-xl font-serif font-bold text-white mb-8 border-b border-white/5 pb-4 tracking-widest uppercase">Technical Specifications</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-zinc-800 p-2 rounded-lg">
                    <Tag className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-bold">Brand</p>
                    <p className="text-white font-bold">{car.brand}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-zinc-800 p-2 rounded-lg">
                    <Car className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-bold">Model</p>
                    <p className="text-white font-bold">{car.name}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-zinc-800 p-2 rounded-lg">
                    <Zap className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-bold">Engine</p>
                    <p className="text-white font-bold">{car.specs?.engine}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-zinc-800 p-2 rounded-lg">
                    <Zap className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-bold">Top Speed</p>
                    <p className="text-white font-bold">{car.specs?.topSpeed}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-zinc-800 p-2 rounded-lg">
                    <Globe className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-bold">Origin</p>
                    <p className="text-white font-bold">{car.specs?.origin}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-zinc-800 p-2 rounded-lg">
                    <Settings className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-bold">Transmission</p>
                    <p className="text-white font-bold">{car.specs?.transmission}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-zinc-800 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-bold">Production Year</p>
                    <p className="text-white font-bold">{car.year}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Cars Section */}
        {relatedCars.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-serif font-bold text-white">Related Classics</h2>
              <Link to="/cars" className="text-gold font-bold uppercase tracking-widest text-xs hover:text-gold-light transition-colors">
                View All Inventory
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedCars.map((rc) => (
                <motion.div
                  key={rc.id}
                  whileHover={{ y: -10 }}
                  className="group bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500"
                >
                  <Link to={`/cars/${rc.id}`}>
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={rc.image} alt={rc.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <div className="text-gold text-[10px] font-black uppercase tracking-widest mb-1">{rc.brand}</div>
                      <h3 className="text-xl font-serif font-bold text-white mb-4 group-hover:text-gold transition-colors">{rc.name}</h3>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-lg font-bold text-white">{rc.price}</span>
                        <span className="text-gold text-xs font-bold uppercase tracking-widest">Details</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {isInquiryModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInquiryModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-gold/20 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="bg-zinc-800/50 p-8 border-b border-white/5 relative">
                <button 
                  onClick={() => setIsInquiryModalOpen(false)}
                  className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="text-gold text-xs font-black uppercase tracking-widest mb-2">{inquiryType}</div>
                <h2 className="text-3xl font-serif font-bold text-white">Inquire About</h2>
                <div className="text-zinc-400 font-medium mt-1">{car.brand} {car.name} <span className="text-zinc-600 text-sm ml-2">ID: {car.id}</span></div>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                {submitSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} className="text-gold" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-4">Inquiry Sent!</h3>
                    <p className="text-zinc-400 leading-relaxed">
                      Your inquiry has been sent to the dealer. We will contact you soon.
                    </p>
                    <button 
                      onClick={() => setIsInquiryModalOpen(false)}
                      className="mt-8 px-8 py-3 bg-gold text-zinc-950 font-bold rounded-xl hover:bg-gold-light transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                          <input 
                            required
                            type="text"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            className="w-full bg-zinc-800 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Email Address</label>
                        <div className="relative">
                          <Send className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                          <input 
                            required
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-zinc-800 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                          <input 
                            required
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full bg-zinc-800 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">City</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                          <input 
                            required
                            type="text"
                            placeholder="New York"
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                            className="w-full bg-zinc-800 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Message</label>
                      <textarea 
                        required
                        rows={3}
                        placeholder="I'm interested in this car..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-zinc-800 border border-white/5 rounded-xl py-3 px-4 text-white placeholder:text-zinc-600 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all outline-none resize-none"
                      />
                    </div>

                    <button 
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full py-4 bg-gold hover:bg-gold-light text-zinc-950 font-black rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>SUBMIT INQUIRY</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Certified Classic Modal */}
      <AnimatePresence>
        {isCertifiedModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCertifiedModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-gold/20 rounded-[2.5rem] p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsCertifiedModalOpen(false)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white"
              >
                <X size={24} />
              </button>
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <Star size={32} className="text-gold" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">Certified Classic</h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                This vehicle has passed our rigorous 150-point inspection process. Our certification ensures:
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Verified matching numbers",
                  "Authenticity of all major components",
                  "Comprehensive mechanical inspection",
                  "Structural integrity verification",
                  "Detailed provenance research"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-zinc-300">
                    <CheckCircle2 size={16} className="text-gold mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setIsCertifiedModalOpen(false)}
                className="w-full py-4 bg-gold text-zinc-950 font-black rounded-xl hover:bg-gold-light transition-colors"
              >
                GOT IT
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Inquiries List Modal */}
      <AnimatePresence>
        {isInquiriesListModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInquiriesListModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-gold/20 rounded-[2.5rem] p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsInquiriesListModalOpen(false)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white"
              >
                <X size={24} />
              </button>
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <MessageSquare size={32} className="text-gold" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">Recent Activity</h2>
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-zinc-800/50 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-bold">Total Inquiries</span>
                    <span className="text-gold font-black">{car.commentsCount}</span>
                  </div>
                  <p className="text-xs text-zinc-500">High interest level for this specific model.</p>
                </div>
                <div className="space-y-3">
                  {[
                    { user: "A. Thompson", time: "2 hours ago", type: "Price Request" },
                    { user: "M. Rossi", time: "5 hours ago", type: "General Inquiry" },
                    { user: "S. Chen", time: "Yesterday", type: "Test Drive" }
                  ].map((inq, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border-b border-white/5">
                      <div>
                        <div className="text-sm font-bold text-white">{inq.user}</div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{inq.type}</div>
                      </div>
                      <div className="text-[10px] text-zinc-400">{inq.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsInquiriesListModalOpen(false);
                  handleInquiryClick("General Inquiry");
                }}
                className="w-full py-4 bg-gold text-zinc-950 font-black rounded-xl hover:bg-gold-light transition-colors"
              >
                ADD YOUR INQUIRY
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

