"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  duration?: number;
  children: React.ReactNode;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  duration = 30,
  children,
}: MarqueeProps) {
  const animationStyle = {
    animation: `${reverse ? "marquee-reverse" : "marquee"} ${duration}s linear infinite`,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "group flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 gap-2",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={animationStyle}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "flex min-w-full shrink-0 gap-2",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={animationStyle}
      >
        {children}
      </div>
    </div>
  );
}
