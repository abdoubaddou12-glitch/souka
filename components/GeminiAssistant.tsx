
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!query.trim() || isLoading) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await geminiService.getShoppingAssistantResponse(userMsg, history);
    setMessages(prev => [...prev, { role: 'model', text: response || '' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-24 left-6 z-[60]">
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-2xl w-80 md:w-96 flex flex-col border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-jumia-orange p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <i className="fas fa-robot text-xl"></i>
              <span className="font-bold">مساعد سوقنا الذكي</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                <i className="fas fa-sparkles text-jumia-orange text-3xl mb-2 animate-pulse"></i>
                <p className="text-sm font-medium">أنا مساعد "سوقنا"، كيف أخدمك اليوم؟</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  m.role === 'user' 
                    ? 'bg-jumia-orange text-white rounded-tr-none shadow-md' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-jumia-orange rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-jumia-orange rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-jumia-orange rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-white flex gap-2">
            <input 
              type="text" 
              placeholder="اسأل عن أي منتج في سوقنا..."
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-jumia-orange"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="bg-jumia-orange text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-jumia-orange text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform hover:shadow-jumia-orange/40"
        >
          <i className="fas fa-robot"></i>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        </button>
      )}
    </div>
  );
};

export default GeminiAssistant;
