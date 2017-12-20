pipeline {
	agent { dockerfile true }
    stages {
        stage('build') {
            steps {
                git branch: 'master', credentialsId: '12drive-neskiredk-backend', url: 'https://github.com/NeskireDK/koereskoleoversigten'
                sh 'mvn clean package'
            }
        }
        stage('verify') {
            steps {
                sh 'ls -alF target'
            }
        }        
        stage('docker') {
			steps{
				withDockerRegistry([credentialsId: 'google-service-account', url: 'https://eu.gcr.io']) {
					def app = docker.build("gcr.io/drive-jenkins/koereskoleoversigten",'.')
					app.push()
				}
			}
        }
    }
}
