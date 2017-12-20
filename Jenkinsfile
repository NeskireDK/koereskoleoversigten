node {
    echo "Fetching from git"
    git branch: 'master', credentialsId: '12drive-neskiredk-backend', url: 'https://github.com/NeskireDK/koereskoleoversigten'
    echo "Docker"
    withDockerRegistry([credentialsId: 'docker-repo-neskire', url: 'https://registry.hub.docker.com']) {
        def app = docker.build("neskire/koereskoleoversigten:${env.BUILD_ID}",'.')
        app.push()
    }
}
