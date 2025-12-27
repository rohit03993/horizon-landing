"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import ScrollAnimation from "./ScrollAnimation";

export default function Section7() {
  const [content, setContent] = useState<any>(null);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content?t=" + Date.now());
      const data = await response.json();
      const sectionData = data.content?.find((item: any) => item.section_key === "section7");
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

  const heading = content?.heading || "A Message from";
  const subheading = content?.subheading || "the Director";
  const description = content?.description || "Our vision is to prepare disciplined, confident, and capable citizens for the nation.";
  const videoUrl = content?.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
  const videoTitle = content?.videoTitle || "Director's Message";

  return (
    <section className="py-20 md:py-28 bg-black overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <div className="max-w-4xl mx-auto w-full">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
                {heading}
                <span className="block text-yellow-400 mt-2">{subheading}</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <div className="max-w-full sm:max-w-[400px] mx-auto px-2 sm:px-0">
              <VideoPlayer 
                videoUrl={videoUrl}
                title={videoTitle}
                key={videoUrl}
              />
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
