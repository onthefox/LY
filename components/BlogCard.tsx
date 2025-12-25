
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Hash, Globe } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative flex flex-col justify-between h-full bg-[#151725] border border-white/5 p-6 md:p-8 hover:border-[#E60012]/30 transition-colors duration-300"
    >
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E60012]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FFD700]/80 border border-[#FFD700]/20 px-2 py-1 rounded-sm">
            <Calendar className="w-3 h-3" />
            {post.date}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-white/30">
            <Globe className="w-3 h-3" />
            {post.sourceUrl ? (
              <a 
                href={post.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="truncate max-w-[100px] hover:text-[#E60012] transition-colors border-b border-transparent hover:border-[#E60012]"
              >
                {post.sourceName || 'Source'}
              </a>
            ) : (
              <span className="truncate max-w-[100px]">{post.sourceName || 'AI Analysis'}</span>
            )}
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-heading text-white mb-4 group-hover:text-[#E60012] transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 line-clamp-4">
          {post.summary}
        </p>
      </div>

      <div className="relative z-10 pt-6 border-t border-white/5 flex items-end justify-between">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-[10px] uppercase tracking-wider text-white/40 flex items-center gap-1">
              <Hash className="w-2 h-2" /> {tag}
            </span>
          ))}
        </div>
        
        {post.sourceUrl ? (
          <a 
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 text-white/50 group-hover:bg-[#E60012] group-hover:text-white transition-all duration-300"
          >
            <ArrowUpRight className="w-5 h-5" />
          </a>
        ) : (
          <button className="p-2 rounded-full bg-white/5 text-white/50 group-hover:bg-[#E60012] group-hover:text-white transition-all duration-300">
            <ArrowUpRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default BlogCard;
