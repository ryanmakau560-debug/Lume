const LandingPage = () => (
  <div className="flex flex-col items-center justify-between min-h-[80vh] px-6 text-center">
    {/* Main Content Container - centered using flex-grow */}
    <div className="flex-grow flex flex-col items-center justify-center">
      <div className="max-w-4xl space-y-8 animate-in fade-in zoom-in duration-700">
        <h2 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">
          Market Intelligence Platform
        </h2>
        
        <h1 className="text-7xl md:text-8xl font-[1000] italic tracking-tighter uppercase leading-[0.85]">
          Master the <br />
          <span className="text-blue-500">Market</span> Stream
        </h1>

        <p className="text-slate-400 text-sm md:text-base font-medium max-w-lg mx-auto leading-relaxed pt-4">
          Institutional-grade data tracking for the modern trader. 
          Real-time analytics, personalized watchlists, and zero noise.
        </p>

        <div className="pt-10 flex flex-col items-center justify-center gap-4">
          <button 
            onClick={signInWithGoogle}
            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            Launch Terminal
          </button>
        </div>
      </div>
    </div>

    {/* Professional Footer */}
    <footer className="w-full max-w-6xl py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 mt-20">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
        © 2026 LUME VIEW <span className="mx-2 text-white/10">|</span> ALL RIGHTS RESERVED
      </div>
      
      <div className="flex items-center gap-8">
        <Link 
          to="/about" 
          className="text-[10px] font-black text-slate-400 hover:text-blue-500 transition-colors uppercase tracking-widest"
        >
          About Platform
        </Link>
        <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest cursor-not-allowed">
          System Status: Online
        </div>
      </div>
    </footer>
  </div>
);