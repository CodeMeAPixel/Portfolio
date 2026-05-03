"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard, ProjectRow } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const BLUR_FADE_DELAY = 0.04;
const FEATURED_COUNT = 2;
const ROWS_PER_PAGE = 2;

export default function ProjectsSection() {
    const featured = DATA.projects.slice(0, FEATURED_COUNT);
    const rest = DATA.projects.slice(FEATURED_COUNT);
    const [visibleRows, setVisibleRows] = useState(ROWS_PER_PAGE);

    const visible = rest.slice(0, visibleRows);
    const remaining = rest.length - visibleRows;
    const hasMore = remaining > 0;
    const canCollapse = visibleRows > ROWS_PER_PAGE;

    return (
        <section id="projects">
            <div className="flex min-h-0 flex-col gap-y-8">
                <div className="flex flex-col gap-y-4 items-center justify-center">
                    <div className="flex items-center w-full">
                        <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
                        <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                            <span className="text-background text-sm font-medium">My Projects</span>
                        </div>
                        <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
                    </div>
                    <div className="flex flex-col gap-y-3 items-center justify-center">
                        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Check out my latest work</h2>
                        <p className="text-muted-foreground text-sm md:text-base text-balance text-center">
                            I&apos;ve worked on a variety of projects, from simple
                            websites to complex web applications. Here are a few of my
                            favorites.
                        </p>
                    </div>
                </div>

                {/* Featured cards */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {featured.map((project, id) => (
                        <BlurFade
                            key={project.title}
                            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                            className="h-full"
                        >
                            <ProjectCard
                                href={project.href}
                                title={project.title}
                                description={project.description}
                                dates={project.dates}
                                tags={project.technologies}
                                image={project.image}
                                video={project.video}
                                links={project.links}
                            />
                        </BlurFade>
                    ))}
                </div>

                {/* List rows */}
                {rest.length > 0 && (
                    <div className="flex flex-col gap-y-1">
                        <div className="flex flex-col">
                            {visible.map((project, id) => (
                                <BlurFade
                                    key={project.title}
                                    delay={BLUR_FADE_DELAY * 14 + id * 0.05}
                                >
                                    <ProjectRow
                                        href={project.href}
                                        title={project.title}
                                        description={project.description}
                                        dates={project.dates}
                                        tags={project.technologies}
                                        links={project.links}
                                    />
                                </BlurFade>
                            ))}
                        </div>

                        {(hasMore || canCollapse) && (
                            <div className="flex items-center gap-3 mt-1">
                                {hasMore && (
                                    <button
                                        onClick={() => setVisibleRows((v) => v + ROWS_PER_PAGE)}
                                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
                                    >
                                        <ChevronDown className="size-3.5" />
                                        Show {Math.min(remaining, ROWS_PER_PAGE)} more
                                    </button>
                                )}
                                {hasMore && canCollapse && (
                                    <span className="text-border text-xs">·</span>
                                )}
                                {canCollapse && (
                                    <button
                                        onClick={() => setVisibleRows(ROWS_PER_PAGE)}
                                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
                                    >
                                        <ChevronUp className="size-3.5" />
                                        Show less
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

