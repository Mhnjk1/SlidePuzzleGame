# Motion Challenge - Sliding Block Puzzle Game

## Overview

This is a full-stack sliding block puzzle game built with React, TypeScript, Express, and PostgreSQL. Players solve 20 progressively challenging puzzles by moving blocks to clear a path for a ball from start to finish. The game includes features like timed challenges, move counting, mistake review, and comprehensive performance analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- TailwindCSS for utility-first styling with a custom design system
- Radix UI for accessible, unstyled component primitives

**State Management:**
- Zustand for lightweight, hook-based state management
- Three separate stores for game logic (`useMotionGame`), audio controls (`useAudio`), and generic game state (`useGame`)
- No server state management currently implemented - all game state is client-side only

**Component Architecture:**
- Modular component structure with clear separation of concerns
- Game components (`MotionGame`, `PuzzleGrid`, `GameControls`, `GameHeader`)
- Analytics components (`SummaryDashboard`, `MistakeReview`)
- Reusable UI component library in `client/src/components/ui/` based on shadcn/ui patterns
- Theme system with dark/light mode support via Context API

**Rendering Strategy:**
- Single Page Application (SPA) with client-side routing capability
- All game logic runs entirely in the browser
- No server-side rendering or hydration

**Key Design Patterns:**
- Custom hooks for reusable logic (`useIsMobile`, `useTheme`)
- Context providers for cross-cutting concerns (theme, audio)
- Component composition using Radix UI's `Slot` pattern
- Pathfinding algorithm implementation for puzzle validation

### Backend Architecture

**Technology Stack:**
- Express.js as the HTTP server framework
- TypeScript with ESM module system
- Node.js runtime environment

**Current Implementation:**
- Minimal backend with placeholder routes in `server/routes.ts`
- In-memory storage implementation (`MemStorage` class) with basic CRUD operations for users
- No authentication or session management currently implemented
- Vite middleware integration for development hot reloading
- Custom logging middleware for API request tracking

**Storage Layer:**
- `IStorage` interface defines the contract for data operations
- `MemStorage` provides in-memory implementation (data lost on restart)
- Ready to be replaced with database-backed implementation
- Basic user model with username and password fields

**API Design Philosophy:**
- RESTful conventions expected (though no routes currently implemented)
- All API routes should be prefixed with `/api`
- JSON request/response format
- Error handling middleware configured for consistent error responses

### Data Storage Solutions

**Database Configuration:**
- PostgreSQL as the primary database (configured via Drizzle)
- Neon Database serverless driver (`@neondatabase/serverless`)
- Database connection via `DATABASE_URL` environment variable
- Migration files stored in `./migrations` directory

**ORM and Schema:**
- Drizzle ORM for type-safe database operations
- Schema defined in `shared/schema.ts` using Drizzle's table builders
- Zod integration for runtime validation of insert operations
- Current schema includes only a `users` table with id, username, and password

**Schema Design:**
- Users table with auto-incrementing primary key
- Unique constraint on username field
- TypeScript types auto-generated from schema definitions
- Schema shared between client and server via `@shared` alias

**Migration Strategy:**
- Drizzle Kit for schema migrations
- `db:push` script for pushing schema changes to database
- Migrations configured to use PostgreSQL dialect

### Authentication and Authorization

**Current State:**
- No authentication system implemented
- User schema exists but no login/registration endpoints
- No session management or token-based auth
- No password hashing or security measures in place

**Placeholder Infrastructure:**
- `connect-pg-simple` dependency suggests intent for PostgreSQL-backed sessions
- User CRUD operations defined in storage interface
- Ready for authentication layer to be added

### External Dependencies

**UI Component Libraries:**
- Radix UI for 30+ accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- Class Variance Authority (CVA) for type-safe component variant management
- clsx and tailwind-merge for conditional className composition
- cmdk for command palette functionality

**3D and Graphics:**
- Three.js ecosystem via React Three Fiber (`@react-three/fiber`)
- React Three Drei for helpers and abstractions
- React Three Postprocessing for visual effects
- GLSL shader support via `vite-plugin-glsl`

**Developer Experience:**
- TypeScript for static type checking
- ESBuild for fast production builds
- TSX for running TypeScript directly in development
- Path aliases (`@/` for client, `@shared/` for shared code)

**Audio:**
- Browser native HTMLAudioElement API
- No external audio library dependencies
- Audio files expected in `/public/sounds/` directory

**Utilities:**
- date-fns for date manipulation
- nanoid for unique ID generation
- Fontsource for self-hosted Inter font files

**Development Tools:**
- Replit Vite plugin for runtime error overlays
- PostCSS with Autoprefixer for CSS processing
- Tailwind JIT compiler for optimized CSS output