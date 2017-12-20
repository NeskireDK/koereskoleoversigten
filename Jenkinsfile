pipeline {
	agent { dockerfile true }
	stages {
		stage('Lets do it!!') {
			steps{
				stage('Build image') {
					app = docker.build("gcr.io/drive-jenkins/koereskoleoversigten:${env.BUILD_ID}")
				}
			}
		}
		stage('push me, and then just touch me'){
			steps{
				docker.withRegistry('https://eu.gcr.io'){
					app.push("${env.BUILD_NUMBER}")
					app.push("latest")
				}
			}
		}
	}
}