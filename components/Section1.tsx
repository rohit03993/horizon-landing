"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import ScrollAnimation from "./ScrollAnimation";

export default function Section1() {
  const [content, setContent] = useState<any>(null);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content?t=" + Date.now());
      const data = await response.json();
      const sectionData = data.content?.find((item: any) => item.section_key === "section1");
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

  const heading = content?.heading || "Not Just a School.";
  const subheading = content?.subheading || "A Future-Building Institution.";
  const description = content?.description || "We combine strong academics with practical learning, discipline, and real-world exposure.";
  const videoUrl = content?.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
  const videoTitle = content?.videoTitle || "Classroom & Practical Learning";

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Strong Academics",
      description: "Comprehensive curriculum designed for excellence",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Practical Learning",
      description: "Hands-on experiences that bring concepts to life",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Discipline & Values",
      description: "Building character and integrity from day one",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Real-World Exposure",
      description: "Connecting education with practical career paths",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-yellow-400 text-black rounded-full text-sm font-black mb-4">
                What Makes Us Different
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-6">
                {heading}
                <span className="block text-yellow-400 mt-2">
                  {subheading}
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>
          </ScrollAnimation>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <ScrollAnimation key={index} delay={index * 100}>
                  <div className="group p-6 rounded-2xl border-2 border-black hover:border-yellow-400 hover:shadow-xl transition-all duration-300 bg-white">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-400 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-xl mb-2 text-black">{feature.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            {/* Video */}
            <ScrollAnimation delay={200}>
              <div className="relative w-full max-w-full sm:max-w-[400px] mx-auto px-2 sm:px-0">
                <div className="absolute -inset-2 sm:-inset-4 bg-yellow-400 rounded-3xl blur-2xl opacity-30"></div>
                <div className="relative">
                  <VideoPlayer 
                    videoUrl={videoUrl}
                    title={videoTitle}
                    key={videoUrl}
                  />
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
