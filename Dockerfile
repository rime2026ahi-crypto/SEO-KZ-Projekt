# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm install --save-dev typescript @types/node @types/react next eslint eslint-config-next

# Copy source code
COPY . .

# Build Next.js with increased memory
ENV NODE_OPTIONS="--max_old_space_size=512"
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built app from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npm", "start"]
