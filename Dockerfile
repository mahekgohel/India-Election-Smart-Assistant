# Build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Build backend
FROM node:18-alpine
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./

# Copy built frontend
COPY --from=frontend-build /app/frontend/build /app/frontend/build

EXPOSE 8080
ENV PORT=8080

CMD ["node", "src/server.js"]
