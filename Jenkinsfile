node {
    checkout scm
    docker.withRegistry('gcr.io','google-service-account'){
        def customImage = docker.build("gcr.io/drive-jenkins/koereskoleoversigten:${env.BUILD_ID}")
        customImage.push()

        //customImage.push('latest')
    }
}