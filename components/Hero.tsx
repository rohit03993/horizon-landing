"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";

// Default rotating words (only the last word changes)
const defaultRotatingWords = [
  "Classrooms",
  "Boundaries",
  "Limits",
  "Expectations",
  "Convention",
  "Tradition",
];

// Default base text (stays constant)
const defaultBaseText = "Education Beyond";

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [content, setContent] = useState<any>(null);
  const [heroVideoUrl, setHeroVideoUrl] = useState("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4");

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content?t=" + Date.now());
      const data = await response.json();
      const sectionData = data.content?.find((item: any) => item.section_key === "hero");
      if (sectionData?.contentData) {
        setContent(sectionData.contentData);
        if (sectionData.contentData.videoUrl) {
          setHeroVideoUrl(sectionData.contentData.videoUrl);
        }
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

  const badge = content?.badge || "Agra's Premier Educational Institution";
  const customHeading = content?.heading;
  
  // Get base text and rotating words from content, or use defaults
  const baseText = content?.baseText || defaultBaseText;
  const rotatingWords = content?.rotatingWords?.split(',').map((w: string) => w.trim()) || defaultRotatingWords;
  const currentWord = rotatingWords[currentWordIndex] || rotatingWords[0];
  
  // Typing effect for rotating words
  useEffect(() => {
    if (customHeading) {
      // Stop typing if custom heading is set
      return;
    }

    // Reset typed text when word changes
    setTypedText("");
    setIsTyping(true);
    let charIndex = 0;

    // Type out the word character by character
    const typingInterval = setInterval(() => {
      if (charIndex < currentWord.length) {
        setTypedText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      } else {
        // Word is complete, wait a bit then move to next word
        setIsTyping(false);
        clearInterval(typingInterval);
        
        // Wait 2 seconds after typing is complete, then fade out and move to next word
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        }, 2000);
      }
    }, 100); // Type each character every 100ms

    return () => clearInterval(typingInterval);
  }, [currentWordIndex, currentWord, customHeading, rotatingWords.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 overflow-x-hidden">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto w-full">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-full text-sm font-black mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 .723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {badge}
            </div>

            {/* Heading - Custom or Rotating with Typing Effect */}
            <div className="min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px] flex items-center justify-center lg:justify-start mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1]">
                {customHeading ? (
                  // If custom heading is set, show it as-is
                  <span className="inline-block">{customHeading}</span>
                ) : (
                  // Otherwise, show base text + typing word (in yellow)
                  <>
                    <span className="inline-block">{baseText} </span>
                    <span className="inline-block text-yellow-400">
                      {typedText}
                      {isTyping && (
                        <span className="inline-block w-0.5 h-[0.9em] bg-yellow-400 ml-1 animate-pulse">|</span>
                      )}
                    </span>
                  </>
                )}
              </h1>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="group relative w-full sm:w-auto bg-white hover:bg-gray-100 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-black transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-white/50 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.94 1.164-.17.199-.34.223-.63.075-.29-.15-1.223-.451-2.33-1.437-.861-.779-1.44-1.74-1.61-2.033-.17-.291-.018-.449.13-.596.134-.134.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Talk to Us on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Side - Video */}
          <div className="relative order-1 lg:order-2 w-full px-2 sm:px-0 overflow-hidden">
            <VideoPlayer
              videoUrl={heroVideoUrl}
              title="Hero Video"
              key={heroVideoUrl}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
