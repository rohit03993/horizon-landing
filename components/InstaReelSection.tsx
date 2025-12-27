import InstaReel from "./InstaReel";

// Example Instagram reel URLs - replace with your actual URLs
const reels = [
  {
    url: "https://www.instagram.com/p/EXAMPLE1/",
    title: "Reel 1",
  },
  {
    url: "https://www.instagram.com/p/EXAMPLE2/",
    title: "Reel 2",
  },
  {
    url: "https://www.instagram.com/p/EXAMPLE3/",
    title: "Reel 3",
  },
];

export default function InstaReelSection() {
  return (
    <section id="reels" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Check Out Our Reels
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See our latest content and behind-the-scenes moments
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reels.map((reel, index) => (
            <InstaReel
              key={index}
              url={reel.url}
              title={reel.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

