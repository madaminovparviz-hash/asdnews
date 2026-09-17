---
name: media-sermons-management
description: Guidelines for managing media assets, responsive video embeds, audio players for sermon podcasts, and image optimization with sharp/Next.js. Use when working on sermons, media players, or asset pipelines.
---

# Media & Sermons Management Guidelines

This skill provides patterns for handling church multimedia content, including sermon video/audio streams, podcasts, and image assets.

## 1. Sermon Video Embeds (Performance-First)
To maintain top Core Web Vitals (LCP/INP) and prevent blocking the main thread with heavy third-party iframes:
- **Lite Embed / Facade Pattern**: Do not render the full YouTube/Rutube `<iframe>` on page load. Render a cover image (`sermon-1.jpg`) with a play button overlay. Replace with the actual iframe only on user click.
- **Aspect Ratio**: Always wrap embeds in 16:9 container using `aspect-video` (Tailwind):
  ```tsx
  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/5 shadow-md">
    {isPlaying ? (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full border-0"
      />
    ) : (
      <button onClick={() => setIsPlaying(true)} className="group relative h-full w-full">
        <Image src={thumbnailUrl} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
          <PlayCircle className="h-16 w-16 text-white drop-shadow-md" />
        </div>
      </button>
    )}
  </div>
  ```

## 2. Sermon Audio Player
- Implement a persistent or expandable audio player for sermon audio files (MP3 format).
- Features to support:
  - Play / Pause / 10-second skip forward & backward.
  - Playback speed switcher (`1.0x`, `1.25x`, `1.5x`).
  - Direct MP3 download link for low-bandwidth Central Asian mobile connections.
  - Track metadata: Preacher, Date, Scripture reading (e.g. `Инҷил / Евангелие`).

## 3. Image Optimization with `sharp` & Next.js
- Keep source images in `public/images/`.
- Use Next.js `<Image>` with explicit dimensions or `fill` with `sizes` property to avoid layout shift (CLS).
- For hero and prominent banners, enable WebP/AVIF compression and set `priority={true}`.
- Scripted batch optimization: use Node.js `sharp` scripts for resizing source uploads to multiple responsive resolutions (640w, 1080w, 1440w).
