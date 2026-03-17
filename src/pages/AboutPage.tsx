import { motion } from "motion/react";
import { History, Award, Users, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-zinc-900 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 tracking-tight">
              Preserving <span className="text-amber-500 italic">Automotive</span> History
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              Founded by a group of passionate collectors and historians, Vintage Car Gallery is dedicated to the preservation and celebration of classic automotive engineering.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed">
              We believe that every vintage car tells a story—of the people who built it, the era it defined, and the adventures it witnessed. Our mission is to share these stories with the world and ensure that the legacy of these mechanical masterpieces continues for generations to come.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border-8 border-zinc-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517153191978-950271b70e9f?auto=format&fit=crop&q=80&w=1000"
                alt="Vintage Car Workshop"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-amber-600 p-8 rounded-2xl shadow-xl hidden md:block">
              <p className="text-4xl font-serif font-bold text-white">25+</p>
              <p className="text-amber-100 text-sm uppercase tracking-widest">Years of Expertise</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
            <History className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="text-white font-serif font-bold text-xl mb-4">Heritage</h3>
            <p className="text-zinc-500 text-sm">Deeply rooted in the history of the world's most prestigious automotive brands.</p>
          </div>
          <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
            <Award className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="text-white font-serif font-bold text-xl mb-4">Quality</h3>
            <p className="text-zinc-500 text-sm">Only the most pristine and well-maintained vehicles enter our gallery.</p>
          </div>
          <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
            <Users className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="text-white font-serif font-bold text-xl mb-4">Community</h3>
            <p className="text-zinc-500 text-sm">A global network of collectors, restorers, and enthusiasts.</p>
          </div>
          <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
            <ShieldCheck className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="text-white font-serif font-bold text-xl mb-4">Trust</h3>
            <p className="text-zinc-500 text-sm">Transparent provenance and expert authentication for every vehicle.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
