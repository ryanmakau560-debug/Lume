import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen p-10 max-w-7xl mx-auto animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="mb-20 mt-10">
        <h2 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">
          The Platform
        </h2>
        <h1 className="text-7xl font-[1000] italic tracking-tighter uppercase leading-none mb-8 text-white">
          Defining the <br /> 
          <span className="text-blue-500 text-8xl">Future</span> of View
        </h1>
        <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed">
          LUME | VIEW was engineered to solve the complexity of the modern market. 
          We provide a zero-latency terminal interface designed for those who demand 
          clarity in the chaos of the data stream.
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CARD 1: THE MISSION */}
        <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-sm hover:border-blue-500/20 transition-all">
          <div className="w-12 h-12 bg-blue-600 rounded-full mb-8 flex items-center justify-center font-black text-white">L</div>
          <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4 text-white">
            The Mission
          </h3>
          <p className="text-slate-400 font-medium leading-relaxed">
            Our subsystem aggregates real-time data from global exchanges, delivering 
            a unified command center. LUME is more than a tracker; it's a visual 
            layer for the new internet.
          </p>
        </div>

        {/* CARD 2: THE FOUNDER */}
        <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-sm relative overflow-hidden group hover:border-blue-500/20 transition-all">
          <div className="relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-2">
              Founder & CEO
            </h3>
            <h3 className="text-4xl font-[1000] italic uppercase tracking-tighter mb-6 text-white">
              RYAN
            </h3>
            <p className="text-slate-400 font-medium leading-relaxed mb-8">
              Architect of the LUME framework. Focused on bridging the gap between 
              raw blockchain data and institutional-grade UI.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold group-hover:border-blue-500 transition-colors">GH</div>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold group-hover:border-blue-500 transition-colors">LI</div>
            </div>
          </div>
          
          {/* Subtle Background Element */}
          <div className="absolute -bottom-10 -right-10 text-[120px] font-[1000] italic text-white/[0.02] select-none pointer-events-none">
            CEO
          </div>
        </div>
      </div>

      {/* FOOTER LINK */}
      <div className="mt-20 text-center">
        <Link to="/" className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 hover:text-blue-500 transition-colors">
          ← Return to Terminal
        </Link>
      </div>
    </div>
  );
};

export default About;