# Build stage
FROM node:14 AS build
WORKDIR /app
# Copy and install only package files first — changes rarely

COPY package.json ./
# Install all dependencies
RUN npm install
# Copy source cod
COPY . .
# Build app (after source code)
RUN npm run build

# Remove dev dependencies for production
RUN npm prune --omit=dev

# Production stage
FROM node:16-slim
WORKDIR /app

# Only need package.json for runtime metadata
# Don't use package-lock.json
COPY package.json  ./
RUN npm i --only=production

# Copy final production app & modules from builder
#Don;t use folder node_modules
COPY --from=build /app/dist ./dist

EXPOSE 4000
# CMD ["npm", "start"]
# use only dist
CMD ["node", "dist/main.js"]
