"use client";

import { motion } from "framer-motion";
import React from "react";

export function BackgroundEffects() {
    return (
        <>
            {/* Background grid effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 pixel-grid-layer-1"></div>
                <div className="absolute inset-0 pixel-grid-layer-2"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute text-primary-900/5 text-[10rem] md:text-[16rem] font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                />
                {/* Floating elements */}
                <motion.div
                    className="absolute top-[10%] right-[5%] w-72 h-72 bg-primary-500/5 rounded-full blur-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.div
                    className="absolute bottom-[15%] left-[10%] w-96 h-96 bg-primary-400/5 rounded-full blur-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                />
            </div>
        </>
    );
}
