import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth, signInWithGoogle, toggleStarCoin, getUserPreferences } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import MarketDashboard from './components/MarketDashboard';
import CoinAnalysis from './components/CoinAnalysis';

function App() {
  const [user, setUser] = useState(null);
  const [prefs, setPrefs] = useState({ starredCoins: [], lastViewed: null });
  const [loading, setLoading] = useState(true); // Added to prevent the "flash"

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userPrefs = await getUserPreferences(currentUser.uid);
        if (userPrefs) setPrefs(userPrefs);
      }
      setLoading(false); // Auth is ready
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

  // If Firebase is still thinking, show a clean background so it doesn't crash
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
                {/* SAFE ACCESS: Added ?. to prevent the refresh crash */}
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
            <Route path="/" element={<MarketDashboard user={user} prefs={prefs} onStar={handleStar} />} />
            <Route path="/coin/:id" element={<CoinAnalysis user={user} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;