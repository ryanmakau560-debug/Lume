import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MarketDashboard = ({ user, prefs, onStar }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        // We use the 'allorigins' proxy to stop the "Connecting" hang
        const api = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false";
        const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(api)}`);
        const data = await res.json();
        setCoins(data);
        setLoading(false);
      } catch (err) {
        console.error("LUME Fetch Error:", err);
      }
    };
    fetchMarket();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-white uppercase italic tracking-tighter mb-2">Market Overview</h1>
      <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-20">Live Updates • API Active</p>
      <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.5em] animate-pulse">Connecting to Data Stream...</p>
    </div>
  );

  return (
    <div className="p-10 w-full">
      <div className="flex flex-col items-center mb-16">
        <h1 className="text-6xl font-white uppercase italic tracking-tighter mb-2">Market Overview</h1>
        <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em]">Live Updates • API Active</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {coins.map(coin => (
          <div key={coin.id} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
               <img src={coin.image} className="w-10 h-10" alt="" />
               <button onClick={() => onStar(coin.id)} className="text-2xl text-slate-800">★</button>
            </div>
            <div className="text-3xl font-white italic tracking-tighter">${coin.current_price.toLocaleString()}</div>
            <Link to={`/coin/${coin.id}`} className="block mt-6 text-center text-[10px] font-black uppercase py-3 bg-white/5 rounded-xl border border-white/5">View Analytics</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketDashboard;