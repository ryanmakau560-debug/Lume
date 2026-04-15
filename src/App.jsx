import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle, toggleStarCoin, getUserPreferences } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

// We will create these as separate files next
import MarketDashboard from './components/MarketDashboard';
import CoinAnalysis from './components/CoinAnalysis';

function App() {
  const [user, setUser] = useState(null);
  const [prefs, setPrefs] = useState({ starredCoins: [], lastViewed: null });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userPrefs = await getUserPreferences(currentUser.uid);
        if (userPrefs) setPrefs(userPrefs);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleStar = async (coinId) => {
    if (!user) return alert("Please sign in to star coins!");
    const isStarred = prefs.starredCoins.includes(coinId);
    await toggleStarCoin(user.uid, coinId, isStarred);
    // Refresh local state
    const updatedPrefs = await getUserPreferences(user.uid);
    setPrefs(updatedPrefs);
  };

  return (
    <Router>
      <div className="bg-slate-950 min-h-screen text-white font-sans selection:bg-blue-500/30">
        
        {/* LUME PREMIUM NAVBAR  */}
        <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
          <Link to="/" className="text-2xl font-black tracking-tighter">
            LUME <span className="text-blue-500">| VIEW</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-sm text-slate-400 hover:text-white transition">About</Link>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-300">Welcome, {user.displayName.split(' ')[0]}</span>
                <button onClick={() => auth.signOut()} className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg text-xs font-bold border border-red-500/20">LOGOUT</button>
              </div>
            ) : (
              <button onClick={signInWithGoogle} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-slate-200 transition">Sign In</button>
            )}
          </div>
        </nav>

        <Routes>
          {/* Main List View */}
          <Route path="/" element={
            <MarketDashboard user={user} prefs={prefs} onStar={handleStar} />
          } />
          
          {/* Full Page Analysis View [cite: 9, 10] */}
          <Route path="/coin/:id" element={
            <CoinAnalysis user={user} />
          } />

          {/* About Us & Contact Placeholders */}
          <Route path="/about" element={<div className="p-20 text-center text-slate-500">About Us - Clean Room Aesthetic [cite: 5]</div>} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;