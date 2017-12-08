#!/usr/bin/env groovy
pipeline {
    agent { dockerfile true }
    stages {
		stage('prepare path'){
			steps{
				echo "Trying to create link"
				sh "ln -s $HOST_JENKINS_DATA_DIRECTORY/jenkins_data /var/jenkins_home"
			}
		}
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