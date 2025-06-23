# Zigtask Client

## Project Overview

Zigtask Client is a modern, responsive task management web application built with Next.js 15. It provides:

- **Interactive Kanban Board**: Drag-and-drop task management with real-time status updates
- **User Authentication**: Secure login/register with JWT token management
- **Task Management**: Full CRUD operations with rich task details (title, description, due dates, priority)
- **Advanced Filtering**: Search tasks by title and filter by due dates
- **Modern UI/UX**: Beautiful, responsive design with dark/light theme support
- **Real-time Updates**: Optimistic updates with React Query for seamless user experience
- **Type Safety**: Full TypeScript implementation with Zod validation

## Setup & Run Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Backend API server running (Zigtask API)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd zigtask-client
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
NEXT_PUBLIC_JWT_EXPIRED_IN=24h
```

### Running the Frontend

```bash
# Development mode with Turbopack
npm run dev

# Production build
npm run build
npm run start

# Linting
npm run lint
```

The application will be available at `http://localhost:3002`

## Decisions & Trade-offs

### Frontend Framework

- **Choice**: Next.js 15 with App Router and Turbopack
- **Trade-off**: Learning curve vs. performance and developer experience
- **Rationale**: Excellent performance, built-in optimizations, and modern React patterns

### State Management

- **Choice**: Zustand with Immer for global state, React Query for server state
- **Trade-off**: Multiple state solutions vs. specialized tools for specific use cases
- **Rationale**: Zustand for simple global state (UI state), React Query for complex server state management

### UI Component Library

- **Choice**: Custom components built with Radix UI primitives and Tailwind CSS
- **Trade-off**: More development time vs. complete design control and smaller bundle
- **Rationale**: Better performance, full customization, and modern accessibility standards

### Drag & Drop Implementation

- **Choice**: @dnd-kit for task board interactions
- **Trade-off**: Library complexity vs. robust, accessible drag-and-drop functionality
- **Rationale**: Excellent performance, accessibility, and modern React integration

### Form Management

- **Choice**: React Hook Form with Zod validation
- **Trade-off**: More setup vs. excellent performance and type safety
- **Rationale**: Uncontrolled components for better performance, Zod for runtime type safety

### API Client

- **Choice**: Axios with custom interceptors and React Query
- **Trade-off**: More configuration vs. powerful caching, background updates, and error handling
- **Rationale**: React Query provides excellent caching, optimistic updates, and error recovery

### Authentication Strategy

- **Choice**: JWT tokens stored in HTTP-only cookies
- **Trade-off**: Stateless vs. security and automatic token management
- **Rationale**: Better security than localStorage, automatic token handling

### Theme Implementation

- **Choice**: next-themes with CSS variables and Tailwind
- **Trade-off**: More CSS setup vs. excellent performance and design system consistency
- **Rationale**: CSS variables for better performance, Tailwind for design consistency

### Architecture Decisions

- **Choice**: Feature-based modular architecture with shared components
- **Trade-off**: More initial setup vs. better maintainability and scalability
- **Rationale**: Clear separation of concerns, reusable components, easier testing

## Key Features

### Task Management

- **Kanban Board**: Visual task organization with drag-and-drop between columns
- **Task Creation**: Rich task forms with title, description, due dates, and status
- **Task Editing**: In-place editing with real-time updates
- **Task Deletion**: Confirmation-based deletion with optimistic updates

### User Experience

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme**: Automatic theme detection with manual toggle
- **Loading States**: Skeleton loaders and loading indicators throughout
- **Error Handling**: Graceful error handling with user-friendly messages
- **Optimistic Updates**: Immediate UI feedback for better perceived performance

### Performance Optimizations

- **Turbopack**: Fast development builds
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js built-in image optimization
- **Caching**: React Query for intelligent data caching
- **Bundle Optimization**: Tree shaking and minimal dependencies

## Screenshots

![Zigtask Client Interface](https://i.ibb.co/wkgZsNF/Screenshot-2025-06-23-110142.png)

_Login page_

![Zigtask Client Interface](https://i.ibb.co/mrZycynb/Screenshot-2025-06-23-110157.png)

_Signup page_

![Zigtask Client Interface](https://i.ibb.co/cKy8FbXs/Screenshot-2025-06-23-111103.png)

_Task Dashboard with search functionality (url search params)_

![Zigtask Client Interface](https://i.ibb.co/Cs65f6Fq/Screenshot-2025-06-23-111117.png)

_Edit task dialog_

![Zigtask Client Interface](https://i.ibb.co/YTNgqvXS/Screenshot-2025-06-23-111125.png)

_Create task dialog_

![Zigtask Client Interface](https://i.ibb.co/0VFkD6nB/Screenshot-2025-06-23-111131.png)
![Zigtask Client Interface](https://i.ibb.co/1f31wr6z/Screenshot-2025-06-23-111137.png)

_Dark theme interface_
