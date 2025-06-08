"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IoMusicalNotes, IoPlay, IoPause, IoClose, IoFilter } from 'react-icons/io5';
import MusicPlayer from './MusicPlayer';

const TrackItem = ({ track, onPlay, isActive }) => {
  return (
    <motion.div
      className={`flex items-center p-4 ${isActive ? 'bg-primary-800/30' : 'bg-card'} border border-color-border rounded-lg transition-all group hover:bg-card-alt`}
      whileHover={{ y: -2 }}
      onClick={() => onPlay(track)}
    >
      <div className="w-12 h-12 relative mr-3 flex-shrink-0 group-hover:shadow-lg transition-all">
        <Image
          src={track.albumCover}
          alt={`${track.title} album cover`}
          fill
          className="object-cover rounded-md"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
          {isActive ? (
            <IoPause className="text-white w-6 h-6" />
          ) : (
            <IoPlay className="text-white w-6 h-6" />
          )}
        </div>
      </div>
      <div className="flex-grow">
        <h3 className={`font-medium ${isActive ? 'text-primary-300' : ''}`}>
          {track.title}
        </h3>
        <p className="text-sm text-color-text-muted">
          {track.artist} · {track.genre || 'Uncategorized'}
        </p>
      </div>
    </motion.div>
  );
};

function PlaylistSection({ playlist }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [activeGenre, setActiveGenre] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Extract unique genres from tracks
  const genres = ['all', ...new Set(playlist.tracks.map(track => track.genre || 'Uncategorized'))];
  
  // Filter tracks based on active genre and search term
  const filteredTracks = playlist.tracks.filter(track => {
    const matchesGenre = activeGenre === 'all' || track.genre === activeGenre || (!track.genre && activeGenre === 'Uncategorized');
    const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         track.artist.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const handlePlay = (track) => {
    if (currentTrack?.id === track.id) {
      setCurrentTrack(null); // Toggle off if clicking the same track
    } else {
      setCurrentTrack(track);
    }
  };

  const handleNext = () => {
    if (!currentTrack) return;
    
    const currentIndex = filteredTracks.findIndex(track => track.id === currentTrack.id);
    if (currentIndex < filteredTracks.length - 1) {
      setCurrentTrack(filteredTracks[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (!currentTrack) return;
    
    const currentIndex = filteredTracks.findIndex(track => track.id === currentTrack.id);
    if (currentIndex > 0) {
      setCurrentTrack(filteredTracks[currentIndex - 1]);
    }
  };

  // Determine if next/previous buttons should be enabled
  const hasNext = currentTrack ? 
    filteredTracks.findIndex(track => track.id === currentTrack.id) < filteredTracks.length - 1 : 
    false;
  
  const hasPrevious = currentTrack ? 
    filteredTracks.findIndex(track => track.id === currentTrack.id) > 0 : 
    false;

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6 bg-gradient-to-r from-primary-800/30 to-primary-700/10 p-5 rounded-xl border border-primary-700/20">
          <h2 className="text-xl font-bold text-color-text mb-2">{playlist.title}</h2>
          <p className="text-color-text-muted mb-4">{playlist.description}</p>
          {playlist.tracks.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-primary-400">
              <IoMusicalNotes className="w-4 h-4" />
              <span>{playlist.tracks.length} tracks</span>
            </div>
          )}
        </div>

        {/* Search and filter UI */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search tracks or artists..."
            className="flex-grow p-2 rounded-lg bg-card border border-color-border focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  activeGenre === genre 
                    ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40' 
                    : 'bg-card text-color-text-muted border border-color-border hover:bg-card-alt'
                }`}
              >
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Current Playing Track */}
        {currentTrack && (
          <div className="mb-6">
            <MusicPlayer 
              track={currentTrack}
              onNext={handleNext}
              onPrevious={handlePrevious}
              hasNext={hasNext}
              hasPrevious={hasPrevious}
            />
          </div>
        )}

        {/* Track list */}
        <div className="space-y-2 pb-8">
          {filteredTracks.length > 0 ? (
            filteredTracks.map((track) => (
              <TrackItem 
                key={track.id} 
                track={track} 
                onPlay={handlePlay}
                isActive={currentTrack?.id === track.id}
              />
            ))
          ) : (
            <div className="text-center p-8 text-color-text-muted">
              No tracks found. Try adjusting your filters.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default PlaylistSection;
