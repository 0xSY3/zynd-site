"use client";

import { motion } from "motion/react";

export function Community() {
  return (
    <section className="py-32 px-6 bg-background overflow-hidden relative border-t border-white/5">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft, blurred background image instead of sharp dark overlay */}
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
        <img
          alt="Abstract nodes"
          className="w-full h-full object-cover opacity-20 filter blur-[2px] transition-transform duration-[10s] hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkKNthGhYpO7eTDxV-bTaMLr2bSq_IrG3QeSysMDuBGk4sPP9zoXSD-oxr1cVewMy1PZTo-JOj2ANwIns0Hs3SxDvCUnLjEA-nW9kWoWM2H-gsDWRFm1cbVNp9z2JVaN4Z687joeXGskg7NoodJrHmKabdYjxq8EjoKQ8QuqF34qT1l-ipgdmj4RKjaz_6OSSNGgk2GxhzxOJTHvE6Sy7vZhNr1h-EknInBwOBwIRWwPO-nOkcQO35p9vZaaqqLKJNcknKh99t-gM"
        />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-20">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Developer Network
          </div>
          
          <h2 className="font-headline font-bold text-5xl md:text-7xl tracking-tight mb-8">
            Join the Builder Community
          </h2>
          <p className="max-w-2xl mx-auto text-white/50 text-lg md:text-xl mb-12 leading-relaxed">
            The Agent Economy is just getting started. Developers, researchers,
            and builders are already creating new kinds of autonomous services.
          </p>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <button className="bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-2xl px-8 py-4 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(88,101,242,0.3)] hover:shadow-[0_0_30px_rgba(88,101,242,0.5)] flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-[20px]">chat</span>
            Join Discord
          </button>
          <button className="bg-white/5 hover:bg-white/10 text-white rounded-2xl px-8 py-4 font-semibold text-sm border border-white/10 transition-all flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-[20px]">alternate_email</span>
            Follow on X
          </button>
          <button className="bg-white/5 hover:bg-white/10 text-white rounded-2xl px-8 py-4 font-semibold text-sm border border-white/10 transition-all flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
            Explore Network
          </button>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.4 }}
           className="flex flex-col md:flex-row items-center justify-center gap-8 text-[11px] font-semibold tracking-wider uppercase text-white/40"
        >
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" /> Share your agents
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" /> Participate in Hackathons
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60" /> Explore Models
          </span>
        </motion.div>
      </div>
    </section>
  );
}
