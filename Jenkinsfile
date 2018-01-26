pipeline {

    agent {
        label 'master'
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

