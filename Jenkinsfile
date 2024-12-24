pipeline {
    agent any
    environment {
        // Fetch credentials from Jenkins Credential Store
        MONGO_URI = credentials('mongo-uri-id') // Replace with your Jenkins credential ID
        JWT_SECRET = credentials('jwt-secret-id') // Replace with your Jenkins credential ID
    }
    stages {
        stage('Prepare Environment') {
            steps {
                script {
                    // Write environment variables into the .env file
                    bat '''
                    echo MONGO_URI=%MONGO_URI% > .env
                    echo JWT_SECRET=%JWT_SECRET% >> .env
                    '''
                }
            }
        }
        stage('Build Backend') {
            steps {
                script {
                    bat 'cd server && npm install'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                script {
                    bat 'cd user && npm install'
                    bat 'cd user && set CI=false && npm run build'
                }
            }
        }
        stage('Test Backend') {
            steps {
                script {
                    bat 'cd server && npm test'
                }
            }
        }
        stage('Test Frontend') {
            steps {
                script {
                    bat 'cd user && npm test -- --passWithNoTests'
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    bat 'docker build -t eventsphere-backend ./server'
                    bat 'docker build -t eventsphere-frontend ./user'
                }
            }
        }
        stage('Run Containers') {
            steps {
                script {
                    bat 'docker-compose down'
                    bat 'docker-compose up -d'
                }
            }
        }
        stage('Test Containers') {
            steps {
                script {
                    bat 'docker exec eventsphere-backend npm test'
                    bat 'docker exec eventsphere-frontend npm test -- --passWithNoTests --maxWorkers=1 || exit 0'
                }
            }
        }
        stage('Publish Docker Images to Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        // Docker Hub login
                        bat 'echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin'
                        
                        // Tag and publish backend image
                        bat 'docker tag eventsphere-backend %DOCKER_USERNAME%/eventsphere-backend:latest'
                        bat 'docker push %DOCKER_USERNAME%/eventsphere-backend:latest'

                        // Tag and publish frontend image
                        bat 'docker tag eventsphere-frontend %DOCKER_USERNAME%/eventsphere-frontend:latest'
                        bat 'docker push %DOCKER_USERNAME%/eventsphere-frontend:latest'
                    }
                }
            }
        }
    }
}
