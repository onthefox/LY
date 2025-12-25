
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
  // 1. Moscow City - Modern Skyscrapers, Night/Dusk
  "https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=2070&auto=format&fit=crop", 
  
  // 2. Hong Kong Panorama - Victoria Harbour, City Lights
  "https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?q=80&w=2070&auto=format&fit=crop", 
];

const HeroCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 8000); // Slower interval for better performance
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-black/40 z-10" /> 
      
      <AnimatePresence mode="popLayout">
        <motion.img
          key={IMAGES[index]}
          src={IMAGES[index]}
          alt="Logistics Background"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.7, scale: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          // Performance optimizations
          decoding="async"
          loading="eager" // Always eager load the active hero image
        />
      </AnimatePresence>
      
      {/* Preload next image invisibly to prevent gap */}
      <div className="hidden">
         <img src={IMAGES[(index + 1) % IMAGES.length]} alt="preload" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b14]/70 via-transparent to-[#0a0b14] z-20" />
    </div>
  );
};

export default HeroCarousel;
