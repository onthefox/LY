
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const GradientText: React.FC<GradientTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block font-heading isolate ${className}`}>
      {/* Main Gradient Text - Red to Gold */}
      <motion.span
        className="absolute inset-0 z-10 block bg-gradient-to-r from-[#E60012] via-[#FFD700] via-[#E60012] via-[#FFD700] to-[#E60012] bg-[length:200%_auto] bg-clip-text text-transparent will-change-[background-position]"
        animate={{
          backgroundPosition: ['0% center', '200% center'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {text}
      </motion.span>
      
      {/* Base layer */}
      <span 
        className="block text-[#E60012] opacity-50"
      >
        {text}
      </span>
      
      {/* Glow Effect - Red/Gold */}
      <span
        className="absolute inset-0 -z-10 block bg-gradient-to-r from-[#E60012] to-[#FFD700] bg-clip-text text-transparent blur-2xl opacity-40"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)' 
        }}
      >
        {text}
      </span>
    </Component>
  );
};

export default GradientText;
