node {
    checkout scm
    docker.withRegistry('https://eu.gcr.io'){
        def customImage = docker.build("gcr.io/drive-jenkins/koereskoleoversigten:${env.BUILD_ID}")
	docker.push("${env.BUILD_NUMBER}")
    	docker.push("latest")
    }
}