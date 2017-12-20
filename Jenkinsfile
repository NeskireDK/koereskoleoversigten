pipeline {
	agent { dockerfile true }
	stages {
		stage('Lets do it!!') {
			echo "Hitting First stage, Check yo staging"
		}
		stage('push me, and then just touch me'){
			docker.withRegistry('https://eu.gcr.io'){
				def customImage = docker.build("gcr.io/drive-jenkins/koereskoleoversigten:${env.BUILD_ID}")
				docker.push("${env.BUILD_NUMBER}")
				docker.push("latest")
			}
		}
	}
}