pipeline {

    agent {
        label 'master'
    }

    stages {

        stage("docker build") {
            steps {
                script {
                    sh "sudo docker build -t kso ."
                }
            }
        }


    }
}

