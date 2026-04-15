import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CoinAnalysis = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [history, setHistory] = useState([]);

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
          date: new Date(p[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
          price: p[1] 
        }));
        setHistory(formatted);
      });
  }, [id]);

  if (!coinData) return <div className="h-screen flex items-center justify-center text-slate-500 font-mono text-[10px] uppercase tracking-[1em]">Establishing Connection...</div>;

  const mData = coinData.market_data;

  return (
    <div className="w-full px-8 py-6 animate-in fade-in duration-500">
      <Link to="/" className="text-slate-500 hover:text-white mb-6 inline-block text-[9px] font-black uppercase tracking-[0.4em]">← BACK TO MARKET</Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        
        {/* CHART PANEL */}
        <div className="lg:col-span-8 bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-4">
            <img src={coinData.image.small} className="w-10 h-10" alt="" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black uppercase tracking-tighter">{coinData.name}</h1>
                <span className="bg-slate-800 text-slate-500 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter">{coinData.symbol}</span>
              </div>
              <p className="text-blue-500 font-mono text-3xl font-bold tracking-tighter mt-1">
                ${mData.current_price.usd.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Reduced height to keep it on one screen without scrolling */}
          <div className="h-[320px] w-full pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 9, fontWeight: 'bold'}}
                  dy={10}
                />
                <YAxis 
                  orientation="right"
                  domain={['auto', 'auto']} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 9, fontWeight: 'bold'}}
                  tickFormatter={(value) => `$${formatCompact(value)}`}
                />
                <Tooltip 
                  contentStyle={{backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} 
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  strokeLinecap="round" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SIDEBAR STATS */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Market Cap</p>
            <p className="text-2xl font-bold">${formatCompact(mData.market_cap.usd)}</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Volume (24h)</p>
            <p className="text-2xl font-bold text-blue-400 font-mono">${formatCompact(mData.total_volume.usd)}</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Circulating</span>
                <span className="font-bold font-mono text-xs">{formatCompact(mData.circulating_supply)}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Max Supply</span>
                <span className="font-bold font-mono text-xs">{mData.max_supply ? formatCompact(mData.max_supply) : '∞'}</span>
            </div>
            <div className="flex justify-between items-center border-t border-white/5 pt-3">
                <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">FDV Valuation</span>
                <span className="font-bold font-mono text-xs">${formatCompact(mData.fully_diluted_valuation.usd)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinAnalysis;