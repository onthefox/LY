
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceItem } from '../types';
import { Box, Clock, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';

interface ServiceCardProps {
  artist: ServiceItem;
  onClick: () => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 1.05
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 200, damping: 25 }, 
      opacity: { duration: 0.4 },
      scale: { duration: 0.6, ease: "easeOut" }
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 1.05,
    transition: {
      x: { type: "spring", stiffness: 200, damping: 25 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.6, ease: "easeIn" }
    }
  })
};

const ArtistCard: React.FC<ServiceCardProps> = ({ artist, onClick }) => {
  const Icon = artist.icon;
  const images = artist.gallery && artist.gallery.length > 0 ? artist.gallery : [artist.image];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Preload next image to avoid lag
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    const img = new Image();
    img.src = images[nextIndex];
  }, [currentIndex, images]);

  const paginate = (newDirection: number) => {
    setIsImageLoaded(false); // Reset load state for new image
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    paginate(1);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    paginate(-1);
  };

  return (
    <motion.div
      className="group relative h-[450px] md:h-[500px] w-full overflow-hidden border border-white/5 bg-[#1a1c2e] cursor-pointer will-change-transform rounded-sm"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      onClick={onClick}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0, 
          borderColor: "rgba(255, 255, 255, 0.05)",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          transition: { duration: 0.8, ease: "easeOut" } 
        },
        hover: {
          y: -5,
          borderColor: "rgba(255, 215, 0, 0.5)", // Gold border accent
          boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 215, 0, 0.15), inset 0 0 0 1px rgba(255, 215, 0, 0.1)", // Subtle gold glow
          transition: { duration: 0.5, ease: "circOut" }
        }
      }}
    >
      {/* Image Container with Slide Effect */}
      <div className="absolute inset-0 overflow-hidden bg-[#0a0b14]">
        
        {/* Loading Spinner Overlay */}
        <AnimatePresence>
          {!isImageLoaded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-[#1a1c2e]"
            >
               <Loader2 className="w-8 h-8 text-[#E60012] animate-spin opacity-80" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false} custom={direction}>
           <motion.img 
             key={currentIndex}
             src={images[currentIndex]} 
             custom={direction}
             variants={slideVariants}
             initial="enter"
             animate="center"
             exit="exit"
             onLoad={() => setIsImageLoaded(true)}
             // Cinematic slow zoom & blur on hover
             className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:blur-[3px]"
             alt={`${artist.name} view ${currentIndex + 1}`}
             loading="lazy"
             decoding="async"
           />
        </AnimatePresence>
        
        {/* Adjusted Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b14] via-[#0a0b14]/40 to-transparent opacity-30 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />
        
        {/* Premium Red/Gold Shine on Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#E60012]/10 via-transparent to-[#FFD700]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay pointer-events-none" />
      </div>

      {/* Gallery Navigation Controls */}
      {images.length > 1 && (
        <>
          {/* Subtle Arrow Buttons - Visible on Hover */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-4 z-40 pointer-events-none">
             <motion.button
               initial={{ opacity: 0, x: -10 }}
               whileHover={{ scale: 1.1, backgroundColor: "#E60012", borderColor: "#E60012", color: "white" }}
               whileTap={{ scale: 0.95 }}
               onClick={prevImage}
               className="pointer-events-auto p-2 rounded-full bg-black/40 border border-white/10 text-white/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-4"
               aria-label="Previous image"
             >
                <ChevronLeft className="w-5 h-5" />
             </motion.button>
             
             <motion.button
               initial={{ opacity: 0, x: 10 }}
               whileHover={{ scale: 1.1, backgroundColor: "#E60012", borderColor: "#E60012", color: "white" }}
               whileTap={{ scale: 0.95 }}
               onClick={nextImage}
               className="pointer-events-auto p-2 rounded-full bg-black/40 border border-white/10 text-white/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-4"
               aria-label="Next image"
             >
                <ChevronRight className="w-5 h-5" />
             </motion.button>
          </div>

          {/* Progress Indicators (Top Right) */}
          <div className="absolute top-4 right-4 z-40 flex gap-1.5 pointer-events-none">
            {images.map((_, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: -5 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  width: idx === currentIndex ? 24 : 6,
                  backgroundColor: idx === currentIndex ? "#E60012" : "rgba(255,255,255,0.3)"
                }}
                transition={{ duration: 0.3 }}
                className="h-1 rounded-full shadow-sm backdrop-blur-sm"
              />
            ))}
          </div>
        </>
      )}

      {/* Content Container (Bottom) */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-30 pointer-events-none">
        
        {/* Top Label */}
        <div className="flex justify-between items-start">
           <span className="text-xs font-mono border border-white/10 px-3 py-1.5 flex items-center gap-2 bg-black/40 backdrop-blur-md text-white/70 rounded-sm group-hover:border-[#E60012]/50 group-hover:text-[#FFD700] transition-colors duration-300 pointer-events-auto">
             <Clock className="w-3 h-3" />
             {artist.deliveryTime}
           </span>
        </div>

        {/* Bottom Info */}
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out mt-auto">
           <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700] mb-2 flex items-center gap-2">
            <Box className="w-3 h-3" />
            {artist.category}
          </p>
          
          <h3 className="font-heading text-2xl md:text-3xl text-white mb-2 flex items-center gap-3 drop-shadow-lg">
            {artist.name}
          </h3>

          <div className="mb-4">
             <Icon className="w-8 h-8 text-white/50 group-hover:text-[#E60012] transition-colors duration-500" strokeWidth={1} />
          </div>

          <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 pointer-events-auto">
             <button 
               className="w-full py-3 border-t border-[#E60012]/30 text-[#E60012] text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3 pt-4 hover:text-white transition-colors"
             >
               View Details <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
