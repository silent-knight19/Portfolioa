import React from 'react';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#0b0c0e]">
      {/* Ultra-subtle ambient warmth - top right */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#f59e0b]/[0.025] blur-[140px]" />
      
      {/* Ultra-subtle ambient depth - bottom left */}
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#38bdf8]/[0.018] blur-[140px]" />

      {/* Editorial subtle micro-dot grid pattern */}
      <div className="editorial-grid absolute inset-0 opacity-40" />
    </div>
  );
}
