import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth, signInWithGoogle, toggleStarCoin, getUserPreferences } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import MarketDashboard from './components/MarketDashboard';
import CoinAnalysis from './components/CoinAnalysis';

// LANDING PAGE COMPONENT (Kept here for safety)
const LandingPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
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

      <div className="pt-10 flex flex-col md:grow items-center justify-center gap-4">
        <button 
          onClick={signInWithGoogle}
          className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
        >
          Launch Terminal
        </button>
      </div>
    </div>
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [prefs, setPrefs] = useState({ starredCoins: [], lastViewed: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userPrefs = await getUserPreferences(currentUser.uid);
        if (userPrefs) setPrefs(userPrefs);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStar = async (coinId) => {
    if (!user) return alert("Please sign in to star coins!");
    const isStarred = prefs.starredCoins?.includes(coinId);
    await toggleStarCoin(user.uid, coinId, isStarred);
    const updatedPrefs = await getUserPreferences(user.uid);
    if (updatedPrefs) setPrefs(updatedPrefs);
  };

  if (loading) return <div className="fixed inset-0 bg-slate-950" />;

  return (
    <Router>
      <div className="fixed inset-0 bg-slate-950 text-white font-sans overflow-y-auto overflow-x-hidden flex flex-col">
        
        <nav className="sticky top-0 left-0 right-0 flex justify-between items-center py-4 px-8 w-full backdrop-blur-xl z-[100] border-b border-white/5 bg-slate-950/90">
          <Link to="/" className="text-xl font-black tracking-tighter uppercase italic">
            LUME <span className="text-blue-500">| VIEW</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-[10px] text-slate-400 hover:text-white transition uppercase font-black tracking-widest">About</Link>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium text-slate-400">
                  Welcome, {user?.displayName?.split(' ')[0] || 'Ryan'}
                </span>
                <button onClick={() => auth.signOut()} className="bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-red-500/20">LOGOUT</button>
              </div>
            ) : (
              <button onClick={signInWithGoogle} className="bg-white text-black px-5 py-1.5 rounded-full text-xs font-bold uppercase">Sign In</button>
            )}
          </div>
        </nav>

        <main className="flex-1 w-full">
          <Routes>
            <Route 
              path="/" 
              element={user ? <MarketDashboard user={user} prefs={prefs} onStar={handleStar} /> : <LandingPage />} 
            />
            <Route path="/coin/:id" element={<CoinAnalysis user={user} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;