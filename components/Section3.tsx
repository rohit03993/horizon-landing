"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import ScrollAnimation from "./ScrollAnimation";

export default function Section3() {
  const [content, setContent] = useState<any>(null);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content?t=" + Date.now());
      const data = await response.json();
      const sectionData = data.content?.find((item: any) => item.section_key === "section3");
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

  const heading = content?.heading || "Government Job Preparation";
  const subheading = content?.subheading || "Built Into School Life";
  const description = content?.description || "The only school in North India where competitive exam foundations are part of the regular curriculum.";
  const video1Url = content?.video1Url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
  const video1Title = content?.video1Title || "NDA Foundation Training";
  const video2Url = content?.video2Url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";
  const video2Title = content?.video2Title || "Reasoning & Aptitude";
  const video3Url = content?.video3Url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4";
  const video3Title = content?.video3Title || "Discipline & Values";

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-yellow-400 text-black rounded-full text-sm font-black mb-4">
                UNIQUE IN NORTH INDIA
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-6">
                {heading}
                <span className="block text-yellow-400 mt-2">{subheading}</span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid md:grid-cols-3 gap-6 justify-items-center">
            <div className="w-full max-w-[350px]">
              <ScrollAnimation delay={100}>
                <VideoPlayer 
                  videoUrl={video1Url}
                  title={video1Title}
                  key={video1Url}
                />
              </ScrollAnimation>
            </div>
            <div className="w-full max-w-[350px]">
              <ScrollAnimation delay={200}>
                <VideoPlayer 
                  videoUrl={video2Url}
                  title={video2Title}
                  key={video2Url}
                />
              </ScrollAnimation>
            </div>
            <div className="w-full max-w-[350px]">
              <ScrollAnimation delay={300}>
                <VideoPlayer 
                  videoUrl={video3Url}
                  title={video3Title}
                  key={video3Url}
                />
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
