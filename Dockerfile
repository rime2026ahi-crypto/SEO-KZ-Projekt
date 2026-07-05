FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with verbose output
RUN npm install --verbose || (echo "npm install failed" && exit 1)

# Copy source code
COPY . .

# Build Next.js
RUN npm run build || (echo "npm run build failed" && exit 1)

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

# Start Next.js server
CMD ["npm", "start"]
