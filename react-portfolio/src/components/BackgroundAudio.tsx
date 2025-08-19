import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

type Track = {
  fileName: string;
  url: string;
};

type Manifest = {
  generatedAt: string;
  count: number;
  tracks: Track[];
};

function shuffleArrayInPlace<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * BackgroundAudio fetches a manifest of audio files from /music/manifest.json,
 * shuffles them, and plays through the list on loop. To comply with browser
 * autoplay policies, playback starts on first user interaction (click/touch/keypress).
 */
const BackgroundAudio: React.FC = () => {
  const VolumeMuteIcon = FaVolumeMute as unknown as React.FC<{ className?: string }>;
  const VolumeUpIcon = FaVolumeUp as unknown as React.FC<{ className?: string }>;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/music/manifest.json', { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load manifest: ${res.status}`);
        const data = (await res.json()) as Manifest;
        const list = Array.isArray(data.tracks) ? [...data.tracks] : [];
        if (list.length > 0) {
          shuffleArrayInPlace(list);
        }
        if (isMounted) {
          setTracks(list);
          setCurrentIndex(0);
          setIsReady(true);
        }
      })
      .catch(() => {
        // Silent fail; no music if manifest not found
        if (isMounted) {
          setTracks([]);
          setIsReady(true);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const currentTrack = useMemo(() => {
    if (!tracks.length) return undefined;
    return tracks[(currentIndex + tracks.length) % tracks.length];
  }, [tracks, currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.src = currentTrack.url;
    audio.load();
    if (isPlaying) {
      void audio.play().catch(() => {
        // Ignore autoplay errors; will be resumed on next interaction
      });
    }
  }, [currentTrack?.url, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      if (tracks.length === 0) return;
      const nextIndex = (currentIndex + 1) % tracks.length;
      setCurrentIndex(nextIndex);
    };
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentIndex, tracks.length]);

  useEffect(() => {
    if (!isReady || tracks.length === 0) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    audio.loop = false;
    audio.autoplay = false;
    audio.muted = isMuted;
  }, [isReady, tracks.length, isMuted]);

  const toggleMute = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && !isPlaying) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // ignore
      }
    }
  };

  if (!tracks.length) return null;

  return (
    <>
      <audio ref={audioRef} style={{ display: 'none' }} playsInline />
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
        className="btn btn-secondary w-10 h-10 rounded-full"
        style={{color: '#fff', outline: 'none', boxShadow: 'none' }}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeMuteIcon />
        ) : (
          <VolumeUpIcon />
        )}
      </button>
      <div style={{ fontSize: 12, color: '#bbb', marginTop: 2, justifyContent: 'left' }}>
        All music produced by me
      </div>
    </>
  );
};

export default BackgroundAudio;


