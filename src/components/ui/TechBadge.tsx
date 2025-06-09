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
        sm: 'text-xs py-0.5 px-2',
        md: 'text-sm py-1 px-2.5',
        lg: 'text-base py-1.5 px-3',
    };

    const iconSize = {
        sm: 12,
        md: 16,
        lg: 20,
    };

    return (
        <div className={`
            inline-flex items-center rounded-full
            bg-primary-900/30 border border-primary-700/30 
            ${sizeClasses[size]}
            hover:bg-primary-800/40 hover:border-primary-600/40 transition-colors
        `}>
            {showIcon && (
                <span className="mr-1.5">
                    <TechIcon
                        name={name.toLowerCase()}
                        size={iconSize[size]}
                    />
                </span>
            )}
            <span className="text-primary-300">{name}</span>
        </div>
    );
}
