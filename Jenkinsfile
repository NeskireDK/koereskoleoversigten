pipeline {
	agent { dockerfile true }
    stages {
        stage('build') {
            steps {
				echo "Fetching from git"
                git branch: 'master', credentialsId: '12drive-neskiredk-backend', url: 'https://github.com/NeskireDK/koereskoleoversigten'
				echo "Cleaning package"
                sh 'mvn clean package'
            }
        }
        stage('verify') {
            steps {
				echo "Verifying docker image"
                sh 'ls -alF target'
            }
        }        
        stage('docker') {
			steps{
				echo "Starting script to register docker image"
				script{
						withDockerRegistry([credentialsId: 'gcr:google-service-account', url: 'https://eu.gcr.io']) {
						def app = docker.build("gcr.io/drive-jenkins/koereskoleoversigten",'.')
						app.push()
					}
				}
			}
        }
    }
}
