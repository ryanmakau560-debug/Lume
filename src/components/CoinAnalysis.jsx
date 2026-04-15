import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CoinAnalysis = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch Coin Details
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then(res => res.json())
      .then(data => setCoinData(data));

    // Fetch Chart Data (Last 7 Days)
    fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.prices.map(p => ({ date: new Date(p[0]).toLocaleDateString(), price: p[1] }));
        setHistory(formatted);
      });
  }, [id]);

  if (!coinData) return <div className="p-20 text-center animate-pulse">Loading Analysis...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 animate-in fade-in duration-700">
      <Link to="/" className="text-slate-500 hover:text-white mb-8 inline-block text-sm">← Back to Market</Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Chart & Stats */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-8">
            <img src={coinData.image.large} className="w-16 h-16" alt="" />
            <div>
              <h1 className="text-4xl font-black">{coinData.name} Analysis</h1>
              <p className="text-blue-400 font-mono text-xl">${coinData.market_data.current_price.usd.toLocaleString()}</p>
            </div>
          </div>

          <div className="h-80 w-full mt-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '8px'}} />
                <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Lume AI Insights */}
        <div className="space-y-6">
          <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-3xl">
            <h3 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4">Lume AI Insights</h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              The market is showing <span className="text-blue-400 font-bold">
              {coinData.market_data.price_change_percentage_24h > 0 ? "Bullish" : "Volatile"} </span> 
              stability over the last 24 hours. Given the current volume of 
              ${coinData.market_data.total_volume.usd.toLocaleString()}, our AI suggests 
              maintaining your watchlist position. 
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
            <h3 className="text-slate-500 font-black text-xs uppercase tracking-widest mb-4">Market Mood</h3>
            <div className="flex justify-between items-end">
               <span className="text-2xl font-bold">{coinData.market_data.price_change_percentage_7d > 0 ? "Healthy" : "Fearful"}</span>
               <span className="text-slate-500 text-xs font-mono">Based on 7D Trend [cite: 11]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinAnalysis;