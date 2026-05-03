/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="w-full h-36 bg-muted" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-36 object-cover"
      onError={() => setImageError(true)}
    />
  );
}

interface ProjectLinkItem {
  icon: React.ReactNode;
  type: string;
  href: string;
}

interface BaseProps {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  links?: readonly ProjectLinkItem[];
  className?: string;
}

interface CardProps extends BaseProps {
  image?: string;
  video?: string;
}

// Featured card — image + metadata
export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  links,
  image,
  video,
  className,
}: CardProps) {
  const visibleTags = tags.slice(0, 4);
  const overflow = tags.length - visibleTags.length;

  return (
    <div
      className={cn(
        "flex flex-col h-full border border-border bg-card rounded-lg overflow-hidden hover:border-foreground/25 transition-colors duration-200 group",
        className
      )}
    >
      {/* Thumbnail */}
      <Link
        href={href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block shrink-0"
      >
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-36 object-cover"
          />
        ) : image ? (
          <ProjectImage src={image} alt={title} />
        ) : (
          <div className="w-full h-36 bg-muted" />
        )}
        {/* Link badges overlay */}
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex gap-1.5">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 h-6 px-2 rounded-md bg-background/90 border border-border text-[11px] font-medium text-foreground backdrop-blur-sm hover:bg-background transition-colors"
              >
                {link.icon}
                {link.type}
              </a>
            ))}
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold leading-snug">{title}</h3>
            <time className="text-[11px] text-muted-foreground">{dates}</time>
          </div>
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-0.5"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-auto">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="h-5 px-1.5 rounded border border-border text-[11px] text-muted-foreground font-medium"
            >
              {tag}
            </span>
          ))}
          {overflow > 0 && (
            <span className="h-5 px-1.5 rounded border border-border text-[11px] text-muted-foreground font-medium">
              +{overflow}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Compact row — no image, for list view
export function ProjectRow({
  title,
  href,
  dates,
  tags,
  links,
  className,
}: BaseProps) {
  const visibleTags = tags.slice(0, 3);
  const overflow = tags.length - visibleTags.length;

  return (
    <Link
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center gap-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 -mx-3 px-3 rounded-md transition-colors",
        className
      )}
    >
      {/* Title + date */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{title}</p>
        <time className="text-[11px] text-muted-foreground">{dates}</time>
      </div>

      {/* Tags */}
      <div className="hidden sm:flex items-center gap-1 shrink-0">
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className="h-5 px-1.5 rounded border border-border text-[11px] text-muted-foreground font-medium"
          >
            {tag}
          </span>
        ))}
        {overflow > 0 && (
          <span className="h-5 px-1.5 rounded border border-border text-[11px] text-muted-foreground font-medium">
            +{overflow}
          </span>
        )}
      </div>

      <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
    </Link>
  );
}
