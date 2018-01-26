pipeline {

    agent {
        label 'master'
    }

    tools {
        docker 'docker'
    }

    stages {

        stage("docker build") {
            steps {
                script {
                    docker.build('kso')
                }
            }
        }


    }
}

