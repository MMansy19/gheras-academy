"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw, RotateCw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReactMediaPlayerProps {
  url: string;
  userId?: string;
  showWatermark?: boolean;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if ((u.hostname === "www.youtube.com" || u.hostname === "youtube.com") && u.searchParams.get("v")) {
      return u.searchParams.get("v");
    }
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1).split("/")[0] || null;
    }
    if (u.pathname.startsWith("/embed/")) {
      return u.pathname.split("/embed/")[1]?.split("?")[0] || null;
    }
  } catch {
    return null;
  }
  return null;
}

export default function ReactMediaPlayer({
  url,
  showWatermark = false,
}: ReactMediaPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const youtubeId = extractYouTubeId(url);
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    return () => { if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current); };
  }, []);

  if (!youtubeId) {
    return (
      <div className="aspect-video bg-muted flex items-center justify-center rounded-lg">
        <p className="text-muted-foreground">رابط يوتيوب غير صالح</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-video bg-black rounded-lg overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&rel=0&modestbranding=1`}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="فيديو يوتيوب"
      />

      {showWatermark && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm pointer-events-none">
          غراس العلم
        </div>
      )}

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/20 h-8 w-8" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/20 h-8 w-8" onClick={() => setProgress(Math.max(0, progress - 10))}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/20 h-8 w-8" onClick={() => setProgress(Math.min(100, progress + 10))}>
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/20 h-8 w-8" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/20 h-8" onClick={() => setShowSpeedMenu(!showSpeedMenu)}>
                <Settings className="h-4 w-4 mr-1" />{playbackRate}x
              </Button>
              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-1 min-w-[80px]">
                  {speeds.map((speed) => (
                    <button key={speed} type="button" className={cn("w-full px-3 py-1.5 text-sm text-white rounded hover:bg-white/20 text-right", speed === playbackRate && "bg-primary text-white")} onClick={() => { setPlaybackRate(speed); setShowSpeedMenu(false); }}>
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/20 h-8 w-8" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
