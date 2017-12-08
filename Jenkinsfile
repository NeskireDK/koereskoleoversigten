pipeline {
    agent {
    dockerfile true
    }
    stages {
        stage('Test') {
            steps {
                sh "echoing my env: $NODE_ENV"
                sh 'node --version'
                sh 'svn --version'
            }
        }
    }
}