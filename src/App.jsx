import { useState, useEffect } from 'react';
import { signInWithGoogle, auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [coins, setCoins] = useState([]);
  const [user, setUser] = useState(null);

  // 1. Listen for Authentication status [cite: 10, 313]
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); 
  }, []);

  // 2. Fetch Market Data from API
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(res => res.json())
      .then(data => setCoins(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  return (
  <div className="p-6 md:p-10 bg-slate-950 min-h-screen text-white font-sans">
    
    {/* Clean Navbar */}
    <nav className="flex justify-between items-center mb-12 max-w-5xl mx-auto border-b border-white/10 pb-6">
      <h1 className="text-3xl font-black tracking-tighter">
        LUME | <span className="text-blue-500">COIN VIEW</span>
      </h1>
      
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="hidden sm:block text-slate-400 text-sm italic">
              Logged in as {user.displayName}
            </span>
            <button 
              onClick={() => auth.signOut()} 
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg text-xs font-bold transition-all"
            >
              LOGOUT
            </button>
          </>
        ) : (
          <button 
            onClick={signInWithGoogle} 
            className="bg-white text-black hover:bg-slate-200 px-6 py-2 rounded-xl font-bold transition-all"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>

    {/* Market List Container */}
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-xl font-semibold tracking-tight">Market Overview</h2>
        <p className="text-[10px] text-blue-500 font-mono uppercase tracking-[0.2em]">Live Updates • API Active</p>
      </div>

      <div className="space-y-3">
        {coins.length > 0 ? (
          coins.map(coin => (
            <div 
              key={coin.id} 
              className="flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all shadow-2xl"
            >
              <div className="flex items-center gap-4">
                {/* Fixed size image for professional look */}
                <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black">{coin.symbol}</p>
                  <p className="font-bold text-slate-100">{coin.name}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-mono font-bold text-lg">
                  ${coin.current_price.toLocaleString()}
                </p>
                <p className={`text-xs font-bold ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.price_change_percentage_24h > 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-500 text-sm font-mono">SYNCING WITH GLOBAL MARKETS...</p>
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default App;