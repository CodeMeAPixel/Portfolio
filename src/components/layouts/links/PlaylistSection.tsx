"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IoMusicalNotes, IoPlay, IoPause, IoSearch, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import MusicPlayer from './MusicPlayer';
import { Track } from '@/types/links';

interface PlaylistSectionProps {
  playlist: any;
}

const TRACKS_PER_PAGE = 6;

const TrackItem = ({ track, onPlay, isActive }: { track: Track; onPlay: (track: Track) => void; isActive: boolean }) => {
  return (
    <motion.div
      className={`flex items-center p-3 rounded-md transition-all group hover:bg-card-alt ${isActive ? 'bg-primary-500/10 border border-primary-500' : 'bg-card border border-color-border'}`}
      whileHover={{ y: -2 }}
      onClick={() => onPlay(track)}
    >
      <div className="w-10 h-10 relative mr-3 flex-shrink-0 group-hover:shadow-md transition-all">
        <Image
          src={track.albumCover}
          alt={`${track.title} album cover`}
          fill
          className="object-cover rounded-md"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
          {isActive ? (
            <IoPause className="text-white w-5 h-5" />
          ) : (
            <IoPlay className="text-white w-5 h-5" />
          )}
        </div>
      </div>
      <div className="flex-grow">
        <h3 className={`text-base font-medium ${isActive ? 'text-primary-300' : 'text-color-text'}`}>
          {track.title}
        </h3>
        <p className="text-xs text-color-text-muted">
          {track.artist}
        </p>
      </div>
    </motion.div>
  );
};

function PlaylistSection({ playlist }: PlaylistSectionProps) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [activeGenre, setActiveGenre] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique genres from tracks
  const genres = ['all', ...new Set(playlist.tracks.map((track: Track) => track.genre || 'Uncategorized'))];

  // Filter tracks based on active genre and search term
  const filteredTracks = playlist.tracks.filter((track: Track) => {
    const matchesGenre = activeGenre === 'all' || track.genre === activeGenre || (!track.genre && activeGenre === 'Uncategorized');
    const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const totalPages = Math.ceil(filteredTracks.length / TRACKS_PER_PAGE);

  const paginatedTracks = useMemo(() => {
    const startIndex = (currentPage - 1) * TRACKS_PER_PAGE;
    return filteredTracks.slice(startIndex, startIndex + TRACKS_PER_PAGE);
  }, [filteredTracks, currentPage]);

  const handlePlay = (track: Track) => {
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Determine if next/previous buttons should be enabled
  const currentIndex = currentTrack ?
    filteredTracks.findIndex(track => track.id === currentTrack.id) : -1;

  const hasNext = currentIndex < filteredTracks.length - 1;
  const hasPrevious = currentIndex > 0;

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-color-text mb-1">{playlist.title}</h2>
          <p className="text-sm text-color-text-muted">{playlist.description}</p>
        </div>

        {/* Search and filter UI */}
        <div className="mb-4 flex flex-col gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tracks or artists..."
              className="w-full p-2 pl-8 rounded-md bg-card border border-color-border focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute top-0 left-0 mt-2 ml-2 flex items-center pointer-events-none">
              <IoSearch className="w-4 h-4 text-color-text-muted" />
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-2 py-0.5 text-xs rounded-full transition-colors ${activeGenre === genre
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
          <div className="mb-4">
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
        <div className="space-y-1 pb-8">
          {paginatedTracks.length > 0 ? (
            paginatedTracks.map((track: Track) => (
              <TrackItem
                key={track.id}
                track={track}
                onPlay={handlePlay}
                isActive={currentTrack?.id === track.id}
              />
            ))
          ) : (
            <div className="text-center p-4 text-color-text-muted">
              No tracks found. Try adjusting your filters.
            </div>
          )}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-primary-700/30 hover:bg-primary-600/40 text-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <IoChevronBack className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-2 py-1 rounded-md transition-colors ${currentPage === pageNumber
                  ? 'bg-primary-500 text-white'
                  : 'bg-card hover:bg-card-alt text-color-text-muted'
                  }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md bg-primary-700/30 hover:bg-primary-600/40 text-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <IoChevronForward className="w-5 h-5" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default PlaylistSection;
