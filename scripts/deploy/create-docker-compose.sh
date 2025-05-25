#!/bin/bash

cat >docker-compose.merged.yml <<'EOF'
version: '3'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - blackflow-prod
      - blackflow-staging
      - auth-service
    networks:
      - frontend
      - backend
    restart: unless-stopped

  blackflow-prod:
    build:
      context: ./blackflow
      dockerfile: Dockerfile
    ports:
      - "3001:3000"
    environment: 
      - NODE_ENV=production
    networks:
      - frontend
    restart: unless-stopped

  blackflow-staging:
    build:
      context: ./blackflow
      dockerfile: Dockerfile
    ports:
      - "3002:3000"
    environment: 
      - NODE_ENV=staging
    networks:
      - frontend
    restart: unless-stopped

  blackflow-dev:
    build:
      context: ./blackflow
      dockerfile: Dockerfile.dev
    ports:
      - "3003:3000"
    environment: 
      - NODE_ENV=development
    networks:
      - frontend
    restart: unless-stopped

  auth-service:
    build:
      context: ./services/auth-service
      dockerfile: Dockerfile
    expose:
      - "8080"
    networks:
      - backend
    restart: unless-stopped

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
EOF

echo "Docker Compose configuration created"
