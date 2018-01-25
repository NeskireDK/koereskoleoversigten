node {
    echo "from 21:39 24/1/18"
    echo "Fetching from git"
    git credentialsId: 'NeskireDK-Github', url: 'https://github.com/NeskireDK/koereskoleoversigten'
    echo "Docker"
    def app = docker.build("neskire/koereskoleoversigten:${env.BUILD_ID}",'.')
    withDockerRegistry([credentialsId: 'docker-repo-neskire', url: 'https://registry.hub.docker.com']) {
        app.push()
    }


}
