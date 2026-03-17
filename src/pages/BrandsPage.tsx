import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const BRANDS = [
  {
    name: "Ford",
    image: "https://images.unsplash.com/photo-1584345604482-8135a2153c3b?auto=format&fit=crop&q=80&w=1000",
    description: "The pioneer of American automotive manufacturing. From the mass-produced Model T to the legendary Mustang, Ford has defined the spirit of the open road for generations.",
  },
  {
    name: "Rolls Royce",
    image: "https://images.unsplash.com/photo-1631214503951-37510075f748?auto=format&fit=crop&q=80&w=1000",
    description: "The pinnacle of luxury and craftsmanship. Since 1904, Rolls-Royce has represented the absolute standard of automotive excellence, defining elegance and silent power.",
  },
  {
    name: "Porsche",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000",
    description: "Engineering perfection and racing pedigree. Porsche's commitment to performance and timeless design has created some of the most iconic sports cars in history.",
  },
  {
    name: "Jaguar",
    image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&q=80&w=1000",
    description: "Grace, space, and pace. Jaguar's legacy of beautiful design and sporting performance is epitomized by the legendary E-Type and XK series.",
  },
  {
    name: "Mercedes Benz",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1000",
    description: "The best or nothing. As the inventor of the automobile, Mercedes-Benz has consistently led the industry in innovation, safety, and luxury for over 130 years.",
  },
  {
    name: "Lancia",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1000",
    description: "Italian flair and technical innovation. Lancia's history is filled with groundbreaking engineering and a dominant legacy in world rallying.",
  },
  {
    name: "Cadillac",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000",
    description: "The standard of the world. Cadillac represents the height of American luxury, known for bold designs and pioneering automotive technology.",
  },
  {
    name: "Chevrolet",
    image: "https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&q=80&w=1000",
    description: "An American icon. From the high-performance Corvette to the stylish Bel Air, Chevrolet has been at the heart of American car culture for over a century.",
  },
  {
    name: "Volkswagen",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=1000",
    description: "The people's car. Volkswagen's simple, reliable, and iconic designs like the Beetle and the Bus have become cultural symbols around the world.",
  },
];

export default function BrandsPage() {
  return (
    <div className="bg-zinc-950 min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30"
            alt="Brands Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-zinc-950/50 to-zinc-950" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 tracking-tight"
          >
            Legendary Brands
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg"
          >
            Explore the history and collections of the world's most iconic automotive manufacturers.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANDS.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all"
            >
              <img 
                src={brand.image} 
                alt={brand.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h2 className="text-3xl font-serif font-bold text-white mb-2">{brand.name}</h2>
                <p className="text-zinc-400 text-sm line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {brand.description}
                </p>
                <Link 
                  to={`/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-amber-500 font-bold uppercase tracking-widest text-xs group/link"
                >
                  View Collection <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
