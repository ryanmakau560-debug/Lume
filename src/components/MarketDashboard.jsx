import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MarketDashboard = ({ user, prefs, onStar }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        // 1. Check Cache first
        const cachedData = sessionStorage.getItem('lume_market_data');
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          if (Array.isArray(parsed)) {
            setCoins(parsed);
            setLoading(false);
          }
        }

        // 2. Try DIRECT fetch (No proxy). This is usually better for localhost.
        const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false";
        
        let response;
        try {
          response = await fetch(apiUrl);
        } catch (fetchErr) {
          // 3. Fallback: If direct fetch is blocked by CORS, try a DIFFERENT proxy
          console.warn("Direct fetch failed, trying fallback proxy...");
          response = await fetch(`https://corsproxy.io/?${encodeURIComponent(apiUrl)}`);
        }

        if (response.status === 429) {
          throw new Error("CoinGecko is busy (Rate Limit). Please wait 60 seconds.");
        }

        if (!response.ok) {
          throw new Error(`Network Error: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          sessionStorage.setItem('lume_market_data', JSON.stringify(data));
          setCoins(data);
          setError(null);
        } else {
          throw new Error("Invalid data format received.");
        }
      } catch (err) {
        console.error("LUME Fetch Error:", err);
        setError(err.message === 'Failed to fetch' ? "Connection Blocked. Try disabling AdBlock or wait a minute." : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarket();
  }, []);

  // Show Loading only if we have NO data at all
  if (loading && coins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-6xl text-white uppercase italic tracking-tighter mb-2">Market Overview</h1>
        <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
          Connecting to Data Stream...
        </p>
      </div>
    );
  }

  return (
    <div className="p-10 w-full animate-in fade-in duration-700">
      <div className="flex flex-col items-center mb-16 text-center">
        <h1 className="text-6xl text-white uppercase italic tracking-tighter mb-2">Market Overview</h1>
        <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em]">
          {error ? `OFFLINE: ${error}` : 'Live Updates • API Active'}
        </p>
      </div>

      {/* --- LUME AI FEATURE START --- */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 p-8 rounded-3xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">LUME AI • Initializing Analysis</span>
          </div>
          
          <h2 className="text-2xl text-white font-black italic uppercase tracking-tighter mb-4">Market Sentiment: <span className="text-blue-500">BULLISH</span></h2>
          
          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-3xl">
            LUME AI has detected high-volume accumulation in top-tier assets. Current volatility index suggests a potential breakout in the next 24 hours. Watch for support levels at the 50-day moving average.
          </p>

          <div className="mt-6 flex gap-4">
             <button className="bg-blue-600/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600/40 transition-all">
               Generate Deep Report
             </button>
          </div>
        </div>
      </div>
      {/* --- LUME AI FEATURE END --- */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
        {Array.isArray(coins) && coins.length > 0 ? (
          coins.map(coin => (
            <div key={coin.id} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:border-blue-500/30 transition-all group">
              <div className="flex justify-between items-center mb-6">
                 <img src={coin.image} className="w-10 h-10 grayscale group-hover:grayscale-0 transition-all" alt="" />
                 <button onClick={() => onStar(coin.id)} className={`text-2xl transition-colors ${prefs?.starredCoins?.includes(coin.id) ? 'text-blue-500' : 'text-slate-800'}`}>★</button>
              </div>
              <div className="text-3xl text-white italic tracking-tighter">
                ${coin.current_price?.toLocaleString() || '0.00'}
              </div>
              <div className={`text-[10px] font-bold mt-2 ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </div>
              <Link to={`/coin/${coin.id}`} className="block mt-8 text-center text-[10px] text-white uppercase tracking-widest py-3 bg-white/5 rounded-xl border border-white/5 hover:bg-blue-600 hover:border-blue-600 transition-all">
                  View Analytics
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-slate-500 uppercase tracking-widest text-xs">
            No data available. {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketDashboard;