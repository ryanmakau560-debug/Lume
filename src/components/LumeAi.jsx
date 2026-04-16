import React, { useState, useRef, useEffect } from 'react';

const LumeAi = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // CHANGED: The initial greeting is now more "human"
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Lume is live. Pulling the latest feeds now... what's on your radar?" }
  ]);
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const rawKey = import.meta.env.VITE_GEMINI_KEY || "";
  const GEMINI_API_KEY = rawKey.split(':')[0].trim();
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${GEMINI_API_KEY}`;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ 
              // CHANGED: This prompt gives Lume its "soul" and wit
              text: `System: You are LUME, a sharp, slightly witty, and highly intelligent AI analyst. 
              Don't be a robot. Be helpful but punchy. Use a mix of professional insight and casual confidence. 
              Keep asset names in UPPERCASE, but let the rest of your speech feel human.
              User: ${input}` 
            }]
          }]
        })
      });

      const data = await response.json();

      if (data.error) throw new Error(`${data.error.code}: ${data.error.message}`);

      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const aiText = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: 'ai', content: aiText }]);
      } else {
        throw new Error("EMPTY_RESPONSE");
      }

    } catch (error) {
      console.error("LumeAi Terminal Error:", error);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "SYSTEM ERROR: Feed went dark. Try that again?" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/40 transition-all active:scale-95"
      >
        <span className="text-xl font-black italic">L</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 h-[500px] bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl flex flex-col shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-4 border-b border-white/5 bg-blue-600/10 flex justify-between items-center">
            <span className="text-[10px] font-black tracking-[0.2em] uppercase flex items-center gap-2 text-white">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Lume Insights
            </span>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition text-lg">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-[11px] font-medium leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white font-bold' 
                    : 'bg-white/5 border border-white/10 text-slate-300'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-[10px] text-blue-500 font-black animate-pulse tracking-widest pl-1 uppercase">
                Analyzing...
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-slate-900/30">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={loading ? "Lume is thinking..." : "Ask me anything..."}
              disabled={loading}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-[10px] font-medium focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-700"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default LumeAi;