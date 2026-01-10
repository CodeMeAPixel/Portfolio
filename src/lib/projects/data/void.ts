import { Project } from "@/types/project";

const project: Project = {
    id: "void",
    title: "Void",
    description: "A modern, high performance reverse proxy and maintenance system with intelligent traffic routing and beautiful maintenance pages.",
    longDescription: `
# Void

I created Void to solve a common infrastructure problem: displaying beautiful, informative maintenance pages when services are down, while also providing intelligent reverse proxy capabilities.

## The Vision

When services go down, users deserve more than a generic error page. Void provides intelligent traffic routing with beautiful, techy maintenance pages that keep users informed about service status, support channels, and when to expect recovery.

## What I Built

### Intelligent Reverse Proxy
Built a reverse proxy that automatically detects when backend services are healthy or unavailable:
- **Healthy Service** - Transparently proxies requests to backend
- **Unhealthy Service** - Displays beautiful maintenance page
- **API Endpoints** - Returns structured JSON for programmatic consumers

### Service Configuration
YAML based configuration system allowing multiple services:
- Individual backend URLs per service
- Domain based routing
- Support and status page links
- API URL detection for JSON responses

### Modern UI
Designed a stunning glassmorphic maintenance page featuring:
- Animated backgrounds with particle effects
- Responsive design for all devices
- Debug panel with server and client information
- Real time update checking from GitHub releases

### Smart API Handling
API endpoints receive structured JSON responses during maintenance instead of HTML, including service info, version details, and appropriate HTTP status codes.

## Technical Highlights

### Request Flow
1. Request arrives at Void
2. Domain matching against configured services
3. Health check attempt to backend
4. Success → Proxy to backend
5. Failure → Serve maintenance page or JSON

### Debug Information
The debug panel provides:
- Void server version and commit
- Client IP and geolocation (privacy-controlled)
- Browser detection
- Request path and hostname

### Deployment Options
- Nginx integration examples
- Traefik configuration
- Dokploy deployment
- Systemd service templates
- Docker and Kubernetes support

## What I Learned

Building Void taught me:
- **Reverse Proxy Design** - Go's httputil and request forwarding
- **Service Discovery** - Domain based routing patterns
- **UI Design** - Modern glassmorphic CSS effects
- **Infrastructure** - Integration with load balancers and orchestration tools
    `,
    images: [
        "/previews/void/preview-1.png",
        "/previews/void/preview-2.png"
    ],
    tags: ["Go", "Reverse Proxy", "DevOps", "Infrastructure", "Open Source"],
    links: {
        github: "https://github.com/ByteBrushStudios/void",
        support: "https://discord.gg/Vv2bdC44Ge"
    },
    featured: false,
    technologies: [
        { name: "HTML", description: "Semantic markup for the maintenance page structure" },
        { name: "Go", description: "High performance systems programming language for the proxy core" },
        { name: "Chi Router", description: "Lightweight HTTP router for Go" },
        { name: "Tailwind CSS", description: "Utility first CSS for the maintenance UI" },
        { name: "Docker", description: "Container support for easy deployment" }
    ],
    challenges: [
        "Detecting backend health without blocking user requests",
        "Serving appropriate responses for both browsers and API clients",
        "Creating a visually appealing maintenance page that's also informative",
        "Supporting multiple deployment scenarios (Nginx, Traefik, K8s)"
    ],
    solutions: [
        "Async health checking with configurable timeouts and fallback",
        "Content type detection and API URL matching for response format",
        "Glassmorphic UI with animated backgrounds and expandable debug panel",
        "Comprehensive configuration examples for all major platforms"
    ],
    keyFeatures: [
        "Intelligent reverse proxy with auto-failover",
        "Beautiful glassmorphic maintenance pages",
        "Domain based multi-service routing",
        "JSON responses for API endpoints",
        "Debug panel with client/server info",
        "GitHub release update checking",
        "Health check endpoints",
        "Docker and Kubernetes ready"
    ],
    date: "2025-05-08",
    role: "Lead Developer",
    teamSize: 2
};

export default project;
