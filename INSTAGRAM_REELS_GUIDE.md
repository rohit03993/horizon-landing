# How to Use Instagram Reels

## Quick Guide

Simply paste your Instagram reel URL in any section, and it will automatically:
1. Show a thumbnail preview
2. Display an Instagram badge
3. Play smoothly when clicked
4. Use Instagram's embed format

## Example Usage

### In Section2.tsx (or any section):

```tsx
<VideoPlayer 
  videoUrl="https://www.instagram.com/p/YOUR_REEL_ID/"
  title="Science Labs & Experiments"
/>
```

### Supported Instagram URL Formats:

- `https://www.instagram.com/p/ABC123/`
- `https://www.instagram.com/reel/ABC123/`
- `https://www.instagram.com/tv/ABC123/`

## Features

✅ **Auto-detection** - Automatically detects Instagram URLs
✅ **Thumbnail preview** - Shows Instagram thumbnail before playing
✅ **Smooth transition** - Smooth fade-in when clicked
✅ **Instagram embed** - Uses official Instagram embed
✅ **Square format** - Perfect Instagram reel aspect ratio
✅ **Click to play** - Interactive play button overlay

## How It Works

1. When you paste an Instagram URL, `VideoPlayer` automatically detects it
2. It uses `InstagramReelPlayer` component for Instagram URLs
3. Shows a thumbnail preview with a play button
4. On click, loads the Instagram embed smoothly
5. Maintains square (1:1) aspect ratio like Instagram reels

## Regular Videos Still Work

Regular video URLs (MP4, etc.) still work the same way:
- Show preview thumbnail
- Click to play
- Smooth transitions

Just paste your URLs - the component handles everything automatically!

