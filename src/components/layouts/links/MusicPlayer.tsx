"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IoPlaySharp, IoPauseSharp, IoPlaySkipBackSharp, IoPlaySkipForwardSharp, IoVolumeMuteOutline, IoVolumeMediumOutline } from 'react-icons/io5';

interface MusicPlayerProps {
  track: Track;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

function MusicPlayer({ track, onNext, onPrevious, hasNext, hasPrevious }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Load audio when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);

      const loadAudio = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
          // Autoplay when loaded
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.warn("Autoplay prevented:", error);
            // Handle the error appropriately (e.g., show a message to the user)
          });
        }
      };

      audioRef.current.addEventListener('loadedmetadata', loadAudio);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', loadAudio);
        }
      };
    }
  }, [track]);

  // Handle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update progress bar
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      // Auto next track when current one ends
      if (audioRef.current.ended && hasNext) {
        onNext();
      }
    }
  };

  // Handle seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      const progressBar = progressBarRef.current;
      const rect = progressBar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / progressBar.offsetWidth;
      const seekTime = percent * duration;
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        setVolume(prevVolume);
        audioRef.current.volume = prevVolume;
      } else {
        setPrevVolume(volume);
        setVolume(0);
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  // Format time in MM:SS
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="w-full bg-card border border-color-border rounded-md p-3 shadow-sm">
      <audio
        ref={audioRef}
        src={track.audioFile}
        onTimeUpdate={updateProgress}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
      />
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image
            src={track.albumCover}
            alt={`${track.title} album cover`}
            fill
            className="object-cover rounded-md shadow-sm"
          />
        </div>
        <div className="flex-grow">
          <h4 className="text-sm font-medium text-color-text truncate">{track.title}</h4>
          <p className="text-xs text-color-text-muted truncate">{track.artist}</p>
        </div>
      </div>

      <div
        ref={progressBarRef}
        className="mt-2 h-1 bg-color-border relative rounded-full cursor-pointer"
        onClick={handleSeek}
      >
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary-500 rounded-full"
          style={{ width: `${currentTime / duration * 100}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${currentTime / duration * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="flex justify-between text-[0.6rem] text-color-text-muted mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <button onClick={toggleMute} className="text-color-text-muted hover:text-primary-500 transition-colors">
            {isMuted ? <IoVolumeMuteOutline size={16} /> : <IoVolumeMediumOutline size={16} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 accent-primary-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onPrevious} disabled={!hasPrevious} className={`text-color-text-muted hover:text-primary-500 transition-colors ${!hasPrevious ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <IoPlaySkipBackSharp size={18} />
          </button>
          <button onClick={togglePlay} className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-2 transition-colors">
            {isPlaying ? <IoPauseSharp size={16} /> : <IoPlaySharp size={16} />}
          </button>
          <button onClick={onNext} disabled={!hasNext} className={`text-color-text-muted hover:text-primary-500 transition-colors ${!hasNext ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <IoPlaySkipForwardSharp size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
