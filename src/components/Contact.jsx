import React, { useState } from 'react';

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('SENDING...');
    
    // For now, this mimics the send process. 
    // You can integrate EmailJS here later to make it functional.
    setTimeout(() => {
      setStatus('MESSAGE SENT SUCCESSFULLY');
      e.target.reset();
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <div className="w-full max-w-xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center">
          <h2 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">
            Get In Touch
          </h2>
          <h1 className="text-5xl font-[1000] uppercase tracking-tighter leading-none mb-6">
            Contact <span className="text-blue-500">Support</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="NAME" 
              required
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-bold tracking-widest focus:outline-none focus:border-blue-500 transition-all"
            />
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              required
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-bold tracking-widest focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
          <input 
            type="text" 
            placeholder="SUBJECT" 
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-bold tracking-widest focus:outline-none focus:border-blue-500 transition-all"
          />
          <textarea 
            placeholder="YOUR MESSAGE" 
            rows="5"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-bold tracking-widest focus:outline-none focus:border-blue-500 transition-all resize-none"
          ></textarea>
          
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-500/20"
          >
            {status || 'Transmit Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;