import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CoinAnalysis = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [history, setHistory] = useState([]);

  // Utility function to abbreviate large numbers (e.g., 1.5B instead of 1,500,000,000)
  const formatCompact = (number) => {
    if (number === null || number === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(number);
  };

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
      .then(res => res.json())
      .then(data => setCoinData(data));

    fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.prices.map(p => ({ 
          date: new Date(p[0]).toLocaleDateString(), 
          price: p[1] 
        }));
        setHistory(formatted);
      });
  }, [id]);

  if (!coinData) return <div className="p-20 text-center animate-pulse text-slate-500 font-mono text-xs uppercase tracking-widest">Calibrating Analysis...</div>;

  const mData = coinData.market_data;

  return (
    <div className="max-w-7xl mx-auto p-6 animate-in fade-in duration-700">
      <Link to="/" className="text-slate-500 hover:text-white mb-8 inline-block text-sm transition-colors uppercase tracking-widest font-bold">← Back to Market</Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE: CHART */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-8">
            <img src={coinData.image.small} className="w-12 h-12" alt="" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black uppercase tracking-tighter">{coinData.name}</h1>
                <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-xs font-bold uppercase">{coinData.symbol}</span>
                <span className="bg-slate-700 text-white px-2 py-0.5 rounded text-xs font-bold">#{coinData.market_cap_rank}</span>
              </div>
              <p className="text-blue-500 font-mono text-4xl font-bold mt-2">
                ${mData.current_price.usd.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="h-[400px] w-full mt-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                />
                <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT SIDE: ABBREVIATED ANALYSIS */}
        <div className="space-y-4">
          
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Market Cap</p>
            <p className="text-xl font-bold">${formatCompact(mData.market_cap.usd)}</p>
            <p className={`text-xs mt-1 ${mData.market_cap_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {mData.market_cap_change_percentage_24h?.toFixed(2)}%
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Volume (24h)</p>
              <p className="text-lg font-bold font-mono text-blue-400">${formatCompact(mData.total_volume.usd)}</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Vol / Mkt Cap</p>
              <p className="text-lg font-bold font-mono">{(mData.total_volume.usd / mData.market_cap.usd).toFixed(4)}%</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
            <div className="flex justify-between border-b border-white/5 pb-3 mb-3">
              <span className="text-slate-500 text-xs font-bold uppercase">Circulating Supply</span>
              <span className="font-bold text-sm font-mono">{formatCompact(mData.circulating_supply)} {coinData.symbol.toUpperCase()}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-3 mb-3">
              <span className="text-slate-500 text-xs font-bold uppercase">Max Supply</span>
              <span className="font-bold text-sm font-mono">{mData.max_supply ? formatCompact(mData.max_supply) : '∞'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 text-xs font-bold uppercase">Total Supply</span>
              <span className="font-bold text-sm font-mono">{formatCompact(mData.total_supply)}</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Fully Diluted Valuation (FDV)</p>
            <p className="text-xl font-bold font-mono">${formatCompact(mData.fully_diluted_valuation.usd)}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CoinAnalysis;