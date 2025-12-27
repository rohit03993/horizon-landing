# Customization Guide - Horizon Competition School

## Quick Setup Checklist

### 1. Update WhatsApp Numbers
Replace `1234567890` with your actual WhatsApp number in:
- `components/CTA.tsx` (line 4 and 5)
- `components/FloatingWhatsApp.tsx` (line 4)

### 2. Update Phone Number
Replace `1234567890` with your actual phone number in:
- `components/CTA.tsx` (line 8)

### 3. Add Instagram Reel URLs

Replace the placeholder URLs with your actual Instagram post/reel URLs:

#### Hero Section (`components/Hero.tsx`)
- Line 5: `heroReelUrl` - Main hero reel

#### Section 1 - What Makes Us Different (`components/Section1.tsx`)
- Line 5: `reelUrl` - Classroom & practical learning reel

#### Section 2 - Practical Learning (`components/Section2.tsx`)
- Line 5: `labReelUrl` - Science labs & experiments
- Line 6: `classroomReelUrl` - Interactive classroom learning

#### Section 3 - Government Job Prep (`components/Section3.tsx`)
- Line 5: `ndaReelUrl` - NDA foundation training
- Line 6: `reasoningReelUrl` - Reasoning & aptitude
- Line 7: `disciplineReelUrl` - Discipline & values

#### Section 4 - Defence & NDA Focus (`components/Section4.tsx`)
- Line 5: `gtoReelUrl` - GTO ground training
- Line 6: `teamworkReelUrl` - Teamwork & command tasks

#### Section 5 - Mental Strength (`components/Section5.tsx`)
- Line 5: `teachersReelUrl` - Expert teachers & guidance
- Line 6: `meditationReelUrl` - Meditation & mental wellness

#### Section 6 - Overall Development (`components/Section6.tsx`)
- Line 5: `scienceReelUrl` - Science exhibitions
- Line 6: `boxingReelUrl` - Boxing & sports
- Line 7: `sportsReelUrl` - Competitive activities

#### Section 7 - Director's Message (`components/Section7.tsx`)
- Line 5: `directorVideoUrl` - Director's message video

### 4. Instagram URL Format
Use the format: `https://www.instagram.com/p/POST_ID/`
Example: `https://www.instagram.com/p/ABC123xyz/`

## Page Structure

1. **Navbar** - Fixed header with school name
2. **Hero Section** - Full-screen reel with headline and WhatsApp CTA
3. **Section 1** - What Makes Us Different
4. **Section 2** - Practical & Real Learning
5. **Section 3** - Government Job Preparation (Unique USP)
6. **Section 4** - Defence & NDA Focus
7. **Section 5** - Mental Strength & Expert Guidance
8. **Section 6** - Overall Development
9. **Section 7** - Director's Message
10. **CTA Section** - Admissions Open with WhatsApp & Call buttons
11. **Footer** - School info and links
12. **Floating WhatsApp** - Always visible WhatsApp button

## Features

✅ Fully responsive (mobile & desktop)
✅ Lazy-loaded Instagram embeds
✅ WhatsApp integration
✅ Call-to-action buttons
✅ Modern, clean design
✅ Fast loading (Static Site Generation)

## Testing

After updating all URLs and numbers:
1. Run `npm run dev`
2. Test on mobile and desktop
3. Click all WhatsApp buttons to verify numbers
4. Verify all Instagram reels load correctly
5. Test the floating WhatsApp button

## Deployment

Ready to deploy on Vercel:
1. Push to GitHub
2. Import on Vercel
3. Deploy automatically

