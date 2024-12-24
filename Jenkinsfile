pipeline {
    agent any
    environment {
        MONGO_URI = credentials('mongo-uri-id')
        JWT_SECRET = credentials('jwt-secret-id')
    }
    stages {
        stage('Prepare Environment') {
            steps {
                script {
                    bat '''
                    echo MONGO_URI=${MONGO_URI} > .env
                    echo JWT_SECRET=${JWT_SECRET} >> .env
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
        stage('Publish Docker Images to Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'
                        bat 'docker tag eventsphere-backend %DOCKER_USERNAME%/eventsphere-backend:latest'
                        bat 'docker push %DOCKER_USERNAME%/eventsphere-backend:latest'
                        bat 'docker tag eventsphere-frontend %DOCKER_USERNAME%/eventsphere-frontend:latest'
                        bat 'docker push %DOCKER_USERNAME%/eventsphere-frontend:latest'
                    }
                }
            }
        }
        stage('Deploy to Minikube') {
            steps {
                script {
                    // Set Docker environment to Minikube
                    bat '@FOR /f "tokens=*" %i IN (\'minikube docker-env\') DO @%i'

                    // Apply Kubernetes manifests for both backend and frontend
                    bat 'kubectl apply -f backend-deployment.yaml'
                    bat 'kubectl apply -f frontend-deployment.yaml'

                    // Check the deployment status
                    bat 'kubectl get pods'
                    bat 'kubectl get services'
                }
            }
        }
        stage('Port-Forward to Local Machine') {
            steps {
                script {
                    // Port-forward the services for access on local machine
                    bat 'kubectl port-forward service/eventsphere-backend 5000:5000'
                    bat 'kubectl port-forward service/eventsphere-frontend 3000:3000'
                }
            }
        }
    }
}
