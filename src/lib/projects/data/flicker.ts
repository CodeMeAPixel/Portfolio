import { Project } from "@/types/project";

const project: Project = {
    id: "flicker",
    title: "Flicker",
    description: "A powerful, cross platform screenshot and upload tool for Emberly, built with Tauri for desktop and mobile.",
    longDescription: `
# Flicker

As the **Founder of Emberly**, I'm building Flicker a cross platform companion app for Emberly that brings ShareX like functionality to desktop and mobile with a modern twist.

> ⚠️ **Work in Progress** - Flicker is currently in alpha development.

## The Vision

Emberly needed a native application that could capture screenshots, upload files, and manage uploads without opening a browser on any device. Flicker fills that gap with global hotkeys on desktop, system tray integration, mobile friendly gestures, and seamless Emberly integration across all platforms.

## What We're Building

### Screenshot Capture
- Fullscreen screenshot capture with global hotkeys
- Region selection (coming soon)
- Upload from clipboard support

### Instant Upload
After capture, screenshots are automatically:
- Saved locally to Pictures/Flicker Screenshots
- Uploaded to your Emberly account
- URL copied to clipboard
- Desktop notification with preview

### Authentication
- Sign in with Emberly account (email + password)
- Two factor authentication (TOTP) support
- Manual token entry option
- Session persistence

### Theme System
15 built-in themes including:
- Stranger Things (default) - Red neon with cyan accents
- Emberly Classic - Purple gradient
- Cyberpunk Neon
- Ocean Depths
- Tokyo Night
- And many more...

## Technical Highlights

### Stack
- **Tauri 2.0** - Secure, lightweight desktop framework
- **React + TypeScript** - Modern frontend
- **Rust Backend** - Multi-threaded upload handling
- **Tailwind CSS** - Responsive styling

### Desktop Features
- System tray with quick actions
- Global hotkey registration
- Native file system access
- Desktop notifications with image preview

### User Experience
- Polished splash screen with loading phases
- Rotating fun facts and tips (50+ messages)
- Smooth animations throughout
- Privacy controls for debug information

## Current Status

### Implemented ✅
- Fullscreen screenshot capture
- Auto-upload to Emberly
- Desktop notifications
- User authentication with 2FA
- Theme system with 15 themes
- System tray integration
- Upload history

### Coming Soon 🚧
- Region screenshot selection
- Drag-and-drop upload
- Upload history search/filter
- Custom theme creation
- Multiple monitor support
    `,
    tags: ["Tauri", "React", "TypeScript", "Rust", "Desktop App", "Open Source", "WIP"],
    links: {
        github: "https://github.com/EmberlyOSS/Flicker",
        demo: "https://embrly.ca",
        support: "https://embrly.ca/discord"
    },
    featured: false,
    technologies: [
        { name: "Tauri", description: "Secure, lightweight framework for desktop applications" },
        { name: "React", description: "Modern frontend library for the UI" },
        { name: "TypeScript", description: "Type-safe development for the frontend" },
        { name: "Rust", description: "Backend for screenshot capture and file handling" },
        { name: "Tailwind CSS", description: "Utility-first styling with custom theme support" },
    ],
    challenges: [
        "Implementing global hotkeys that work system-wide across platforms",
        "Handling multi threaded screenshot capture and upload in Rust",
        "Creating a polished splash screen experience",
        "Supporting multiple authentication methods including 2FA"
    ],
    solutions: [
        "Tauri's global shortcut plugin with platform specific key handling",
        "Rust's async runtime with channels for upload progress",
        "React state machine for multi phase loading with smooth animations",
        "NextAuth compatible login flow with TOTP support"
    ],
    keyFeatures: [
        "Fullscreen screenshot capture with global hotkeys",
        "Automatic upload to Emberly",
        "Desktop notifications with preview",
        "15 built in color themes",
        "System tray integration (desktop)",
        "Two factor authentication support",
        "Upload history tracking",
        "Cross platform (Windows, macOS, Linux, iOS, Android)"
    ],
    date: "2026-01-01",
    role: "Developer",
    teamSize: 2
};

export default project;
