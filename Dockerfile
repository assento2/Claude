# Build Frontend
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Final Image
FROM python:3.12-slim
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ /app/backend
WORKDIR /app/backend

# Copy frontend build to backend static folder
RUN mkdir -p /app/backend/static
COPY --from=frontend-build /app/frontend/dist /app/backend/static

# Expose port
EXPOSE 8000

# Start command
CMD ["python", "main.py"]
