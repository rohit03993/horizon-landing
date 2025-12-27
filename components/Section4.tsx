"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import ScrollAnimation from "./ScrollAnimation";

export default function Section4() {
  const [content, setContent] = useState<any>(null);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content?t=" + Date.now());
      const data = await response.json();
      const sectionData = data.content?.find((item: any) => item.section_key === "section4");
      if (sectionData?.contentData) {
        setContent(sectionData.contentData);
      }
    } catch (err) {
      console.error("Error fetching content:", err);
    }
  };

  useEffect(() => {
    fetchContent();
    const interval = setInterval(fetchContent, 5000);
    return () => clearInterval(interval);
  }, []);

  const heading = content?.heading || "Agra's Best GTO Ground";
  const subheading = content?.subheading || "For Defence Aspirants";
  const description = content?.description || "Real training. Real obstacles. Real confidence for future officers.";
  const video1Url = content?.video1Url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreet.mp4";
  const video1Title = content?.video1Title || "GTO Ground Training";
  const video2Url = content?.video2Url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";
  const video2Title = content?.video2Title || "Teamwork & Command Tasks";

  return (
    <section className="py-20 md:py-28 bg-gray-50 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto w-full">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-6">
                {heading}
                <span className="block text-yellow-400 mt-2">{subheading}</span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
                {description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <ScrollAnimation delay={100}>
                  <div className="flex items-center gap-2 px-6 py-3 bg-black border-2 border-yellow-400 rounded-lg">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-black text-white">Indian Army</span>
                  </div>
                </ScrollAnimation>
                <ScrollAnimation delay={150}>
                  <div className="flex items-center gap-2 px-6 py-3 bg-black border-2 border-yellow-400 rounded-lg">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-black text-white">Indian Navy</span>
                  </div>
                </ScrollAnimation>
                <ScrollAnimation delay={200}>
                  <div className="flex items-center gap-2 px-6 py-3 bg-black border-2 border-yellow-400 rounded-lg">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-black text-white">Indian Air Force</span>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </ScrollAnimation>
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 justify-items-center">
            <div className="w-full max-w-[400px]">
              <ScrollAnimation delay={300}>
                <VideoPlayer 
                  videoUrl={video1Url}
                  title={video1Title}
                  key={video1Url}
                />
              </ScrollAnimation>
            </div>
            <div className="w-full max-w-[400px]">
              <ScrollAnimation delay={400}>
                <VideoPlayer 
                  videoUrl={video2Url}
                  title={video2Title}
                  key={video2Url}
                />
              </ScrollAnimation>
            </div>
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden relative">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory px-4" style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}>
              <div className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center">
                <VideoPlayer 
                  videoUrl={video1Url}
                  title={video1Title}
                  key={video1Url}
                />
              </div>
              <div className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center">
                <VideoPlayer 
                  videoUrl={video2Url}
                  title={video2Title}
                  key={video2Url}
                />
              </div>
            </div>
            {/* Fade edges indicator */}
            <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
