import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth, signInWithGoogle, toggleStarCoin, getUserPreferences } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import MarketDashboard from './components/MarketDashboard';
import CoinAnalysis from './components/CoinAnalysis';

function App() {
  const [user, setUser] = useState(null);
  const [prefs, setPrefs] = useState({ starredCoins: [] });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userPrefs = await getUserPreferences(currentUser.uid);
        setPrefs(userPrefs || { starredCoins: [] });
      } else {
        setPrefs({ starredCoins: [] });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleStar = async (coinId) => {
    if (!user) return alert("Please sign in to save your watchlist!");
    const isStarred = prefs.starredCoins?.includes(coinId);
    await toggleStarCoin(user.uid, coinId, isStarred);
    const updatedPrefs = await getUserPreferences(user.uid);
    setPrefs(updatedPrefs);
  };

  return (
    <Router>
      <div className="fixed inset-0 bg-slate-950 text-white font-sans overflow-y-auto overflow-x-hidden flex flex-col">
        <nav className="sticky top-0 left-0 right-0 flex justify-between items-center py-4 px-8 w-full backdrop-blur-xl z-[100] border-b border-white/5 bg-slate-950/90">
          <Link to="/" className="text-xl font-black tracking-tighter uppercase italic">
            LUME <span className="text-blue-500">VIEW</span>
          </Link>
          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Watchlist: {prefs.starredCoins?.length || 0}
                </span>
                <button 
                  onClick={() => auth.signOut()} 
                  className="bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-red-500/20 uppercase"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={signInWithGoogle} 
                className="bg-white text-black px-5 py-1.5 rounded-full text-xs font-bold uppercase"
              >
                Sign In
              </button>
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