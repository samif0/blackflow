# Blackflow

This repository contains the Next.js frontend and a small Go based authentication service.

## Requirements

- Node.js 20+
- Go 1.21+ (optional if running the auth service via Docker)
- Docker with Compose (for containerised workflow)

## Running locally

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

The application will be available at <http://localhost:3000>.

### Auth service

To run the Go auth service directly:

```bash
cd services/auth-service
go run main.go
```

It exposes `/api/auth/login` and `/api/auth/health` on port `8080`.

## Docker development

All services can be started with Docker Compose:

```bash
docker-compose up --build
```

This will launch:

- **blackflow-dev** – Next.js dev server on `localhost:3000`
- **auth-service** – Go service on `localhost:8080`
- **nginx** – reverse proxy for both services

## Building for production

To build the production image of the Next.js app:

```bash
docker build -t blackflow .
```

Or run `docker-compose up blackflow-prod` to start the production container.

