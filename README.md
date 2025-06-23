# Zigtask API

## Project Overview

Zigtask is a comprehensive task management solution built with NestJS. It provides:

- **User Authentication**: Secure signup/login with JWT tokens
- **Task Management**: Full CRUD operations for tasks with status tracking
- **RESTful API**: Clean, well-structured endpoints following REST principles
- **Swagger/OpenAPI Documentation**: Interactive API documentation
- **Scalable Architecture**: Modular design with proper separation of concerns

## Setup & Run Instructions

### Backend Setup

#### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or cloud instance)

#### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd zigtask-api
```

2. Install dependencies:

```bash
npm install -f
```

3. Create `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/zigtask
JWT_SECRET=your-secret-key
CLIENT_URL=your-client-url
JWT_EXPIRED_IN=24h
```

#### Running the Backend

```bash
# Development mode
npm run start:dev

# Production build
npm run build
npm run start
```

#### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

## Decisions & Trade-offs

### Authentication Strategy

- **Choice**: JWT-based stateless authentication
- **Trade-off**: Simplicity and scalability vs. the need for refresh token implementation
- **Rationale**: Faster development and easier horizontal scaling

### Database Selection

- **Choice**: MongoDB for flexible document storage
- **Trade-off**: No SQL relations but simpler document structure for tasks
- **Rationale**: Tasks have varying attributes and MongoDB provides schema flexibility

### API Design Pattern

- **Choice**: RESTful endpoints with clear resource hierarchy
- **Trade-off**: Could have used GraphQL for more flexible queries
- **Rationale**: Simpler to implement, better caching, and easier to understand

### Error Handling Approach

- **Choice**: Global exception filter for consistent error responses
- **Trade-off**: More opinionated but better developer experience
- **Rationale**: Ensures consistent API responses across all endpoints

### Architecture Decisions

- **Choice**: Modular NestJS architecture with separate modules for auth, users, and tasks
- **Trade-off**: Slightly more boilerplate but better maintainability, scalability
- **Rationale**: Clear separation of concerns and easier testing

## Swagger/OpenAPI Documentation

The API is fully documented using Swagger/OpenAPI 3.0. After starting the backend server:

### Access Documentation

- **Interactive Docs**: `http://localhost:3001/api`
- **API Base URL**: `http://localhost:3001/api/v1`

## Screenshots
