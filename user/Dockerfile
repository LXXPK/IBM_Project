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



# Use a Node.js base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port React is running on
EXPOSE 3000

# Start React development server (or production server if build)
CMD ["npm", "start"]
