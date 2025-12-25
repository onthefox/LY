
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { sanitizeInput, validateEmail, encryptPayload } from '../utils/security';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation Logic
    const newErrors: Record<string, string> = {};
    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedContact = sanitizeInput(formData.contact);
    const sanitizedMessage = sanitizeInput(formData.message);

    if (!sanitizedName) newErrors.name = "Name is required";
    if (!sanitizedContact) {
      newErrors.contact = "Contact is required";
    } else if (!validateEmail(sanitizedContact) && !/^\+?[\d\s-]{10,}$/.test(sanitizedContact)) {
      // Basic check: looks like an email OR a phone number
      newErrors.contact = "Invalid email or phone number";
    }
    if (!sanitizedMessage) newErrors.message = "Message cannot be empty";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // "Security" Phase: Encrypt payload before "sending"
    setStatus('submitting');
    
    const payload = {
      name: sanitizedName,
      contact: sanitizedContact,
      message: sanitizedMessage,
      timestamp: Date.now()
    };
    
    const securePayload = encryptPayload(payload);
    console.log("Secure Payload prepared:", securePayload);

    // Simulate API Network Request
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStatus('success');
    setFormData({ name: '', contact: '', message: '' });
    
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#151725] border border-white/5 p-8 md:p-12 relative overflow-hidden">
      <AnimatePresence>
        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-[#151725]/95 flex flex-col items-center justify-center text-center p-8"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 rounded-full bg-[#E60012]/20 flex items-center justify-center mb-4 text-[#E60012]"
            >
              <CheckCircle className="w-8 h-8" />
            </motion.div>
            <h3 className="text-xl font-heading text-white mb-2">Request Received</h3>
            <p className="text-gray-400">Our logistics expert will decode your request and contact you shortly.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 relative z-10">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-2 flex justify-between">
            Name / 姓名
            {errors.name && <span className="text-red-400 flex items-center gap-1 normal-case"><AlertCircle className="w-3 h-3" /> {errors.name}</span>}
          </label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-black/20 border-b p-4 text-white outline-none transition-colors ${errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-[#E60012]'}`}
            placeholder="Your Name" 
            disabled={status === 'submitting'}
          />
        </div>
         <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-2 flex justify-between">
            Contact / 联系方式
            {errors.contact && <span className="text-red-400 flex items-center gap-1 normal-case"><AlertCircle className="w-3 h-3" /> {errors.contact}</span>}
          </label>
          <input 
            type="text" 
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className={`w-full bg-black/20 border-b p-4 text-white outline-none transition-colors ${errors.contact ? 'border-red-500/50' : 'border-white/10 focus:border-[#E60012]'}`}
            placeholder="Email or Phone" 
            disabled={status === 'submitting'}
          />
        </div>
         <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-2 flex justify-between">
            Message / 信息
            {errors.message && <span className="text-red-400 flex items-center gap-1 normal-case"><AlertCircle className="w-3 h-3" /> {errors.message}</span>}
          </label>
          <textarea 
            rows={4} 
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full bg-black/20 border-b p-4 text-white outline-none transition-colors resize-none ${errors.message ? 'border-red-500/50' : 'border-white/10 focus:border-[#E60012]'}`}
            placeholder="Details about your cargo..." 
            disabled={status === 'submitting'}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full py-5 bg-[#E60012] text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>Processing <Loader2 className="w-4 h-4 animate-spin" /></>
          ) : (
            <>Send Request <Send className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
