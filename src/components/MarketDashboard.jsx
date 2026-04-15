import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MarketDashboard = ({ user, prefs, onStar }) => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      const proxyUrl = "https://corsproxy.io/?";
      const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

      try {
        const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
        if (!response.ok) throw new Error("API Limit Reached");
        const data = await response.json();
        setCoins(data);
      } catch (err) {
        console.error("LUME Data Fetch Error:", err);
      }
    };
    fetchCoins();
  }, []);

  return (
    <div className="w-full px-4 md:px-10 py-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black tracking-tight uppercase">Market Overview</h2>
        <p className="text-blue-500 text-xs font-mono mt-2 uppercase tracking-widest">Live Updates • API Active</p>
      </div>

      <div className="w-full space-y-4">
        {coins.length > 0 ? (
          coins.map(coin => {
            const isStarred = prefs.starredCoins?.includes(coin.id);
            return (
              <div key={coin.id} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all backdrop-blur-sm w-full">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => onStar(coin.id)}
                    className={`text-2xl transition ${isStarred ? 'text-yellow-400' : 'text-slate-600 hover:text-slate-400'}`}
                  >
                    {isStarred ? '★' : '☆'}
                  </button>
                  <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-full" />
                  <Link to={`/coin/${coin.id}`} className="hover:text-blue-400 transition">
                    <p className="text-xs text-slate-500 font-black uppercase tracking-tighter">{coin.symbol}</p>
                    <p className="font-bold text-lg">{coin.name}</p>
                  </Link>
                </div>
                
                <div className="text-right">
                  <p className="font-mono font-bold text-2xl">${coin.current_price.toLocaleString()}</p>
                  <p className={`text-sm font-bold ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center p-40 text-slate-500 font-mono text-sm animate-pulse tracking-[0.5em]">
            CONNECTING TO DATA STREAM...
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketDashboard;