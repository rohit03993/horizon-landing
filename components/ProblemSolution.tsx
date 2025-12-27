export default function ProblemSolution() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Problem */}
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-destructive/10 text-destructive rounded-full text-sm font-semibold">
                The Problem
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Struggling to Grow Your Business?
              </h2>
              <p className="text-lg text-muted-foreground">
                Many businesses face challenges with outdated strategies, lack
                of visibility, and ineffective marketing approaches that don&apos;t
                deliver results.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-destructive mr-2">✗</span>
                  <span>Low online visibility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">✗</span>
                  <span>Outdated marketing strategies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">✗</span>
                  <span>Limited customer engagement</span>
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                The Solution
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                We Have The Answer
              </h2>
              <p className="text-lg text-muted-foreground">
                Our proven methods and innovative solutions help businesses
                overcome these challenges and achieve sustainable growth.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Modern, data-driven strategies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Increased online presence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Engaged and loyal customers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

