node {
    checkout scm
    def customImage = docker.build("gcr.io/drive-jenkins/koereskoleoversigten:${env.BUILD_ID}")
    customImage.push()

    //customImage.push('latest')
}