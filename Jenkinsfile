node {

    echo "Docker"
    def app = docker.build("neskire/koereskoleoversigten:${env.BUILD_ID}",'.')
    withDockerRegistry([credentialsId: 'docker-repo-neskire', url: 'https://registry.hub.docker.com']) {
        app.push()
    }


}
