FROM node:18-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build (if needed)
RUN npm run build

# Expose port (change if your app uses different port)
EXPOSE 4000

# Start the app
CMD ["npm", "start"]