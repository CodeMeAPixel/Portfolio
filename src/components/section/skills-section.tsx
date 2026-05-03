"use client";

import { useState } from "react";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

const LEVEL_LABELS: Record<number, string> = {
  1: "Beginner",
  2: "Familiar",
  3: "Proficient",
  4: "Advanced",
  5: "Expert",
};

function LevelDots({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-0.75 ml-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "size-1 rounded-full transition-colors",
            i < level ? "bg-foreground/50" : "bg-border"
          )}
        />
      ))}
    </span>
  );
}

export default function SkillsSection() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const category = DATA.skills[active];

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      {/* Tab bar */}
      <div className="flex flex-wrap gap-1.5">
        {DATA.skills.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActive(i)}
            className={cn(
              "flex items-center gap-1.5 h-7 px-3 rounded-md border text-xs font-medium transition-colors cursor-pointer shrink-0",
              i === active
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
            )}
          >
            <cat.icon className="size-3 shrink-0" />
            {cat.name}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div className="flex flex-wrap gap-2 min-h-18">
        {category.skills.map((skill) => (
          <div
            key={skill.name}
            onMouseEnter={() => setHovered(skill.name)}
            onMouseLeave={() => setHovered(null)}
            className="relative flex items-center gap-2 h-8 px-3 rounded-md border border-border bg-muted/30 text-xs font-medium text-foreground cursor-default shrink-0"
          >
            {skill.icon && <skill.icon className="size-3.5 shrink-0 text-muted-foreground" />}
            {skill.name}
            <LevelDots level={skill.level} />

            {/* Tooltip */}
            {hovered === skill.name && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background border border-border rounded-md px-2 py-1 text-[11px] text-muted-foreground shadow-sm z-10 pointer-events-none">
                {LEVEL_LABELS[skill.level]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
        {Object.entries(LEVEL_LABELS).map(([lvl, label]) => (
          <div key={lvl} className="flex items-center gap-1.5 shrink-0">
            <span className="flex items-center gap-0.75">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "size-1 rounded-full",
                    i < Number(lvl) ? "bg-foreground/50" : "bg-border"
                  )}
                />
              ))}
            </span>
            <span className="text-[11px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
