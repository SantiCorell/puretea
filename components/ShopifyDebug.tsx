'use client';

import { useState, useEffect } from 'react';
import { isShopifyConfigured } from "../lib/shopify/client";

export default function ShopifyDebug() {
  const [isVisible, setIsVisible] = useState(true);
  const isConfigured = isShopifyConfigured();
  
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const envFileDetected = process.env.NODE_ENV === 'development' ? "Development" : "Production";

  // Toggle visibility with Ctrl + H so you can hide it during the meeting
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'h') {
        setIsVisible((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Completely remove from DOM if hidden or if in production build
  if (!isVisible || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] p-4 rounded-lg bg-black/95 text-white text-[10px] border border-white/20 shadow-2xl backdrop-blur-md w-64">
      <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
        <h3 className="font-bold text-[#f5f5f1] uppercase tracking-wider text-[9px]">PureTea System Status</h3>
        <span className="text-[8px] opacity-40">Ctrl + H to hide</span>
      </div>
      
      <ul className="space-y-1.5">
        <li className="flex justify-between">
          <span className="opacity-60">API Status</span> 
          <span className={isConfigured ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
            {isConfigured ? "CONNECTED" : "DISCONNECTED"}
          </span>
        </li>
        <li className="flex justify-between gap-4">
          <span className="opacity-60">Storefront</span> 
          <code className="text-yellow-200 truncate max-w-[120px]">
            {domain || "missing_env"}
          </code>
        </li>
        <li className="flex justify-between">
          <span className="opacity-60">Environment</span> 
          <span className="text-blue-300 font-medium">{envFileDetected}</span>
        </li>
        <li className="flex justify-between">
          <span className="opacity-60">Data Cache</span> 
          <span className="text-orange-300 font-medium italic">Bypassed (Live)</span>
        </li>
      </ul>

      {!isConfigured && (
        <div className="mt-3 p-2 bg-red-900/40 border border-red-500/50 rounded text-[9px] text-red-100">
           <strong>CRITICAL:</strong> No Storefront Access Token found. Check your <code>.env.local</code> file.
        </div>
      )}
    </div>
  );
}