FROM node:18-slim

# Set working directory to /app/backend
WORKDIR /app/backend

# Copy package.json from backend folder
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend files
COPY backend/ .

# Go back to root? No need, we're already in /app/backend

EXPOSE 4000

# Start from the backend directory
CMD ["npm", "start"]