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

# Stage 1: Build Stage
FROM node:18 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the application source code
COPY . .

# Stage 2: Runtime Stage
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only production build from the build stage
COPY --from=builder /app /app

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
