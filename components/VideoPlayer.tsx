"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import InstagramReelPlayer from "./InstagramReelPlayer";

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  className?: string;
  isInstagramReel?: boolean;
}

// Helper function to normalize YouTube URL
function normalizeYouTubeUrl(url: string): string {
  if (!url) return url;
  // If it's already a full URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // If it starts with youtube.com or youtu.be, add https://
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return `https://${url}`;
  }
  return url;
}

// Helper function to extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  const normalizedUrl = normalizeYouTubeUrl(url);
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = normalizedUrl.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Helper function to check if URL is YouTube
function isYouTubeUrl(url: string): boolean {
  const normalizedUrl = normalizeYouTubeUrl(url);
  return /youtube\.com|youtu\.be/.test(normalizedUrl);
}

export default function VideoPlayer({ 
  videoUrl, 
  title, 
  className = "",
  isInstagramReel 
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);

  // Reset playing state when video URL changes
  useEffect(() => {
    setIsPlaying(false);
    setIsLoading(false);
  }, [videoUrl]);

  // Normalize and auto-detect video type
  const normalizedUrl = normalizeYouTubeUrl(videoUrl);
  const isInstagramUrl = videoUrl.includes('instagram.com') || isInstagramReel;
  const isYouTube = isYouTubeUrl(videoUrl);
  const youtubeVideoId = useMemo(() => isYouTube ? getYouTubeVideoId(videoUrl) : null, [videoUrl, isYouTube]);

  // If it's an Instagram URL, use the InstagramReelPlayer
  if (isInstagramUrl) {
    return (
      <InstagramReelPlayer
        reelUrl={videoUrl}
        title={title}
        className={className}
      />
    );
  }

  // If it's a YouTube URL, use YouTube embed
  if (isYouTube && youtubeVideoId) {
    // For YouTube Shorts, use the shorts embed URL, otherwise use regular embed
    const isShorts = normalizedUrl.includes('/shorts/');
    // Get the current origin for YouTube embed (helps avoid Error 153)
    // Use a fallback if window is not available (shouldn't happen in client component, but safety first)
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://horizoncompetitionschool.com';
    // Use mute=1 initially (browsers block unmuted autoplay), user can unmute after click
    // Add origin parameter to help YouTube identify the embedding domain and avoid Error 153
    const baseParams = `autoplay=1&mute=1&controls=1&rel=0&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(origin)}`;
    const embedUrl = isShorts 
      ? `https://www.youtube.com/embed/${youtubeVideoId}?${baseParams}&loop=1`
      : `https://www.youtube.com/embed/${youtubeVideoId}?${baseParams}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;
    
    return (
      <div className={`relative rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-yellow-400 ${className} w-full`} style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
        <div className="aspect-[9/16] w-full relative bg-black" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
          {!isPlaying ? (
            <div
              className="absolute inset-0 cursor-pointer group"
              onClick={() => setIsPlaying(true)}
            >
              {/* YouTube Thumbnail */}
              <img
                src={thumbnailUrl}
                alt={title || "YouTube video"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to default thumbnail if maxresdefault doesn't exist
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`;
                }}
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-400/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-black ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <iframe
              key={`youtube-${youtubeVideoId}-${isPlaying}`}
              src={embedUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
              style={{ border: 'none', display: 'block', width: '100%', height: '100%', minHeight: '100%' }}
              title={title || "YouTube video"}
              loading="eager"
              onLoad={() => {
                console.log('YouTube iframe loaded successfully');
              }}
              onError={(e) => {
                console.error('YouTube iframe error:', e);
              }}
            />
          )}
          
          {/* Title Overlay */}
          {title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 sm:p-4 z-20">
              <p className="text-white font-black text-sm sm:text-base">{title}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const handlePlay = () => {
    setIsLoading(true);
    setIsPlaying(true);
    
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          setIsLoading(false);
          setIsPlaying(false);
        });
      }
    }, 100);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setIsPlaying(false);
  };

  if (!videoUrl) {
    return (
      <div className={`relative rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-yellow-400 ${className} w-full`} style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
        <div className="aspect-[9/16] w-full relative bg-gray-800 flex items-center justify-center" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
          <p className="text-white text-sm">No video URL provided</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-yellow-400 ${className} w-full`} style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
      <div className="aspect-[9/16] w-full relative bg-black" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
        {!isPlaying ? (
          // Thumbnail/Preview State - Video Preview with Play Button
          <div
            className="absolute inset-0 cursor-pointer group"
            onClick={handlePlay}
          >
            {/* Video Preview - Auto-playing muted loop */}
            <video
              ref={previewRef}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onError={(e) => {
                console.error('Video preview error:', e);
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-400/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-black ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          // Video Playing State - Full Controls
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {isLoading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        )}

        {/* Title Overlay */}
        {title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 sm:p-4 z-20">
            <p className="text-white font-black text-sm sm:text-base">{title}</p>
          </div>
        )}
      </div>
    </div>
  );
}
