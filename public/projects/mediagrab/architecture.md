graph TB
    subgraph "MediaGrab Architecture"
        direction TB
        
        subgraph "Frontends"
            Web["🌐 Web Client\nNext.js 16 + React 19\nTypeScript + Tailwind 4"]
            Desktop["🖥️ Desktop App\nWPF + .NET 10\nC# + XAML"]
        end

        subgraph "Backend"
            API["⚡ FastAPI Service\nPython 3.12 + Uvicorn\nPydantic Models"]
        end

        subgraph "Core Download Engine"
            YTDLP["📥 yt-dlp\nVideo/Audio Extraction\nFormat Selection"]
            FFMPEG["🎬 FFmpeg\nTranscoding + Metadata\nThumbnail Conversion"]
            DENO["🟢 Deno Runtime\nJS Extractors Support"]
        end

        subgraph "Infrastructure"
            COMPOSE["🐳 Docker Compose\nMulti-container Orchestration"]
            VERCEL["▲ Vercel\nWeb Hosting + Rewrites"]
            CONTAINER["📦 Container Host\nAPI Deployment"]
        end
    end

    %% Connections
    Web -->|"HTTPS /api/*\n(Rewritten to API)"| API
    Desktop -->|"Process Execution\nyt-dlp.exe + ffmpeg.exe"| YTDLP
    Desktop -->|"Bundled Binaries"| FFMPEG
    Desktop -->|"Bundled Binary"| DENO
    
    API -->|"Background Tasks\nProcess Execution"| YTDLP
    API -->|"Post-processors"| FFMPEG
    API -->|"js_runtimes Config"| DENO

    COMPOSE -->|"Builds & Runs"| API
    COMPOSE -->|"Builds & Runs"| Web
    VERCEL -->|"Hosts + Rewrites"| Web
    CONTAINER -->|"Runs"| API

    %% Styling
    classDef frontend fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef backend fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef core fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,color:#e65100
    classDef infra fill:#fce4ec,stroke:#c2185b,stroke-width:2px,color:#880e4f

    class Web,Desktop frontend
    class API backend
    class YTDLP,FFMPEG,DENO core
    class COMPOSE,VERCEL,CONTAINER infra