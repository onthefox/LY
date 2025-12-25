
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = React.memo(() => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0b14] pointer-events-none transform-gpu">
      
      {/* Optimized Blobs - Red and Gold Theme */}
      {/* Use will-change-transform to hint browsers to promote to own layer */}
      
      {/* Blob 1: China Red (Main) */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-[0.12] will-change-transform"
        animate={{
          x: [0, 30, 0], 
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ 
          backgroundColor: "#E60012", // China Red
          filter: "blur(60px)"
        }}
      />

      {/* Blob 2: Imperial Gold (Accent) */}
      <motion.div
        className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full opacity-[0.08] will-change-transform"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{ 
          backgroundColor: "#FFD700", // Imperial Gold
          filter: "blur(50px)"
        }}
      />
      
      {/* Blob 3: Deep Burgundy (Depth) */}
      <motion.div
        className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full opacity-[0.1] will-change-transform"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{ 
          backgroundColor: "#5c0000", // Dark Red
          filter: "blur(70px)"
        }}
      />

      {/* Static Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(10,11,20,0.85)_80%)]" />
    </div>
  );
});

export default FluidBackground;
