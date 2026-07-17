import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Maximize2Icon, PauseIcon, PlayIcon, VolumeXIcon } from 'lucide-react';
import { VERTEX_PREMIUM_VIDEO, premiumVideoMeta } from '../../config/mediaAssets';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

function ensureMuted(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute('muted', '');
  video.volume = 0;
}

function isElementVisible(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const visibleHeight = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
  return visibleHeight >= rect.height * 0.2 && rect.top < vh * 0.92;
}

export function PremiumVideoPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const shouldPlayRef = useRef(false);
  const retryTimerRef = useRef<number | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const isInView = useInView(viewportRef, {
    amount: 0.25,
    margin: '0px 0px -40px 0px',
  });

  const clearRetryTimer = useCallback(() => {
    if (retryTimerRef.current !== null) {
      window.clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, []);

  const playVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video || reduceMotion) return false;

    ensureMuted(video);
    video.setAttribute('autoplay', '');

    if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
      try {
        video.load();
      } catch {
        /* ignore */
      }
    }

    try {
      const result = video.play();
      if (result !== undefined) await result;
      setIsPlaying(!video.paused);
      return !video.paused;
    } catch {
      setIsPlaying(false);
      return false;
    }
  }, [reduceMotion]);

  const playWithRetry = useCallback(
    (attempt = 0) => {
      if (!shouldPlayRef.current || reduceMotion) return;

      clearRetryTimer();
      void playVideo().then((ok) => {
        if (ok || attempt >= 8 || !shouldPlayRef.current) return;
        retryTimerRef.current = window.setTimeout(
          () => playWithRetry(attempt + 1),
          120 + attempt * 80
        );
      });
    },
    [clearRetryTimer, playVideo, reduceMotion]
  );

  const pause = useCallback(() => {
    clearRetryTimer();
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlaying(false);
  }, [clearRetryTimer]);

  const syncPlayback = useCallback(
    (wantPlay: boolean) => {
      shouldPlayRef.current = wantPlay;
      if (wantPlay && !reduceMotion) playWithRetry();
      else pause();
    },
    [pause, playWithRetry, reduceMotion]
  );

  // Framer motion in-view
  useEffect(() => {
    syncPlayback(isInView);
  }, [isInView, syncPlayback]);

  // Scroll fallback — some browsers miss IntersectionObserver updates
  useEffect(() => {
    const onScroll = () => {
      const el = viewportRef.current;
      if (!el) return;
      const visible = isElementVisible(el);
      if (visible !== shouldPlayRef.current) {
        syncPlayback(visible);
      } else if (visible && videoRef.current?.paused && !reduceMotion) {
        playWithRetry();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [playWithRetry, reduceMotion, syncPlayback]);

  const onVideoReady = useCallback(() => {
    setIsReady(true);
    if (shouldPlayRef.current && !reduceMotion) {
      playWithRetry();
    }
  }, [playWithRetry, reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    ensureMuted(video);
  }, []);

  useEffect(() => () => clearRetryTimer(), [clearRetryTimer]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      shouldPlayRef.current = true;
      void playVideo();
    } else {
      shouldPlayRef.current = false;
      pause();
    }
  };

  const openFullscreen = async () => {
    const video = videoRef.current;
    if (!video) return;
    ensureMuted(video);
    shouldPlayRef.current = true;
    if (video.requestFullscreen) await video.requestFullscreen();
    else if ('webkitEnterFullscreen' in video) {
      (video as HTMLVideoElement & { webkitEnterFullscreen: () => void }).webkitEnterFullscreen();
    }
    void playVideo();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mx-auto w-full max-w-5xl px-0 sm:px-0"
    >
      <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-white/20 via-accent-green/30 to-white/5 opacity-80 blur-sm sm:rounded-[1.75rem] dark:from-white/10 dark:via-accent-green/20" />

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-navy-950 shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10 sm:rounded-[1.65rem] dark:border-navy-700">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-navy-950/95 px-3 py-2.5 backdrop-blur-md sm:px-6 sm:py-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" aria-hidden />
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-400 sm:text-[10px] sm:tracking-[0.2em]">
              {premiumVideoMeta.eyebrow}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[10px]">
            <VolumeXIcon className="h-3 w-3 shrink-0" aria-hidden />
            Silent preview
          </span>
        </div>

        <div ref={viewportRef} className="relative aspect-video min-h-[200px] bg-black sm:min-h-0">
          {!isReady && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-navy-950">
              <span className="h-8 w-8 animate-pulse rounded-full border-2 border-white/20 border-t-accent-green" />
            </div>
          )}

          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={VERTEX_PREMIUM_VIDEO}
            muted
            playsInline
            loop
            preload="auto"
            disablePictureInPicture
            aria-label={premiumVideoMeta.title}
            onLoadedData={onVideoReady}
            onCanPlay={onVideoReady}
            onCanPlayThrough={onVideoReady}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/20" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-gradient-to-t from-navy-950/95 via-navy-950/50 to-transparent p-3 sm:flex-row sm:items-end sm:justify-between sm:p-6">
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-500 sm:text-[10px] sm:tracking-[0.18em]">
                {premiumVideoMeta.caption}
              </p>
              <p className="mt-1 font-display text-base font-bold leading-snug text-white sm:text-xl">
                {premiumVideoMeta.title}
              </p>
            </div>

            <div className="flex shrink-0 items-center justify-end gap-2 self-end">
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
