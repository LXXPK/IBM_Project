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
                    sh 'docker build -t eventsphere-backend ./server'
                    sh 'docker build -t eventsphere-frontend ./user'
                }
            }
        }
        stage('Run Containers') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
        stage('Test Containers') {
            steps {
                script {
                    sh 'docker exec eventsphere-backend npm test'
                    sh 'docker exec eventsphere-frontend npm test -- --passWithNoTests'
                }
            }
        }
        stage('Push Docker Images to Registry') {
            steps {
                script {
                    // Use credentials to log in to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        // Docker Hub login
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        
                        // Tag and push backend image
                        sh 'docker tag eventsphere-backend $DOCKER_USERNAME/eventsphere-backend:latest'
                        sh 'docker push $DOCKER_USERNAME/eventsphere-backend:latest'

                        // Tag and push frontend image
                        sh 'docker tag eventsphere-frontend $DOCKER_USERNAME/eventsphere-frontend:latest'
                        sh 'docker push $DOCKER_USERNAME/eventsphere-frontend:latest'
                    }
                }
            }
        }

    }
}
