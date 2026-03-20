FROM node:18-alpine

WORKDIR /app

# Install dependencies (including devDependencies for build)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application (tsc)
RUN npm run build

# Expose port
EXPOSE 5000

# Start command
CMD ["npm", "start"]
