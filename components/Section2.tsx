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
    const interval = setInterval(fetchContent, 5000);
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
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
          <div className="grid md:grid-cols-2 gap-8 justify-items-center">
            <div className="w-full max-w-[400px]">
              <ScrollAnimation delay={100}>
                <VideoPlayer 
                  videoUrl={video1Url}
                  title={video1Title}
                  key={video1Url} // Force re-render when URL changes
                />
              </ScrollAnimation>
            </div>
            <div className="w-full max-w-[400px]">
              <ScrollAnimation delay={200}>
                <VideoPlayer 
                  videoUrl={video2Url}
                  title={video2Title}
                  key={video2Url} // Force re-render when URL changes
                />
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
