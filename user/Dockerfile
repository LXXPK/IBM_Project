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


# Build Stage
FROM node:18-alpine AS build

# Set the working directory in the build container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from the build container
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]