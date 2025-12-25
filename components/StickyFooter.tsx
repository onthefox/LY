
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

const StickyFooter: React.FC = () => {
  const socialLinks = [
    { name: 'Instagram', icon: Instagram },
    { name: 'Facebook', icon: Facebook },
    { name: 'Twitter', icon: Twitter },
    { name: 'LinkedIn', icon: Linkedin },
    { name: 'Email', icon: Mail },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center items-center py-4 bg-[#0a0b14]/90 backdrop-blur-xl border-t border-white/5 pointer-events-auto">
       <div className="flex gap-8 md:gap-12">
         {socialLinks.map((link) => (
           <motion.a 
             key={link.name}
             href="#" 
             className="group relative text-white/40 hover:text-[#E60012] transition-colors duration-300 flex flex-col items-center" 
             aria-label={link.name}
             whileHover={{ scale: 1.2 }}
             whileTap={{ scale: 0.9 }}
             transition={{ type: "spring", stiffness: 400, damping: 10 }}
           >
             <link.icon className="w-5 h-5"/>
             <span className="absolute bottom-full mb-3 px-2 py-1 text-[10px] font-bold bg-black border border-[#E60012]/30 rounded text-[#FFD700] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
               {link.name}
             </span>
           </motion.a>
         ))}
       </div>
    </div>
  );
};

export default StickyFooter;
