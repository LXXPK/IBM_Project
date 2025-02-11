pipeline {
    agent any
    environment {
        MONGO_URI = credentials('mongo-uri-id')
        JWT_SECRET = credentials('jwt-secret-id')
        IBM_CLOUD_API_KEY = credentials('ibmcloud-apikey-id') 
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
                      bat 'cd server && npm test'
                }
            }
        }
        stage('Test Frontend') {
            steps {
                script {
                     bat 'cd user && npm install' 
                    bat 'cd user && npm test -- --passWithNoTests' 
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    bat 'docker build -t icr.io/eventspeare/backend-service:latest ./server'
                    bat 'docker build -t icr.io/eventspeare/front-service:latest ./user'
                }
            }
        }
        stage('Login to IBM Cloud') {
            steps {
                script {
                    bat 'ibmcloud login --apikey %IBM_CLOUD_API_KEY%'
                    bat 'ibmcloud cr login'
                }
            }
        }
        stage('Publish Docker Images to IBM Cloud Registry') {
            steps {
                script {
                    bat 'docker push icr.io/eventspeare/backend-service:latest'
                    bat 'docker push icr.io/eventspeare/front-service:latest'
                }
            }
        }
        // stage('Create Kubernetes Secrets') {
        //     steps {
        //         script {
        //             // Create Mongo URI and JWT secrets
        //             bat 'kubectl create secret generic mongo-uri-secret --from-literal=mongo-uri=%MONGO_URI% || true'
        //             bat 'kubectl create secret generic jwt-secret --from-literal=jwt-secret=%JWT_SECRET% || true'
        //         }
        //     }
        // }
        stage('Set Minikube Context') {
            steps {
                script {
                   bat '"C:\\Program Files\\Kubernetes\\Minikube\\minikube.exe" start'
                //    bat '"C:\\Program Files\\Kubernetes\\Minikube\\minikube.exe" status || "C:\\Program Files\\Kubernetes\\Minikube\\minikube.exe" start'
                    bat '"C:\\Program Files\\Kubernetes\\Minikube\\minikube.exe" update-context'

                }
            }
        }
        stage('Deploy to IBM Kubernetes Service') {
            steps {
                script {
                    
                    bat 'kubectl apply -f deploy/backend-deployment.yaml'
                    bat 'kubectl apply -f deploy/frontend-deployment.yaml'

                
                    bat 'kubectl get pods'
                    bat 'kubectl get services'
                }
            }
        }
        stage('Port-Forward to Local Machine') {
            steps {
                script {
                    
                    bat 'start "" cmd /c "kubectl port-forward service/eventsphere-backend 5000:5000"'
                    bat 'start "" cmd /c "kubectl port-forward service/eventsphere-frontend 3000:3000"'
                }
            }
        }
    }
}
