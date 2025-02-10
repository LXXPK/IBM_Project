pipeline {
    agent any
    environment {
        MONGO_URI = credentials('mongo-uri-id')
        JWT_SECRET = credentials('jwt-secret-id')
        IBM_API_KEY = credentials('ibmcloud-apikey-id') // Add your IBM Cloud API key as a credential
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
                    bat 'docker build -t icr.io/ibm-eventspeare/backend-service:latest ./server'
                    bat 'docker build -t icr.io/ibm-eventspeare/front-service:latest ./user'
                }
            }
        }
        stage('Login to IBM Cloud and IBM Container Registry') {
            steps {
                script {
                    bat 'ibmcloud login --apikey %IBM_API_KEY% -r in-che'
                    bat 'ibmcloud plugin list | findstr "container-registry" || ibmcloud plugin install container-registry'
                    bat 'ibmcloud cr login'
                }
            }
        }
        stage('Push Docker Images to IBM Cloud Container Registry') {
            steps {
                script {
                    bat 'docker push icr.io/ibm-eventspeare/backend-service:latest'
                    bat 'docker push icr.io/ibm-eventspeare/front-service:latest'
                }
            }
        }
        stage('Create Kubernetes Secret for IBM Container Registry') {
            steps {
                script {
                    bat 'kubectl create secret docker-registry ibm-cloud-secret --docker-server=icr.io --docker-username=iamapikey --docker-password=%IBM_API_KEY% --docker-email=reddykiranbcse2025@gmail.com'
                }
            }
        }
        stage('Deploy to IBM Kubernetes Service') {
            steps {
                script {
                    // Apply Kubernetes manifests for backend and frontend deployments
                    bat 'kubectl apply -f deploy/backend-deployment.yaml'
                    bat 'kubectl apply -f deploy/frontend-deployment.yaml'

                    // Verify the running pods and services
                    bat 'kubectl get pods'
                    bat 'kubectl get services'
                }
            }
        }
    }
}
