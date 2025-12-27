"use client";

import { useState, useEffect, useRef } from "react";

interface InstagramReelPlayerProps {
  reelUrl: string;
  title?: string;
  className?: string;
}

export default function InstagramReelPlayer({
  reelUrl,
  title,
  className = "",
}: InstagramReelPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const embedRef = useRef<HTMLDivElement>(null);

  // Extract Instagram post ID from URL
  const getInstagramPostId = (url: string) => {
    const patterns = [
      /\/p\/([A-Za-z0-9_-]+)/,
      /\/reel\/([A-Za-z0-9_-]+)/,
      /\/tv\/([A-Za-z0-9_-]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const postId = getInstagramPostId(reelUrl);

  // Load Instagram embed script and auto-play
  useEffect(() => {
    if (!postId) {
      setError("Invalid Instagram URL");
      setIsLoading(false);
      return;
    }

    // Load Instagram embed script if not already loaded
    if (!(window as any).instgrm) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        initializeEmbed();
      };
      script.onerror = () => {
        setError("Failed to load Instagram embed");
        setIsLoading(false);
      };
      document.body.appendChild(script);
    } else {
      initializeEmbed();
    }
  }, [postId, reelUrl]);

  const initializeEmbed = () => {
    if (!embedRef.current || !postId) return;

    setIsLoading(true);
    
    // Create embed blockquote
    const blockquote = document.createElement('blockquote');
    blockquote.className = 'instagram-media';
    blockquote.setAttribute('data-instgrm-permalink', reelUrl);
    blockquote.setAttribute('data-instgrm-version', '14');
    blockquote.style.background = '#FFF';
    blockquote.style.border = '0';
    blockquote.style.borderRadius = '3px';
    blockquote.style.margin = '1px';
    blockquote.style.maxWidth = '100%';
    blockquote.style.minWidth = '326px';
    blockquote.style.padding = '0';
    blockquote.style.width = '99.375%';

    embedRef.current.innerHTML = '';
    embedRef.current.appendChild(blockquote);

    // Process the embed
    setTimeout(() => {
      if ((window as any).instgrm && (window as any).instgrm.Embeds) {
        (window as any).instgrm.Embeds.process();
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } else {
        setIsLoading(false);
      }
    }, 100);
  };

  const handleOpenInstagram = () => {
    window.open(reelUrl, '_blank', 'noopener,noreferrer');
  };

  if (!postId) {
    return (
      <div className={`relative rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400 ${className}`}>
        <div className="aspect-[9/16] w-full relative bg-gray-800 flex items-center justify-center text-white text-center p-4 max-w-sm mx-auto">
          <p>Invalid Instagram URL</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400 ${className}`}>
      <div className="aspect-[9/16] w-full relative bg-black max-w-sm mx-auto overflow-hidden">
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-30">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-sm">Loading Instagram Reel...</p>
            </div>
          </div>
        )}

        {/* Instagram Embed Container */}
        <div 
          ref={embedRef}
          className="w-full h-full instagram-video-only"
          style={{ 
            position: 'relative',
            overflow: 'hidden'
          }}
        />

        {/* Black overlay at bottom to hide UI only */}
        <div className="absolute bottom-0 left-0 right-0 h-[22%] bg-black z-20 pointer-events-none"></div>
        
        {/* Black overlay on sides to hide sidebars */}
        <div className="absolute top-0 bottom-[22%] left-0 w-[5%] bg-black z-20 pointer-events-none"></div>
        <div className="absolute top-0 bottom-[22%] right-0 w-[5%] bg-black z-20 pointer-events-none"></div>

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-30">
            <div className="text-center p-6">
              <p className="text-white mb-4">{error}</p>
              <button
                onClick={handleOpenInstagram}
                className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
              >
                Open in Instagram
              </button>
            </div>
          </div>
        )}

        {/* Title Overlay */}
        {title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 z-20 pointer-events-none">
            <p className="text-white font-black text-base">{title}</p>
          </div>
        )}
      </div>
    </div>
  );
}
