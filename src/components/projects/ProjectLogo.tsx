"use client";

interface ProjectLogoProps {
    title: string;
    className?: string;
    showText?: boolean;
}

export function ProjectLogo({ title, className = "", showText = true }: ProjectLogoProps) {
    // Extract initials from title
    const initials = title
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    // Generate a consistent color based on title hash
    const getColor = (str: string) => {
        const colors = [
            'from-blue-600 to-blue-400',
            'from-purple-600 to-purple-400',
            'from-pink-600 to-pink-400',
            'from-cyan-600 to-cyan-400',
            'from-emerald-600 to-emerald-400',
            'from-amber-600 to-amber-400',
            'from-rose-600 to-rose-400',
            'from-indigo-600 to-indigo-400',
        ];

        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const colorGradient = getColor(title);

    return (
        <div
            className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden ${className}`}
        >
            {/* Animated background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colorGradient} opacity-90`}></div>

            {/* Decorative animated circles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
                <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
            </div>

            {/* Project/Code themed icon */}
            <div className="relative z-10 flex flex-col items-center gap-4">
                {/* Code brackets icon */}
                <div className="relative">
                    <svg className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                        {/* Code brackets */}
                        <path d="M9.4 16.6L4.8 12l4.6-4.6M14.6 16.6l4.6-4.6-4.6-4.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>

                    {/* Glowing pulse effect */}
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-lg animate-pulse" style={{ animationDuration: '3s' }}></div>
                </div>

                {/* Title or initials */}
                {showText && (
                    <div className="text-center">
                        <div className="text-sm font-bold text-white/90 uppercase tracking-wider drop-shadow-md">
                            {initials}
                        </div>
                        <div className="text-xs text-white/70 mt-1 max-w-[100px] line-clamp-2 drop-shadow-md">
                            {title}
                        </div>
                    </div>
                )}
            </div>

            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

            {/* Bottom subtle vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-5"></div>
        </div>
    );
}
