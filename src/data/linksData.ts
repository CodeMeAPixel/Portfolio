import { LinkHubProfile, LinkItem, SocialLink, LinkCategory, Track, Playlist } from "@/types/links";
import linksClient from "@/lib/links/client";

export function getProfile(): LinkHubProfile {
  return linksClient.getProfile();
}

export function getAllLinks(): LinkItem[] {
  return linksClient.getAllLinks();
}

export function getSocialLinks(): SocialLink[] {
  return linksClient.getSocialLinks();
}

export function getFeaturedLinks(): LinkItem[] {
  return linksClient.getFeaturedLinks();
}

export function getCategories(): LinkCategory[] {
  return linksClient.getCategories();
}

export function getLinksByCategory(categoryId: string): LinkItem[] {
  return linksClient.getLinksByCategory(categoryId);
}

export function getLinkById(linkId: string): LinkItem | undefined {
  return linksClient.getLinkById(linkId);
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  url: string;
  audioFile?: string;
  genre?: string;
}

export interface Playlist {
  title: string;
  description: string;
  tracks: Track[];
}

export function getPlaylist(): Playlist {
  return {
    title: "My Current Favorites",
    description: "A collection of tracks I'm enjoying right now. Click on any track to listen!",
    tracks: [
      {
        id: "gawm-paparoach",
        title: "Getting Away With Murder",
        artist: "Papa Roach",
        albumCover: "/covers/paparoach.png",
        spotifyUrl: "https://youtu.be/-rdmG0k8S8k?si=khm0eVOCehLD0VNX",
        audioFile: "/playlist/papa-roach/getting-away-with-murder.mp3",
        genre: "Rock"
      },
      {
        id: "slmn-paparoach",
        title: "She Loves Me Not",
        artist: "Papa Roach",
        albumCover: "/covers/paparoach.png",
        spotifyUrl: "https://youtu.be/aoZEtBQJN4c?si=TRgKSBqMzAEJZ2I2",
        audioFile: "/playlist/papa-roach/she-loves-me-not.mp3",
        genre: "Rock"
      },
      {
        id: "hww-paparoach",
        title: "Hollywood Whore",
        artist: "Papa Roach",
        albumCover: "/covers/paparoach.png",
        spotifyUrl: "https://youtu.be/XjQvk_R20r4?si=j5Mbv-N5xMvdG_Yl",
        audioFile: "/playlist/papa-roach/she-loves-me-not.mp3",
        genre: "Rock"
      },
    ]
  };
}
