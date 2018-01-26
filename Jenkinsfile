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

        stage("docker run") {
            steps {
                script {
                    sh "sudo docker run --name kso kso "
                }
            }
        }

        stage("newman test") {
            steps {
                script {
                    sh "sudo docker exec kso npm install newman --global"
                }
            }
        }


    }
}

