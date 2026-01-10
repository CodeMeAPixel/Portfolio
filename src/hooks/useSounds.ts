"use client";

import { useTheme } from "@/context/ThemeContext";
import { useCallback } from "react";

/**
 * Synthetic sounds for UI interactions
 * Generates simple beep/click sounds without requiring external audio files
 */
function createClickSound(): AudioBuffer {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.1, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
        // Sine wave frequency (800Hz)
        data[i] = Math.sin(2 * Math.PI * 800 * (i / audioContext.sampleRate)) * 0.3;
        // Envelope (fade out)
        data[i] *= Math.max(0, 1 - i / buffer.length);
    }

    return buffer;
}

export function useSounds() {
    const { soundsEnabled } = useTheme();

    const playSound = useCallback(
        (type: "click" | "hover" | "success" | "error") => {
            if (!soundsEnabled || typeof window === "undefined") return;

            try {
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                // Different frequencies and durations for different sounds
                const soundConfig = {
                    click: { frequency: 800, duration: 0.08 },
                    hover: { frequency: 600, duration: 0.05 },
                    success: { frequency: 1000, duration: 0.15 },
                    error: { frequency: 300, duration: 0.2 },
                };

                const config = soundConfig[type];
                oscillator.frequency.value = config.frequency;

                // Envelope
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + config.duration);

                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + config.duration);
            } catch (error) {
                console.error("Error playing sound:", error);
            }
        },
        [soundsEnabled]
    );

    return { playSound };
}
