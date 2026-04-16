import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favorites = ({ user, prefs, onStar }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarket = async () => {
      // We reuse the cache from the main dashboard to save API calls
      const cachedData = sessionStorage.getItem('lume_market_data');
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        if (Array.isArray(parsed)) {
          // FILTER: Only keep coins whose ID is in our starred list
          const starredOnly = parsed.filter(coin => prefs.starredCoins?.includes(coin.id));
          setCoins(starredOnly);
        }
      }
      setLoading(false);
    };

    fetchMarket();
  }, [prefs.starredCoins]); // Re-run if we unstar something

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-6xl text-white uppercase italic tracking-tighter mb-2">Watchlist</h1>
        <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">Syncing... </p>
      </div>
    );
  }

  return (
    <div className="p-10 w-full animate-in fade-in duration-700">
      <div className="flex flex-col items-center mb-16 text-center">
        <h1 className="text-6xl text-white uppercase italic tracking-tighter mb-2">Your Watchlist</h1>
        <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em]">
          {coins.length} Assets Tracked
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
        {coins.length > 0 ? (
          coins.map(coin => (
            <div key={coin.id} className="bg-white/5 border border-blue-500/20 p-8 rounded-3xl backdrop-blur-sm transition-all group">
              <div className="flex justify-between items-center mb-6">
                 <div className="flex items-center gap-3">
                   <img src={coin.image} className="w-10 h-10" alt="" />
                   <span className="text-white font-black italic uppercase tracking-tighter text-lg leading-tight">
                     {coin.name}
                   </span>
                 </div>
                 <button onClick={() => onStar(coin.id)} className="text-2xl text-blue-500">★</button>
              </div>
              <div className="text-3xl text-white italic tracking-tighter">
                ${coin.current_price?.toLocaleString() || '0.00'}
              </div>
              <div className={`text-[10px] font-bold mt-2 ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </div>
              <Link to={`/coin/${coin.id}`} className="block mt-8 text-center text-[10px] text-white uppercase tracking-widest py-3 bg-white/5 rounded-xl border border-white/5 hover:bg-blue-600 transition-all">
                  View Analytics
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-slate-500 uppercase tracking-widest text-xs mb-4">Your watchlist is empty.</p>
            <Link to="/" className="text-blue-500 text-[10px] font-black uppercase tracking-widest border border-blue-500/20 px-6 py-3 rounded-full hover:bg-blue-500 hover:text-white transition-all">
              Browse Markets
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;