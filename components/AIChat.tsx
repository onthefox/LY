
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2, Paperclip, FileText, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const LoadingSpinner = () => (
  <Loader2 className="w-5 h-5 text-[#E60012] animate-spin" />
);

interface SelectedFile {
  file: File;
  base64: string;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to Long Ying Logistics (龙盈物流). How can I assist with your shipment today? 🇨🇳 🇷🇺' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      // Small timeout ensures DOM is fully painted before scrolling
      const timeoutId = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, isOpen, isLoading]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setSelectedFile({ file, base64 });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedFile) return;

    const userMessage: ChatMessage = { 
      role: 'user', 
      text: input,
      attachment: selectedFile ? {
        name: selectedFile.file.name,
        type: selectedFile.file.type,
        data: selectedFile.base64
      } : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    
    const textToSend = input;
    const fileToSend = selectedFile;
    setInput('');
    setSelectedFile(null);
    setIsLoading(true);

    let attachmentData = null;
    if (fileToSend) {
      const base64Data = fileToSend.base64.split(',')[1];
      attachmentData = {
        base64: base64Data,
        mimeType: fileToSend.file.type
      };
    }

    const responseText = await sendMessageToGemini(textToSend, attachmentData);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-16 right-4 md:bottom-20 md:right-6 z-50 flex flex-col items-end pointer-events-auto font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[90vw] md:w-96 bg-[#151725] border border-[#E60012]/30 rounded-lg overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-[#0a0b14] p-4 flex justify-between items-center border-b border-[#E60012]/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFD700]" />
                <h3 className="font-heading font-bold text-[#E60012] tracking-widest text-sm">LONG YING AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              className="h-64 md:h-80 overflow-y-auto p-4 space-y-3 bg-[#151725]"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded text-sm relative ${
                      msg.role === 'user'
                        ? 'bg-[#E60012] text-white rounded-tr-none font-medium'
                        : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5'
                    }`}
                  >
                    {msg.attachment && (
                      <div className="mb-2 p-2 bg-black/10 rounded flex items-center gap-2">
                        {msg.attachment.type.startsWith('image/') ? (
                           <ImageIcon className="w-4 h-4 opacity-70" />
                        ) : (
                           <FileText className="w-4 h-4 opacity-70" />
                        )}
                        <span className="text-xs opacity-80 truncate max-w-[150px]">{msg.attachment.name}</span>
                      </div>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded flex items-center justify-center border border-white/5">
                    <LoadingSpinner />
                  </div>
                </div>
              )}
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-[#E60012]/10 bg-[#0a0b14]">
              {/* File Preview */}
              <AnimatePresence>
                {selectedFile && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between bg-white/5 p-2 rounded mb-2 text-xs text-white border border-white/5"
                  >
                     <div className="flex items-center gap-2 truncate">
                        {selectedFile.file.type.startsWith('image/') ? <ImageIcon className="w-3 h-3 text-[#FFD700]"/> : <FileText className="w-3 h-3 text-[#FFD700]"/>}
                        <span className="truncate max-w-[200px]">{selectedFile.file.name}</span>
                     </div>
                     <button onClick={() => setSelectedFile(null)} className="p-1 hover:bg-white/10 rounded-full">
                       <X className="w-3 h-3" />
                     </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-2 items-end">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*,application/pdf"
                  onChange={handleFileSelect}
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-2 rounded transition-colors mb-0.5 ${selectedFile ? 'text-[#FFD700] bg-white/10' : 'text-white/30 hover:text-white'}`}
                >
                   <Paperclip className="w-5 h-5" />
                </button>

                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about tariffs..."
                  className="flex-1 bg-transparent text-white placeholder-white/30 text-sm focus:outline-none resize-none py-2.5 max-h-24 font-light"
                  style={{ minHeight: '40px' }}
                />
                
                <button
                  onClick={handleSend}
                  disabled={isLoading || (!input.trim() && !selectedFile)}
                  className="bg-[#E60012] p-2 rounded hover:bg-[#c4000f] transition-colors disabled:opacity-50 text-white mb-0.5"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[#E60012] flex items-center justify-center shadow-lg shadow-[#E60012]/20 z-50 group"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
