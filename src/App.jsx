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
        const p = await getUserPreferences(currentUser.uid);
        setPrefs(p);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    console.log("Sign In Attempted...");
    await signInWithGoogle();
  };

  const handleStar = async (id) => {
    if (!user) return alert("Sign in first");
    const isStarred = prefs.starredCoins?.includes(id);
    await toggleStarCoin(user.uid, id, isStarred);
    const updated = await getUserPreferences(user.uid);
    setPrefs(updated);
  };

  return (
    <Router>
      <div className="fixed inset-0 bg-slate-950 text-white flex flex-col overflow-hidden">
        <nav className="p-6 flex justify-between items-center border-b border-white/5 bg-slate-950/90 backdrop-blur-xl z-50">
          <Link to="/" className="font-black text-xl tracking-tighter uppercase">LUME | VIEW</Link>
          {user ? (
            <button onClick={() => auth.signOut()} className="text-[10px] font-bold text-red-400 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20 uppercase">Logout</button>
          ) : (
            <button onClick={handleLogin} className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold uppercase">Sign In</button>
          )}
        </nav>
        <main className="flex-1 overflow-y-auto">
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