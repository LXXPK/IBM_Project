# # Use a Node.js base image for the build stage
# FROM node:18 as build

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install frontend dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the frontend application
# RUN npm run build

# # Use an nginx image to serve the frontend application
# FROM nginx:alpine

# # Copy build output to the NGINX server
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose the port NGINX serves on
# EXPOSE 80

# # Start NGINX
# CMD ["nginx", "-g", "daemon off;"]
# Stage 1: Build Stage
FROM node:18 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Build the production-ready React app
RUN npm run build

# Stage 2: Runtime Stage
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the built files from the build stage
COPY --from=builder /app/build /app/build

# Expose the application port
EXPOSE 3000

# Serve the production build with React's development server
CMD ["npx", "serve", "-s", "/app/build", "-l", "3000"]
