pipeline {
    agent any
    stages {
        stage('Build Backend') {
            steps {
                script {
                    // Install dependencies and build the backend
                    bat 'cd server && npm install'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                script {
                    // Install dependencies and build the frontend with CI=false
                    bat 'cd user && npm install'
                    bat 'cd user && set CI=false && npm run build'
                }
            }
        }
        stage('Test Backend') {
            steps {
                script {
                    // Run backend tests
                    bat 'cd server && npm test'
                }
            }
        }
        stage('Test Frontend') {
            steps {
                script {
                    // Run frontend tests
                    bat 'cd user && npm test -- --passWithNoTests'
                }
            }
        }
    }
}
