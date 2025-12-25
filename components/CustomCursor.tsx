
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Initialize off-screen
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Stiffer spring for a more "precision tool" feel
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      // Expanded hover detection for better UX
      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('input') ||
                        target.closest('textarea') ||
                        target.closest('[data-hover="true"]') ||
                        target.closest('.cursor-pointer');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center hidden md:flex will-change-transform"
      style={{ 
        x, 
        y, 
      }}
    >
      {/* The Container Frame (Active State - Only on Hover) */}
      <motion.div
        className="absolute border-[#E60012]"
        initial={false}
        animate={{
          width: isHovering ? 40 : 0,
          height: isHovering ? 40 : 0,
          opacity: isHovering ? 1 : 0,
          borderWidth: isHovering ? 1 : 0, // Animate thickness
          rotate: isHovering ? 0 : 45,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          backgroundColor: 'rgba(230, 0, 18, 0.05)',
          backdropFilter: 'blur(1px)',
          x: "-50%",
          y: "-50%",
          boxSizing: 'border-box'
        }}
      />

      {/* Corner Accents - 4 Independent Brackets */}
      {/* Top Left */}
      <motion.div 
         className="absolute border-t border-l border-[#E60012]"
         animate={{
            width: isHovering ? 8 : 0,
            height: isHovering ? 8 : 0,
            opacity: isHovering ? 1 : 0,
            x: isHovering ? -26 : 0,
            y: isHovering ? -26 : 0,
         }}
         transition={{ duration: 0.3, ease: "easeOut" }}
      />
      {/* Top Right */}
      <motion.div 
         className="absolute border-t border-r border-[#E60012]"
         animate={{
            width: isHovering ? 8 : 0,
            height: isHovering ? 8 : 0,
            opacity: isHovering ? 1 : 0,
            x: isHovering ? 18 : 0, // 26 - 8 = 18
            y: isHovering ? -26 : 0,
         }}
         transition={{ duration: 0.3, ease: "easeOut" }}
      />
      {/* Bottom Left */}
      <motion.div 
         className="absolute border-b border-l border-[#E60012]"
         animate={{
            width: isHovering ? 8 : 0,
            height: isHovering ? 8 : 0,
            opacity: isHovering ? 1 : 0,
            x: isHovering ? -26 : 0,
            y: isHovering ? 18 : 0, // 26 - 8 = 18
         }}
         transition={{ duration: 0.3, ease: "easeOut" }}
      />
      {/* Bottom Right */}
      <motion.div 
         className="absolute border-b border-r border-[#E60012]"
         animate={{
            width: isHovering ? 8 : 0,
            height: isHovering ? 8 : 0,
            opacity: isHovering ? 1 : 0,
            x: isHovering ? 18 : 0,
            y: isHovering ? 18 : 0,
         }}
         transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* The Navigation Dot (Idle State - Only when NOT Hovering) */}
      <motion.div
        className="absolute bg-[#E60012]"
        animate={{
          scale: isHovering ? 0 : 1, // Disappears completely when hovering
          rotate: 45 // Diamond shape
        }}
        style={{ 
          width: 8, 
          height: 8,
          x: "-50%",
          y: "-50%" 
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default CustomCursor;
