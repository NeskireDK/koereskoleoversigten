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
                    sh "docker run -p 80:80 --name kso kso-prod "
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

