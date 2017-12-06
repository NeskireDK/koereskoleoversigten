#!/usr/bin/env groovy
pipeline {
    agent { dockerfile true }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'svn --version'
            }
        }
    }
}
node{
    post {
            always {
                archive "*"
                //  Save unit test, find module fx JUNIT 'target/surefire-reports/*.xml'
            }
        }
}