# Multi-stage build with optimizations
FROM node:20-alpine AS base

# Install dependencies in a separate stage
FROM base AS deps
WORKDIR /app

# Copy only package files first (better caching)
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Dev dependencies for build stage
FROM base AS devdeps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build stage with memory limits
FROM base AS builder
WORKDIR /app

# Copy dependencies from devdeps stage
COPY --from=devdeps /app/node_modules ./node_modules
COPY . .

# Set memory limit for Node.js during build
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Build the application
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy production dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
