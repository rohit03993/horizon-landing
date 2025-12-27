"use client";

import { useState, useRef } from "react";
import InstagramReelPlayer from "./InstagramReelPlayer";

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  className?: string;
  isInstagramReel?: boolean;
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

  // Auto-detect Instagram URLs
  const isInstagramUrl = videoUrl.includes('instagram.com') || isInstagramReel;

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
      <div className={`relative rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400 ${className} w-full`}>
        <div className="aspect-[9/16] w-full relative bg-gray-800 flex items-center justify-center" style={{ minWidth: '280px', maxWidth: '400px', margin: '0 auto' }}>
          <p className="text-white text-sm">No video URL provided</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400 ${className} w-full`}>
      <div className="aspect-[9/16] w-full relative bg-black" style={{ minWidth: '280px', maxWidth: '400px', margin: '0 auto' }}>
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
              <div className="w-20 h-20 bg-yellow-400/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                <svg
                  className="w-10 h-10 text-black ml-1"
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
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 z-20">
            <p className="text-white font-black text-base">{title}</p>
          </div>
        )}
      </div>
    </div>
  );
}
