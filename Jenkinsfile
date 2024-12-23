pipeline {
    agent any
    stages {
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
                    bat 'docker-compose up -d'
                }
            }
        }
        stage('Test Containers') {
            steps {
                script {
                    bat 'docker exec eventsphere-backend npm test'
                    bat 'docker exec eventsphere-frontend npm test -- --passWithNoTests'
                }
            }
        }
        stage('Pubat Docker Images to Registry') {
            steps {
                script {
                    // Use credentials to log in to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        // Docker Hub login
                        bat 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        
                        // Tag and pubat backend image
                        bat 'docker tag eventsphere-backend $DOCKER_USERNAME/eventsphere-backend:latest'
                        bat 'docker pubat $DOCKER_USERNAME/eventsphere-backend:latest'

                        // Tag and pubat frontend image
                        bat 'docker tag eventsphere-frontend $DOCKER_USERNAME/eventsphere-frontend:latest'
                        bat 'docker pubat $DOCKER_USERNAME/eventsphere-frontend:latest'
                    }
                }
            }
        }

    }
}
