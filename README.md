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

## Infrastructure

The `infra/` directory contains an AWS CDK stack that provisions a web server
EC2 instance with an attached Elastic IP.

### Deploying the stack

```bash
cd infra
npm install
npx cdk bootstrap   # required once per account/region
npx cdk deploy
```

After deployment, the public IP of the server is emitted as the
`WebServerPublicIp` CloudFormation output.

### Estimated cost

The stack runs a small `t3.nano` EC2 instance (about US$3.80/month in
us-east-1) with an Elastic IP that is free while attached to a running
instance.  This setup should remain well under US$20/month, though prices
vary by region and additional data transfer or idle Elastic IP charges may
apply.

