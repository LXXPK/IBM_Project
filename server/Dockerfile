# # Use a Node.js base image
# FROM node:18

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install backend dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose the port your backend runs on
# EXPOSE 5000

# # Start the backend server
# CMD ["npm", "start"]


# Build Stage
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Production Stage
FROM node:18-alpine

# Set the working directory for the production container
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app .

# Expose the port your backend runs on
EXPOSE 5000

# Start the backend server
CMD ["node", "index.js"]
