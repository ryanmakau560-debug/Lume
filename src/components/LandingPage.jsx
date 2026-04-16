import React from 'react';
import { signInWithGoogle } from '../firebase';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-3xl space-y-6">
        <h2 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em] animate-fade-in">
          Next-Gen Crypto Terminal
        </h2>
        
        <h1 className="text-7xl md:text-8xl font-[1000] italic tracking-tighter uppercase leading-[0.85]">
          Master the <br />
          <span className="text-blue-500">Market</span> Stream
        </h1>

        <p className="text-slate-400 text-sm md:text-base font-medium max-w-lg mx-auto leading-relaxed pt-4">
          Institutional-grade data tracking for the modern trader. 
          Real-time analytics, personalized watchlists, and zero noise.
        </p>

        <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-4">
          <button 
            onClick={signInWithGoogle}
            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            Launch Terminal
          </button>
          
          <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs transition-all">
            Documentation
          </button>
        </div>
      </div>

      {/* Subtle bottom detail */}
      <div className="mt-24 grid grid-cols-3 gap-12 border-t border-white/5 pt-12">
        <div className="text-center">
          <p className="text-xl font-black italic tracking-tighter">50+</p>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Live Assets</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-black italic tracking-tighter">REAL-TIME</p>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Data Feed</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-black italic tracking-tighter">0.0s</p>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Latency</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;