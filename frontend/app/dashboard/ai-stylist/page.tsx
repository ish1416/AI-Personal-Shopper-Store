'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Plus, Sparkles, Trash2, ShoppingBag } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { ChatSession, ChatMessage, Product } from '@/types';
import api from '@/lib/api';
import Link from 'next/link';

export default function AIStylistPage() {
  const { user } = useAuthStore();
  const { addItem } = useCartStore();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { loadSessions(); }, []);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  const loadSessions = async () => {
    const { data } = await api.get('/ai/sessions');
    setSessions(data.data);
  };

  const createSession = async () => {
    const { data } = await api.post('/ai/sessions', { title: 'Style Chat' });
    setSessions((prev) => [data.data, ...prev]);
    setActiveSession(data.data);
    setMessages([]);
    setSuggestedProducts([]);
  };

  const selectSession = async (session: ChatSession) => {
    setActiveSession(session);
    const { data } = await api.get(`/ai/sessions/${session._id}/messages`);
    setMessages(data.data);
    setSuggestedProducts([]);
  };

  const deleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await api.delete(`/ai/sessions/${sessionId}`);
    setSessions((prev) => prev.filter((s) => s._id !== sessionId));
    if (activeSession?._id === sessionId) { setActiveSession(null); setMessages([]); }
  };

  const sendMessage = async () => {
    if (!input.trim() || !activeSession || isTyping) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { _id: Date.now().toString(), sessionId: activeSession._id, senderType: 'user', messageContent: userMsg, sentAt: new Date().toISOString() }]);
    setIsTyping(true);

    try {
      const { data } = await api.post(`/ai/sessions/${activeSession._id}/chat`, { message: userMsg });
      setMessages((prev) => [...prev, { _id: (Date.now() + 1).toString(), sessionId: activeSession._id, senderType: 'ai', messageContent: data.data.reply, sentAt: new Date().toISOString() }]);
      if (data.data.products?.length) setSuggestedProducts(data.data.products);
    } catch {
      setMessages((prev) => [...prev, { _id: (Date.now() + 1).toString(), sessionId: activeSession._id, senderType: 'ai', messageContent: 'Sorry, I had trouble connecting. Please try again!', sentAt: new Date().toISOString() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const prompts = ['I need an outfit for a summer wedding', 'What should I wear to a job interview?', 'Casual weekend look ideas', 'Evening dinner date outfit'];

  return (
    <div className="flex h-[calc(100vh-0px)] md:h-screen">
      {/* Sessions sidebar */}
      <div className="hidden sm:flex w-64 flex-col bg-ink-soft border-r border-ink-muted">
        <div className="p-4 border-b border-ink-muted">
          <button onClick={createSession} className="btn-primary w-full flex items-center justify-center gap-2 text-sm">
            <Plus size={16} /> New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sessions.length === 0 && (
            <p className="text-cream/30 text-sm text-center py-8">No chats yet</p>
          )}
          {sessions.map((s) => (
            <div key={s._id} onClick={() => selectSession(s)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer group transition-colors ${activeSession?._id === s._id ? 'bg-acid/10 border border-acid/20' : 'hover:bg-ink-muted'}`}>
              <Sparkles size={14} className={activeSession?._id === s._id ? 'text-acid' : 'text-cream/30'} />
              <span className="flex-1 text-sm text-cream/70 truncate">{s.title}</span>
              <button onClick={(e) => deleteSession(s._id, e)} className="opacity-0 group-hover:opacity-100 text-cream/30 hover:text-coral transition-all">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {!activeSession ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-acid/10 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles size={32} className="text-acid" />
            </div>
            <h2 className="text-2xl font-bold text-cream mb-2">Chat with ARIA</h2>
            <p className="text-cream/50 mb-8 max-w-sm">Your AI personal stylist. Describe any occasion and get curated outfit recommendations.</p>
            <button onClick={createSession} className="btn-primary flex items-center gap-2">
              <Plus size={16} /> Start a new chat
            </button>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
              {prompts.map((p) => (
                <button key={p} onClick={async () => { await createSession(); }}
                  className="text-left px-4 py-3 rounded-xl bg-ink-soft border border-ink-muted text-cream/60 text-sm hover:border-acid/30 hover:text-cream transition-colors">
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Chat header */}
            <div className="px-6 py-4 border-b border-ink-muted flex items-center gap-3">
              <div className="w-8 h-8 bg-acid rounded-full flex items-center justify-center">
                <Sparkles size={16} className="text-ink" />
              </div>
              <div>
                <p className="font-semibold text-cream text-sm">ARIA</p>
                <p className="text-xs text-cream/40">AI Personal Stylist</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-cream/40 text-sm">Say hi to ARIA! Describe what you're looking for.</p>
                </div>
              )}
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div key={msg._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.senderType === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.senderType === 'ai' && (
                      <div className="w-7 h-7 bg-acid rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                        <Sparkles size={12} className="text-ink" />
                      </div>
                    )}
                    <div className={`max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.senderType === 'user' ? 'bg-acid text-ink font-medium rounded-br-sm' : 'bg-ink-soft border border-ink-muted text-cream/80 rounded-bl-sm'}`}>
                      {msg.messageContent}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-acid rounded-full flex items-center justify-center">
                    <Sparkles size={12} className="text-ink" />
                  </div>
                  <div className="bg-ink-soft border border-ink-muted px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 bg-acid rounded-full" />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested products */}
            {suggestedProducts.length > 0 && (
              <div className="px-6 py-3 border-t border-ink-muted">
                <p className="text-xs text-cream/40 mb-2">Suggested for you</p>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {suggestedProducts.map((p) => (
                    <div key={p._id} className="flex-shrink-0 w-40 card p-3">
                      <p className="text-xs font-medium text-cream truncate">{p.name}</p>
                      <p className="text-xs text-acid font-bold mt-1">${p.price}</p>
                      <button onClick={() => addItem(p._id)} className="mt-2 w-full text-xs bg-acid/10 text-acid rounded-lg py-1.5 hover:bg-acid hover:text-ink transition-colors flex items-center justify-center gap-1">
                        <ShoppingBag size={12} /> Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-6 py-4 border-t border-ink-muted">
              <div className="flex gap-3">
                <input value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Describe what you're looking for..."
                  className="input flex-1 text-sm" />
                <button onClick={sendMessage} disabled={!input.trim() || isTyping}
                  className="w-11 h-11 bg-acid rounded-xl flex items-center justify-center hover:bg-acid-pale transition-colors disabled:opacity-40 flex-shrink-0">
                  <Send size={18} className="text-ink" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
