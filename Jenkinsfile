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
        stage('Run Containers') {
            steps {
                script {
                    bat 'docker-compose down'
                    bat 'docker-compose up -d'
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
        // Deploy to Minikube
        stage('Deploy to Minikube') {
            steps {
                script {
                    bat 'minikube -p minikube docker-env --shell cmd > minikube-docker-env.bat'
                    bat 'call minikube-docker-env.bat'

                    // Apply Kubernetes manifests
                    bat 'kubectl apply -f backend-deployment.yaml'
                    bat 'kubectl apply -f frontend-deployment.yaml'

                    // Check Kubernetes status
                    bat 'kubectl get pods -A'
                    bat 'kubectl get services -A'
                }
            }
        }


    }
}
