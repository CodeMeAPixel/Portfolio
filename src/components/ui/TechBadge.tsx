import React from 'react';
import { TechIcon } from './TechIcon';

interface TechBadgeProps {
    name: string;
    size?: 'sm' | 'md' | 'lg';
    showIcon?: boolean;
}

export default function TechBadge({
    name,
    size = 'md',
    showIcon = true
}: TechBadgeProps) {
    const sizeClasses = {
        sm: 'text-[10px] py-0.5 px-2 gap-1',
        md: 'text-xs py-1 px-2.5 gap-1.5',
        lg: 'text-sm py-1.5 px-3 gap-2',
    };

    const iconSize = {
        sm: 10,
        md: 14,
        lg: 18,
    };

    return (
        <div className={`
            inline-flex items-center rounded-full
            bg-white/5 backdrop-blur-sm border border-white/10
            ${sizeClasses[size]}
            hover:bg-white/10 hover:border-primary-500/30 
            transition-all duration-300 group
        `}>
            {showIcon && (
                <span className="group-hover:scale-110 transition-transform duration-300">
                    <TechIcon
                        name={name.toLowerCase()}
                        size={iconSize[size]}
                    />
                </span>
            )}
            <span className="text-color-text-muted group-hover:text-primary-300 transition-colors font-medium">{name}</span>
        </div>
    );
}
