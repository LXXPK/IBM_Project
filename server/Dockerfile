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



# Use a Node.js base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your backend runs on
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
