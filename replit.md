# Typing Test Application

## Overview

This is a modern typing test application built with React and Express, featuring a French-focused interface with multi-language support. The application provides real-time typing performance tracking, customizable test configurations, and detailed performance analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **January 12, 2025**: Modified user experience flow - direct access to typing test for all users
- **January 12, 2025**: Added signup modal that appears after first test completion for unauthenticated users
- **January 12, 2025**: Implemented infinite text mode for time-based tests (1min, 3min, 5min)
- **January 12, 2025**: Fixed duplicate result saving issues - now saves only once per test
- **January 12, 2025**: Added user profile page with personal statistics and test history
- **January 12, 2025**: Created landing page for unauthenticated users with authentication flow
- **January 12, 2025**: Enhanced text generation system for continuous typing during timed tests
- **January 12, 2025**: PostgreSQL database with user authentication via Replit Auth

## System Architecture

### Frontend Architecture

The frontend is built using React with TypeScript and follows a modern component-based architecture:

- **UI Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite for development and production builds
- **State Management**: React hooks (useState, useEffect, custom hooks)
- **Data Fetching**: TanStack Query (React Query) for API calls
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture

The backend is a Node.js Express server with the following characteristics:

- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured via DATABASE_URL)
- **Authentication**: Replit Auth with OpenID Connect integration
- **Session Management**: PostgreSQL-based session storage
- **Data Storage**: Full database implementation with user profiles and test results
- **API Design**: RESTful API with JSON responses and authentication middleware

### Key Components

1. **Typing Test Engine**
   - Real-time WPM (Words Per Minute) calculation
   - Accuracy tracking with error detection
   - Multiple test modes (1min, 3min, 5min, words)
   - Infinite text generation for time-based modes
   - Difficulty levels (easy, medium, hard, random)
   - Multi-language support (French, English, Spanish, German)

2. **Performance Tracking**
   - Database storage for authenticated user results
   - Personal statistics and performance history
   - User profile with detailed analytics
   - Real-time performance dashboard
   - Duplicate result prevention system

3. **User Interface**
   - Virtual keyboard with real-time key highlighting
   - Text highlighting for typing progress
   - Responsive design for mobile and desktop
   - Toast notifications for user feedback
   - Authentication-aware navigation and features
   - Direct access to typing test for all users
   - Signup modal after first test completion for unauthenticated users

4. **Text Management**
   - Predefined text samples for different difficulties
   - Language-specific content
   - Server-side text sample API

## Data Flow

1. **Test Configuration**: User selects mode, difficulty, and language
2. **Text Fetching**: Client requests text sample from server based on configuration
3. **Test Execution**: Real-time typing tracking with performance calculations
4. **Result Storage**: Performance data stored locally and optionally sent to server
5. **Analytics**: Performance history analysis and statistics generation

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Form Handling**: React Hook Form with Zod validation
- **Carousel**: Embla Carousel

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod for schema validation
- **Build Tools**: esbuild for production builds

## Deployment Strategy

### Development
- **Dev Server**: Vite dev server with HMR (Hot Module Replacement)
- **API Server**: Express server with tsx for TypeScript execution
- **Database**: PostgreSQL via environment variable configuration

### Production
- **Build Process**: 
  - Frontend: Vite build to `dist/public`
  - Backend: esbuild bundle to `dist/index.js`
- **Deployment**: Single Node.js process serving both API and static files
- **Database**: PostgreSQL with Drizzle migrations

### Configuration
- **Environment Variables**: DATABASE_URL for database connection
- **Database Migrations**: Drizzle Kit for schema management
- **Path Aliases**: TypeScript path mapping for clean imports

The application uses a hybrid approach where the current implementation includes in-memory storage for development/testing, with a clear interface for database integration using Drizzle ORM and PostgreSQL for production use.