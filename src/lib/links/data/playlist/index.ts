import { Playlist, Track } from "@/types/links";
import { rockTracks } from "./rock";
import { electronicTracks } from "./electronic";
import { hipHopTracks } from "./hiphop";
import { classicTracks } from "./classics";

// Combine all tracks
export const allTracks: Track[] = [
    ...classicTracks,
    ...rockTracks,
    ...electronicTracks,
    ...hipHopTracks
];

// Export individual genre collections for direct access
export { rockTracks, electronicTracks, hipHopTracks };

// Export the playlist
export const playlist: Playlist = {
    title: "My Current Favorites",
    description: "A collection of tracks I'm enjoying right now. Click on any track to listen!",
    tracks: allTracks
};

// Function to get tracks by genre
export function getTracksByGenre(genre: string): Track[] {
    return allTracks.filter(track =>
        track.genre?.toLowerCase() === genre.toLowerCase()
    );
}

// Function to get all unique genres
export function getAllGenres(): string[] {
    const genres = new Set<string>();
    allTracks.forEach(track => {
        if (track.genre) {
            genres.add(track.genre);
        }
    });
    return Array.from(genres).sort();
}

// Function to get a track by ID
export function getTrackById(trackId: string): Track | undefined {
    return allTracks.find(track => track.id === trackId);
}
