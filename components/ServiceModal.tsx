
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, ChevronRight, Box, Clock } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem;
  onClose: () => void;
  onRequestQuote: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onRequestQuote }) => {
  
  // Variants for the content container to stagger children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3, // Wait for the modal entry animation to settle slightly
      },
    },
  };

  // Variants for individual items (fade up)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl cursor-auto"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl bg-[#151725] border border-[#E60012]/20 flex flex-col md:flex-row shadow-2xl rounded-sm overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-white/50 hover:text-[#E60012] transition-colors bg-black/20 backdrop-blur-md rounded-full md:bg-transparent md:rounded-none"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black">
          <motion.img 
            key={service.id}
            src={service.image} 
            alt={service.name} 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#151725]/50 to-[#151725]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151725] via-transparent to-transparent md:hidden opacity-80" />
        </div>

        {/* Content Section */}
        <motion.div 
          className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
           
           <motion.h3 
             variants={itemVariants}
             className="text-3xl md:text-5xl font-heading text-white mb-6 leading-tight"
           >
             {service.name}
           </motion.h3>
           
           {/* Prominent Details Grid */}
           <motion.div 
             variants={itemVariants}
             className="flex flex-wrap gap-4 mb-8"
           >
             <div className="flex items-center gap-3 px-4 py-2 bg-[#E60012]/10 border border-[#E60012]/20 rounded-sm">
                <Box className="w-4 h-4 text-[#E60012]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#E60012]">{service.category}</span>
             </div>

             <div className="flex items-center gap-3 px-4 py-2 border border-white/10 rounded-sm bg-white/5">
                <Clock className="w-4 h-4 text-white/60" />
                <span className="text-xs font-mono text-white/80">{service.deliveryTime}</span>
             </div>
           </motion.div>
           
           <motion.div 
             variants={itemVariants}
             className="w-full h-px bg-gradient-to-r from-white/10 to-transparent mb-8" 
           />
           
           <motion.p 
             variants={itemVariants}
             className="text-gray-300 text-base md:text-lg font-light leading-relaxed mb-10"
           >
             {service.description}
           </motion.p>

           <motion.div 
             variants={itemVariants}
             className="flex flex-col sm:flex-row gap-4"
           >
             <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                  setTimeout(onRequestQuote, 100);
                }}
                className="flex items-center gap-4 px-8 py-4 bg-[#E60012] text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors group w-fit"
              >
                Request Quote <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
             </button>
           </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceModal;
