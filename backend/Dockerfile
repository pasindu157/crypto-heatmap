FROM node:18-slim

WORKDIR /app

# First copy ONLY package.json files
COPY package*.json ./

# Then install dependencies
RUN npm install

# THEN copy everything else
COPY . .

# Expose port
EXPOSE 4000

# Start command
CMD ["npm", "start"]