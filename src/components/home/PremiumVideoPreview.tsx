import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2Icon, PauseIcon, PlayIcon, VolumeXIcon } from 'lucide-react';
import { VERTEX_PREMIUM_VIDEO, premiumVideoMeta } from '../../config/mediaAssets';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function PremiumVideoPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const tryPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;
    video.muted = true;
    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [reduceMotion]);

  const pause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');

    const onReady = () => {
      if (!reduceMotion) void tryPlay();
    };

    video.addEventListener('loadeddata', onReady);
    video.addEventListener('canplay', onReady);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting && e.intersectionRatio >= 0.15);
        if (visible && !reduceMotion) void tryPlay();
        else if (!visible) pause();
      },
      { threshold: [0, 0.15, 0.35, 0.6] }
    );

    observer.observe(root);

    // Attempt autoplay as soon as the section mounts (muted autoplay is allowed in browsers)
    if (!reduceMotion) void tryPlay();

    return () => {
      observer.disconnect();
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('canplay', onReady);
    };
  }, [pause, reduceMotion, tryPlay]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void tryPlay();
    else pause();
  };

  const openFullscreen = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (video.requestFullscreen) await video.requestFullscreen();
    else if ('webkitEnterFullscreen' in video) {
      (video as HTMLVideoElement & { webkitEnterFullscreen: () => void }).webkitEnterFullscreen();
    }
    void tryPlay();
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mx-auto max-w-5xl"
    >
      {/* Outer glow frame */}
      <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-white/20 via-accent-green/30 to-white/5 opacity-80 blur-sm dark:from-white/10 dark:via-accent-green/20" />

      <div className="relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-navy-950 shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10 dark:border-navy-700">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-navy-950/95 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" aria-hidden />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              {premiumVideoMeta.eyebrow}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            <VolumeXIcon className="h-3 w-3" aria-hidden />
            Silent preview
          </span>
        </div>

        {/* Video */}
        <div className="relative aspect-video bg-black">
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-navy-950">
              <span className="h-8 w-8 animate-pulse rounded-full border-2 border-white/20 border-t-accent-green" />
            </div>
          )}

          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={VERTEX_PREMIUM_VIDEO}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            aria-label={premiumVideoMeta.title}
            onLoadedData={() => {
              setIsReady(true);
              if (!reduceMotion) void tryPlay();
            }}
            onCanPlay={() => {
              if (!reduceMotion) void tryPlay();
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Cinematic overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/20" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />

          {/* Controls */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-navy-950/95 via-navy-950/50 to-transparent p-4 sm:p-6">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                {premiumVideoMeta.caption}
              </p>
              <p className="mt-1 font-display text-lg font-bold text-white sm:text-xl">
                {premiumVideoMeta.title}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={togglePlayback}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
              >
                {isPlaying ? (
                  <PauseIcon className="h-4 w-4" aria-hidden />
                ) : (
                  <PlayIcon className="ml-0.5 h-4 w-4" aria-hidden />
                )}
              </button>
              <button
                type="button"
                onClick={() => void openFullscreen()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                aria-label="Fullscreen preview"
              >
                <Maximize2Icon className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
