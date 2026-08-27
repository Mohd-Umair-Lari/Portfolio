# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first for efficient layer caching
COPY package.json package-lock.json* bun.lock* ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production Runner (Node / Cloud Run / Container)
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy output from builder
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json

EXPOSE 8080

# Run nitro production server
CMD ["node", ".output/server/index.mjs"]
