import { LinkHubProfile, LinkItem, SocialLink, LinkCategory, Playlist } from "@/types/links";
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

export function getPlaylist(): Playlist {
  return linksClient.getPlaylist();
}
