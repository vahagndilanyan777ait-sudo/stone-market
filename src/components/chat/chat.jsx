import React, { useState } from 'react';

const ChatApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Բարև ձեզ: Մուտք գործեք զրույցը սկսելու համար:", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  // Handle Logic for both Google and Manual Gmail Login
  const handleAuth = (e, method) => {
    if (e) e.preventDefault();
    
    // If it's the form, grab the email, otherwise mock a Google user
    const email = e?.target?.email?.value || "Google User";
    setUserEmail(email);
    setIsLoggedIn(true);
    
    // Add a system message upon entry
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text: `Բարի գալուստ, ${email.split('@')[0]}: Ինչո՞վ կարող եմ օգնել:`, 
      sender: 'bot' 
    }]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, sender: 'me' }]);
    setInput('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4 font-sans">
      <div className="flex flex-col h-[600px] w-full max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden relative">
        
        {/* --- HEADER --- */}
        <header className="bg-[#00df9a] p-5 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">💬</div>
            <div>
              <h1 className="font-bold leading-tight">Support Chat</h1>
              <p className="text-[10px] uppercase tracking-wider opacity-80">
                {isLoggedIn ? 'Ակտիվ' : 'Պահանջվում է մուտք'}
              </p>
            </div>
          </div>
          {isLoggedIn && (
            <button onClick={() => setIsLoggedIn(false)} className="text-xs bg-black/10 hover:bg-black/20 px-3 py-1 rounded-full transition-all">
              Ելք
            </button>
          )}
        </header>

        {/* --- CHAT AREA --- */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 transition-all duration-500 ${!isLoggedIn ? 'blur-sm grayscale' : ''}`}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                msg.sender === 'me' ? 'bg-[#00df9a] text-white rounded-tr-none' : 'bg-white border text-gray-700 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* --- LOGIN OVERLAY (GMAIL & GOOGLE) --- */}
        {!isLoggedIn && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-white/60 backdrop-blur-sm">
            <div className="bg-white w-full rounded-3xl shadow-2xl p-8 border border-gray-100 animate-in fade-in zoom-in duration-300">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Մուտք</h2>

              {/* Google Button */}
              <button 
                onClick={() => handleAuth(null, 'google')}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all active:scale-95 mb-4"
              >
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="G" />
                <span className="text-sm font-semibold text-gray-700">Մուտք Google-ով</span>
              </button>

              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-3 text-xs text-gray-400 font-medium">ԿԱՄ GMAIL</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Gmail Form */}
              <form onSubmit={(e) => handleAuth(e, 'gmail')} className="space-y-4">
                <input 
                  name="email"
                  type="email" 
                  placeholder="Էլ. հասցե (Gmail)" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none transition-all text-sm" 
                  required 
                />
                <input 
                  type="password" 
                  placeholder="Գաղտնաբառ" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none transition-all text-sm" 
                  required 
                />
                <button type="submit" className="w-full bg-[#00df9a] hover:bg-[#00c88a] text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95">
                  Մուտք գործել
                </button>
              </form>
            </div>
          </div>
        )}

        {/* --- INPUT BAR --- */}
        <form onSubmit={sendMessage} className={`p-4 bg-white border-t flex gap-2 ${!isLoggedIn ? 'opacity-20 pointer-events-none' : ''}`}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Գրեք հաղորդագրություն..." 
            className="flex-1 bg-gray-100 border-none rounded-full px-5 py-2.5 focus:ring-2 focus:ring-emerald-400 outline-none text-sm"
          />
          <button type="submit" className="bg-[#00df9a] text-white p-2.5 rounded-full hover:scale-110 active:scale-95 transition-all shadow-md">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 rotate-90">
              <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;