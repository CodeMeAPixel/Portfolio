"use client";

interface FivemScriptLogoProps {
    title: string;
    className?: string;
    showText?: boolean;
}

export function FivemScriptLogo({ title, className = "", showText = true }: FivemScriptLogoProps) {
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

            {/* FiveM/FXServer themed icon */}
            <div className="relative z-10 flex flex-col items-center gap-4">
                {/* Server icon */}
                <div className="relative">
                    <svg className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                        {/* Server/Monitor icon */}
                        <path d="M20 13H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm-1 6H5v-3h14v3z" />
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" opacity="0.3" />
                        <path d="M12 4c3.31 0 6 2.24 6 5v5H6V9c0-2.76 2.69-5 6-5z" opacity="0.2" />
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
