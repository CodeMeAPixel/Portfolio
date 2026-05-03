"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 mt-8">
      <Dock className="z-50 pointer-events-auto relative h-12 p-1.5 w-fit mx-auto flex gap-1.5 border border-border/70 bg-background/85 backdrop-blur-md shadow-sm">
        {DATA.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <DockIcon className="rounded-lg cursor-pointer size-full bg-transparent p-0 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
                    <item.icon className="size-full rounded-sm overflow-hidden object-contain" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="rounded-md bg-background border border-border text-foreground px-3 py-1.5 text-xs shadow-sm"
              >
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
        <div
          aria-hidden="true"
          className="h-2/3 m-auto w-px shrink-0 bg-border"
        />
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => {
            const isExternal = social.url.startsWith("http");
            const IconComponent = social.icon;
            return (
              <Tooltip key={`social-${name}`}>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    <DockIcon className="rounded-lg cursor-pointer size-full bg-transparent p-0 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
                      <IconComponent className="size-full rounded-sm overflow-hidden object-contain" />
                    </DockIcon>
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={8}
                  className="rounded-md bg-background border border-border text-foreground px-3 py-1.5 text-xs shadow-sm"
                >
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        <div
          aria-hidden="true"
          className="h-2/3 m-auto w-px shrink-0 bg-border"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className="rounded-lg cursor-pointer size-full bg-transparent p-0 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
              <ModeToggle className="size-full cursor-pointer" />
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-md bg-background border border-border text-foreground px-3 py-1.5 text-xs shadow-sm"
          >
            <p>Theme</p>
          </TooltipContent>
        </Tooltip>
      </Dock>
    </div>
  );
}
