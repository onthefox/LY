
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Loader2, Newspaper } from 'lucide-react';
import { BlogPost } from '../types';
import { generateBlogInsights } from '../services/geminiService';
import BlogCard from './BlogCard';

// Initial dummy data to populate the section before search
const INITIAL_POSTS: BlogPost[] = [
  {
    title: "New Electric Vehicle Tariffs Impact China-Russia Trade Corridor",
    summary: "Recent regulatory changes have introduced new excise duties on EVs imported via land routes. Logistics providers are rerouting through Kazakhstan to mitigate cost increases.",
    date: "2024-10-12",
    sourceName: "Logistics Weekly",
    tags: ["EV", "Tariffs", "Regulations"]
  },
  {
    title: "Railway Congestion at Zabaikalsk Border Crossing",
    summary: "Increased trade volume has led to a 5-day delay at key railway checkpoints. Priority is currently being given to perishable goods and strategic machinery components.",
    date: "2024-10-10",
    sourceName: "RailFreight CN",
    tags: ["Rail", "Delays", "Infrastructure"]
  },
  {
    title: "Digital Ruble Implementation in Cross-Border Settlements",
    summary: "Pilot programs for settling B2B logistics payments using the Digital Ruble have shown a 40% reduction in transaction processing time compared to SWIFT alternatives.",
    date: "2024-10-08",
    sourceName: "FinTech Asia",
    tags: ["Finance", "Crypto", "Payments"]
  }
];

const BlogSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [isSearching, setIsSearching] = useState(false);

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    // Clear old posts to show we are thinking, or keep them? Let's keep them but overlay loading.
    
    const results = await generateBlogInsights(query);
    
    if (results && results.length > 0) {
      setPosts(results);
    }
    
    setIsSearching(false);
  };

  return (
    <section id="insights" className="py-24 bg-[#0e101b] border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#E60012]/5 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Area with AI Agent Input */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
             <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#FFD700]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700]">AI Research Agent</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-heading text-white mb-4">
               Market Insights
             </h2>
             <p className="text-white/40 font-light text-sm tracking-wide leading-relaxed">
               Deploy our AI agent to scan global news sources for real-time intelligence. 
               Enter any topic—from "Sanctions" to "Weather Patterns"—and see how it impacts your supply chain.
             </p>
          </div>

          {/* AI Search Interface */}
          <div className="w-full md:w-1/2 lg:w-1/3">
            <form onSubmit={handleResearch} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E60012]/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center bg-[#151725] border border-white/10 p-2 rounded-sm focus-within:border-[#E60012]/50 transition-colors">
                <Search className="w-5 h-5 text-white/30 ml-3" />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Research (e.g., 'Currency', 'Oil Prices')..."
                  className="flex-1 bg-transparent border-none outline-none text-white px-4 py-3 placeholder-white/20 text-sm font-sans"
                  disabled={isSearching}
                />
                <button 
                  type="submit"
                  disabled={isSearching || !query.trim()}
                  className="bg-[#E60012] hover:bg-[#c4000f] text-white px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate'}
                </button>
              </div>
              <div className="mt-2 flex justify-end gap-3 text-[10px] text-white/30 uppercase tracking-widest">
                 <span>Powered by Gemini 2.5</span>
                 <span className="flex items-center gap-1"><Newspaper className="w-3 h-3"/> Google Search Grounding</span>
              </div>
            </form>
          </div>
        </div>

        {/* Results Grid */}
        <div className="relative min-h-[300px]">
          {isSearching && (
            <div className="absolute inset-0 z-20 bg-[#0e101b]/80 backdrop-blur-sm flex items-center justify-center">
               <div className="flex flex-col items-center gap-4">
                 <Loader2 className="w-12 h-12 text-[#E60012] animate-spin" />
                 <p className="text-[#FFD700] text-xs font-mono animate-pulse">Scanning Global Indexes...</p>
               </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <BlogCard key={idx} post={post} index={idx} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
