/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LongYingLogoProps {
  className?: string;
  variant?: 'flat' | '3d';
  size?: 'sm' | 'md' | 'lg';
}

const LongYingLogo: React.FC<LongYingLogoProps> = ({
  className = '',
  variant = 'flat',
  size = 'md'
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  } as const;

  type SizeKey = keyof typeof sizeMap;
  const sizeClasses = sizeMap;

  // If the user uploads a logo file, we can replace this SVG with an <img /> tag.
  // For now, we enhance the SVG to match the "Golden Eagle" description more closely.

  return (
    <svg
      viewBox="0 0 200 200"
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      aria-label="Long Ying Logistics Logo"
    >
      <defs>
        <linearGradient id="eagleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A55F" />
          <stop offset="50%" stopColor="#B38B4D" />
          <stop offset="100%" stopColor="#8C6D3B" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Stylized Double Eagle / Griffin Motif */}
      <g stroke="url(#eagleGradient)" strokeWidth="2" fill="none" filter={variant === '3d' ? 'url(#glow)' : undefined}>
         {/* Left Wing */}
         <path d="M20 60 Q 60 20 90 50 L 90 90 Q 50 100 20 60 Z" />
         {/* Right Wing */}
         <path d="M180 60 Q 140 20 110 50 L 110 90 Q 150 100 180 60 Z" />

         {/* Central Shield/Body */}
         <path d="M90 50 L 110 50 L 110 120 L 100 130 L 90 120 Z" fill={variant === '3d' ? "url(#eagleGradient)" : "none"} opacity={variant === '3d' ? 0.8 : 1} />

         {/* Heads */}
         <circle cx="85" cy="45" r="8" />
         <circle cx="115" cy="45" r="8" />

         {/* Tail */}
         <path d="M90 120 L 80 140 L 100 150 L 120 140 L 110 120" />
      </g>

      {/* Silk Road Flow Lines */}
      <path
        d="M10 100 Q 100 160 190 100"
        stroke="#D4A55F"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.5"
      />
    </svg>
  );
};

export default LongYingLogo;