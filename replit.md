# Typing Test Application

## Overview

This is a modern typing test application built with React and Express, featuring a French-focused interface with multi-language support. The application provides real-time typing performance tracking, customizable test configurations, and detailed performance analytics.

## User Preferences

Preferred communication style: Simple, everyday language.
Deployment preference: Vercel for cost optimization (€0/month vs €130/month on Replit).

## Recent Changes

- **January 13, 2025**: Prepared complete migration to Vercel with optimized serverless architecture
- **January 13, 2025**: Created comprehensive deployment documentation and build scripts
- **January 13, 2025**: Configured Vercel-compatible API structure with express serverless functions
- **January 13, 2025**: Added environment configuration for Neon PostgreSQL database
- **January 13, 2025**: ✅ MIGRATION COMPLETED - Successful Vercel deployment with optimized configuration
- **January 13, 2025**: Optimized deployment costs from €130/month to €0/month (free tier)
- **January 14, 2025**: Fixed Vercel build error by integrating Google Ads script directly into App.tsx
- **January 14, 2025**: Removed external google-ads-script.tsx component causing ENOENT build failures
- **January 14, 2025**: Production build validated - ads.txt correctly included, Google Ads loading properly
- **January 14, 2025**: Application ready for Google AdSense approval with optimized ad integration
- **January 12, 2025**: Added persistent global navigation bar for seamless app navigation
- **January 12, 2025**: Fixed test result saving bug (corrected API request parameter order)
- **January 12, 2025**: Integrated Google Ads subtly with reusable AdBanner component (2 ads per page)
- **January 12, 2025**: Moved multiplayer mode to free tier - now available to all users
- **January 12, 2025**: Added comprehensive multiplayer page with room creation and real-time features
- **January 12, 2025**: Added challenge system with visual progress indicators and target WPM markers
- **January 12, 2025**: Fixed Premium button color contrast issue (white text on white background)
- **January 12, 2025**: Implemented user challenge functionality with URL parameters and progress tracking
- **January 12, 2025**: Fixed leaderboard filtering system with comprehensive test data (100 users from 30+ countries)
- **January 12, 2025**: Added dynamic region-specific filtering (World/Continent/Country selection)
- **January 12, 2025**: Implemented realistic user profiles with country-specific names and performance data
- **January 12, 2025**: Created global leaderboard system with region and time filters
- **January 12, 2025**: Added comprehensive ranking system with World/Continent/Country filters
- **January 12, 2025**: Implemented time-based leaderboard filtering (Day/Week/Month/Year/All-time)
- **January 12, 2025**: Implemented comprehensive premium features system with advanced database schema
- **January 12, 2025**: Added premium subscription plans with custom texts and advanced stats
- **January 12, 2025**: Created premium page with detailed pricing and feature comparison
- **January 12, 2025**: Added premium banners and feature previews throughout the application
- **January 12, 2025**: Added localStorage for non-authenticated users to save test results temporarily
- **January 12, 2025**: Enhanced signup modal with Google/Apple authentication options  
- **January 12, 2025**: Modified user experience flow - direct access to typing test for all users
- **January 12, 2025**: Added signup modal that appears after first test completion for unauthenticated users
- **January 12, 2025**: Implemented infinite text mode for time-based tests (1min, 3min, 5min)
- **January 12, 2025**: Fixed duplicate result saving issues - now saves only once per test
- **January 12, 2025**: Added user profile page with personal statistics and test history
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
   - localStorage for non-authenticated users (temporary storage)
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
   - Multiple authentication options (Replit, Google, Apple)
   - Premium subscription interface with feature comparison
   - Premium banners and locked feature previews

4. **Text Management**
   - Predefined text samples for different difficulties
   - Language-specific content
   - Server-side text sample API
   - Premium custom texts (code, medical, juridical, technical)
   - User-generated content system for premium users

5. **Premium Features System**
   - Advanced database schema for premium subscriptions
   - Custom texts with specialized categories (code, medical, juridical)
   - Premium-only competitive features and tournaments
   - Advanced typing statistics with keystroke analysis
   - Theme customization and personalization options
   - Data export functionality (PDF, CSV, Excel)
   - Training programs with intelligent exercise generation
   - Premium-only features with access control

6. **Global Leaderboard System**
   - Real-time global rankings with filtering capabilities
   - Region-based filtering (World, Continent, Country)
   - Time-based filtering (Day, Week, Month, Year, All-time)
   - User position tracking and performance comparison
   - Premium and free tier leaderboard integration
   - Responsive design for all screen sizes

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
- **Premium Features**: Comprehensive database schema for advanced features

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