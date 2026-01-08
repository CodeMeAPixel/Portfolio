import { Project } from "@/types/project";

const project: Project = {
    id: "socket0",
    title: "Socket0",
    description: "A robust, lightweight WebSocket server for building real time applications with authorization, broadcasting, and channel management.",
    longDescription: `
# Socket0

I built Socket0 to provide a simple yet powerful WebSocket server that handles the common patterns needed in real time applications.

## Philosophy

A WebSocket server should focus on transmitting messages in real time between connected parties. Authorization should be delegated to external services. The protocol should be simple and intuitive. Resource efficiency and reliability are paramount.

## What I Built

### Simple Protocol
Designed a JSON based messaging protocol with clear commands:
- \`join\` - Subscribe to a channel
- \`leave\` - Unsubscribe from a channel
- \`broadcast\` - Send a message to a channel

### Authorization System
Implemented webhook based authorization that validates connections and messages:
- HTTP 200 OK accepts connections/messages
- External service handles all auth logic
- Validates initial connections with a special "connect" command

### Message Broker Architecture
Built a flexible broker system supporting multiple backends:
- **Memory Broker** - In-process pub/sub for single instance deployments
- **Redis Broker** - Distributed messaging for multi instance scaling

### HTTP Broadcasting
Added server to server HTTP broadcasting endpoint for backend services to push messages without maintaining WebSocket connections.

## Technical Highlights

### Session Management
- Context aware goroutine lifecycle management
- Proper cleanup on disconnect
- Channel subscription tracking per session

### Testing
Comprehensive test suite including:
- Unit tests for configuration and brokers
- Integration tests for WebSocket flows
- Authorizer webhook tests

### Deployment
- Docker support with multi stage builds
- Docker Compose examples with Redis
- Systemd service templates
- Health check endpoints

## What I Learned

Building Socket0 taught me:
- **Go Concurrency** - Managing goroutines, channels, and context cancellation
- **WebSocket Protocol** - Low level WebSocket handling in Go
- **Pub/Sub Patterns** - Designing scalable message distribution systems
- **Testing Strategies** - Integration testing for real-time systems
    `,
    tags: ["Go", "WebSocket", "Real-time", "Redis", "Pub/Sub", "Open Source"],
    links: {
        github: "https://github.com/ByteBrushStudios/socket0",
        support: "https://discord.gg/Vv2bdC44Ge"
    },
    featured: false,
    technologies: [
        { name: "Go", description: "High performance systems programming language" },
        { name: "Redis", description: "In memory data store for distributed pub/sub messaging" },
        { name: "WebSocket", description: "Full duplex communication protocol for real time data" },
        { name: "Echo", description: "High performance Go web framework" },
        { name: "Docker", description: "Containerization for consistent deployments" }
    ],
    challenges: [
        "Managing goroutine lifecycles without memory leaks",
        "Supporting multiple broker backends with a unified interface",
        "Implementing external authorization without blocking connections",
        "Handling graceful shutdown with active WebSocket connections"
    ],
    solutions: [
        "Context based cancellation with proper channel cleanup on disconnect",
        "Driver interface pattern allowing memory and Redis backends",
        "Non blocking webhook calls with configurable timeout",
        "Signal handling with connection draining before shutdown"
    ],
    keyFeatures: [
        "Simple JSON-based messaging protocol",
        "Webhook based authorization",
        "Multiple broker support (Memory, Redis)",
        "Channel management (join, leave, broadcast)",
        "HTTP broadcasting API",
        "Graceful shutdown support",
        "Health check endpoint",
        "Docker and Kubernetes ready"
    ],
    date: "2025-05-08",
    role: "Lead Developer",
    teamSize: 2
};

export default project;
