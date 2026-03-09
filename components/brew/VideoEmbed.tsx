"use client";

interface VideoEmbedProps {
  /** YouTube video ID (ej. de youtube.com/watch?v=VIDEO_ID) */
  videoId: string;
  title: string;
}

const YOUTUBE_EMBED = "https://www.youtube-nocookie.com/embed";
const YOUTUBE_WATCH = "https://www.youtube.com/watch?v";

export function VideoEmbed({ videoId, title }: VideoEmbedProps) {
  if (!videoId) return null;

  const embedSrc = `${YOUTUBE_EMBED}/${videoId}?rel=0&modestbranding=1`;
  const watchUrl = `${YOUTUBE_WATCH}=${videoId}`;

  return (
    <div className="rounded-2xl overflow-hidden border border-puretea-sand bg-puretea-sand/20 shadow-lg">
      <div className="aspect-video w-full relative min-h-[220px]">
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
      <p className="p-3 text-center text-sm text-puretea-dark/70 bg-puretea-cream/80">
        Si el vídeo no se reproduce,{" "}
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-puretea-organic font-medium hover:underline"
        >
          ábrelo en YouTube
        </a>
      </p>
    </div>
  );
}
