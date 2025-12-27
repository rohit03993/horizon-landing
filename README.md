# Landing Page - Next.js

A high-performance, responsive landing page built with Next.js, TypeScript, and Tailwind CSS. Features Instagram reel integration, mobile-first design, and optimized for speed.

## Features

- ✅ **Responsive Design** - Mobile and desktop optimized
- ✅ **Instagram Integration** - Lazy-loaded Instagram reels
- ✅ **Fast Performance** - Static Site Generation (SSG)
- ✅ **Modern UI** - Tailwind CSS + Shadcn UI components
- ✅ **SEO Optimized** - Built-in Next.js SEO features
- ✅ **TypeScript** - Full type safety

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Next.js 14** - React framework with App Router & SSG
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Component library (configured)
- **Next/Font** - Self-hosted fonts (Inter & Poppins)

## Project Structure

```
/app
  ├── layout.tsx          # Root layout (Blade-like)
  ├── page.tsx            # Landing page
  ├── globals.css         # Global styles + Tailwind
  └── components/
      ├── Navbar.tsx      # Responsive navigation
      ├── Hero.tsx        # Hero section
      ├── InstaReel.tsx   # Lazy-loaded Instagram component
      ├── InstaReelSection.tsx
      ├── ProblemSolution.tsx
      ├── Testimonials.tsx
      ├── CTA.tsx         # Contact form + WhatsApp
      └── Footer.tsx
/lib
  └── utils.ts            # Utility functions (cn helper)
```

## Customization

### Update Instagram Reels

Edit `components/InstaReelSection.tsx` to add your Instagram post URLs:

```typescript
const reels = [
  {
    url: "https://www.instagram.com/p/YOUR_POST_ID/",
    title: "Your Reel Title",
  },
];
```

### Update WhatsApp Number

Edit `components/CTA.tsx` and update the `whatsappNumber` variable:

```typescript
const whatsappNumber = "1234567890"; // Your WhatsApp number
```

### Update Brand Name

Search and replace "Brand" throughout the components with your brand name.

### Update Content

All content is in the component files. Simply edit the text in:
- `components/Hero.tsx` - Hero section
- `components/ProblemSolution.tsx` - Problem/Solution content
- `components/Testimonials.tsx` - Testimonials
- `components/Footer.tsx` - Footer links and info

## Build

```bash
npm run build
```

## Deploy

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically

The `vercel.json` file is already configured for optimal deployment.

### Other Platforms

The project uses Static Site Generation, so it can be deployed to:
- Cloudflare Pages
- Netlify
- Any static hosting service

## Performance

- **Static Generation** - HTML built at build time
- **Image Optimization** - Next.js Image component ready
- **Lazy Loading** - Instagram embeds load on demand
- **Font Optimization** - Self-hosted fonts with `next/font`
- **Code Splitting** - Automatic with Next.js

## License

MIT

