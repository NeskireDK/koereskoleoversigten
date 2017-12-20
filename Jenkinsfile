node {
    echo "Fetching from git"
    git branch: 'master', credentialsId: '12drive-neskiredk-backend', url: 'https://github.com/NeskireDK/koereskoleoversigten'
    echo "Docker"
    withDockerRegistry([credentialsId: 'gcr:google-service-account', url: 'https://eu.gcr.io']) {
        def app = docker.build("gcr.io/drive-jenkins/koereskoleoversigten",'.')
        app.push()
    }
}
