"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import ScrollAnimation from "./ScrollAnimation";

export default function Section2() {
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content?t=" + Date.now()); // Cache bust
      const data = await response.json();
      const sectionData = data.content?.find((item: any) => item.section_key === "section2");
      if (sectionData?.contentData) {
        setContent(sectionData.contentData);
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching content:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
    // Refresh every 5 seconds to get latest content
    const interval = setInterval(fetchContent, 2000);
    return () => clearInterval(interval);
  }, []);

  const heading = content?.heading || "Learning by Doing,";
  const subheading = content?.subheading || "Not Memorizing";
  const description = content?.description || "Students understand concepts through practical application, activities, and guided experiences.";
  const video1Url = content?.video1Url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
  const video1Title = content?.video1Title || "Science Labs & Experiments";
  const video2Url = content?.video2Url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";
  const video2Title = content?.video2Title || "Interactive Classroom Learning";

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
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>
          </ScrollAnimation>
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 justify-items-center">
            <div className="w-full max-w-[400px]">
              <ScrollAnimation delay={100}>
                <VideoPlayer 
                  videoUrl={video1Url}
                  title={video1Title}
                  key={video1Url}
                />
              </ScrollAnimation>
            </div>
            <div className="w-full max-w-[400px]">
              <ScrollAnimation delay={200}>
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
