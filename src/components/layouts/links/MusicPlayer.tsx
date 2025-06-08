"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IoPlaySharp, IoPauseSharp, IoPlaySkipBackSharp, IoPlaySkipForwardSharp, IoVolumeMuteOutline, IoVolumeMediumOutline } from 'react-icons/io5';

function MusicPlayer({ track, onNext, onPrevious, hasNext, hasPrevious }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.7);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  // Load audio when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      // Reset audio element
      const loadAudio = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
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
  const handleSeek = (e) => {
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
  const handleVolumeChange = (e) => {
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
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="w-full bg-card border border-color-border rounded-xl p-4 shadow-md">
      <audio
        ref={audioRef}
        src={track.audioFile}
        onTimeUpdate={updateProgress}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
      />

      <div className="flex items-center gap-4">
        {/* Album cover */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
          <Image
            src={track.albumCover}
            alt={`${track.title} album cover`}
            fill
            className="object-cover rounded-md shadow-sm"
          />
        </div>

        {/* Track info */}
        <div className="flex-grow">
          <h4 className="text-lg font-medium text-color-text truncate">{track.title}</h4>
          <p className="text-sm text-color-text-muted truncate">{track.artist}</p>

          {/* Progress bar */}
          <div
            ref={progressBarRef}
            className="mt-3 h-1.5 bg-color-border relative rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(currentTime / duration) * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Time indicators */}
          <div className="flex justify-between text-xs text-color-text-muted mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          {/* Volume control */}
          <button onClick={toggleMute} className="text-color-text-muted hover:text-primary-500 transition-colors">
            {isMuted ? <IoVolumeMuteOutline size={20} /> : <IoVolumeMediumOutline size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 accent-primary-500"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Previous button */}
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className={`text-color-text-muted hover:text-primary-500 transition-colors ${!hasPrevious ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <IoPlaySkipBackSharp size={24} />
          </button>

          {/* Play/Pause button */}
          <button
            onClick={togglePlay}
            className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-3 transition-colors"
          >
            {isPlaying ? <IoPauseSharp size={20} /> : <IoPlaySharp size={20} />}
          </button>

          {/* Next button */}
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`text-color-text-muted hover:text-primary-500 transition-colors ${!hasNext ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <IoPlaySkipForwardSharp size={24} />
          </button>
        </div>

        <div className="w-20">
          {/* Placeholder to balance the layout */}
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
