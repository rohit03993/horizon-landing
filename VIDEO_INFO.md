# Video Format & Storage Information

## Video Format Used

### Section 6 Videos (2nd Screenshot)
The three videos shown in Section 6 are **demo/test videos** from Google's test video bucket:

1. **Video 1 (Science Exhibitions):**
   - URL: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
   - Format: **MP4**
   - Size: ~10-15 MB (approximate)
   - Aspect Ratio: 16:9 (horizontal)

2. **Video 2 (Boxing & Sports):**
   - URL: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4`
   - Format: **MP4**
   - Size: ~10-15 MB (approximate)
   - Aspect Ratio: 16:9 (horizontal)

3. **Video 3 (Competitive Activities):**
   - URL: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4`
   - Format: **MP4**
   - Size: ~10-15 MB (approximate)
   - Aspect Ratio: 16:9 (horizontal)

## Where Videos Are Stored

### Current Setup:
- **NOT stored locally** - Videos are hosted on Google Cloud Storage
- **URLs are stored in the database** - When you paste a video URL in the admin panel, it's saved in the `page_content` table
- **Display format:** Videos are displayed in **9:16 vertical format** (Instagram Reel format) regardless of original aspect ratio

### Video Storage Options:

1. **Instagram Reels (Recommended):**
   - Format: Instagram embed
   - Aspect Ratio: 9:16 (vertical)
   - Size: Handled by Instagram
   - Storage: Instagram servers
   - Usage: Paste Instagram reel URL in admin panel

2. **Direct Video URLs (MP4):**
   - Format: MP4
   - Recommended Aspect Ratio: 9:16 (vertical) for best display
   - Size: Keep under 50MB for fast loading
   - Storage Options:
     - Google Cloud Storage
     - AWS S3
     - Vercel Blob Storage
     - Your own server/CDN

3. **Local Storage (Not Recommended for Production):**
   - Store in `public/videos/` folder
   - Format: MP4
   - Size: Will increase build size
   - Usage: `/videos/your-video.mp4`

## How to Replace Demo Videos

### Option 1: Use Instagram Reels (Best)
1. Upload your video to Instagram as a Reel
2. Copy the Instagram reel URL
3. Go to Admin Panel → Content Editor → Section 6
4. Paste the URL in "Video 1 URL", "Video 2 URL", or "Video 3 URL"
5. Save - it will automatically display in Instagram format

### Option 2: Use Direct Video URLs
1. Upload your video to a hosting service (Google Cloud, AWS S3, etc.)
2. Get the direct MP4 URL
3. Paste in admin panel
4. Make sure video is in 9:16 vertical format for best results

## Video Specifications for Best Results

- **Format:** MP4 (H.264 codec)
- **Aspect Ratio:** 9:16 (vertical, like Instagram Reels)
- **Resolution:** 1080x1920 pixels (Full HD vertical)
- **File Size:** Under 50MB per video
- **Duration:** 15-60 seconds recommended
- **Frame Rate:** 30fps

## Current Video Display Settings

- **Aspect Ratio:** 9:16 (vertical)
- **Container Size:** Max 400px width, auto height
- **Border:** Yellow 4px border
- **Preview:** Auto-playing muted loop
- **Playback:** Click to play with full controls

