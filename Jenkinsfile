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
                    sh "sudo docker rm -f kso"
                    sh "sudo docker run -d --name kso kso "
                }
            }
        }

        stage("newman test") {
            steps {
                script {
                    sh "sudo docker exec kso npm install newman --global"
                    sh "cp work/KSO_local.postman_environment.json kso:/"
                    sh "cp work/KSO.postman_collection.json kso:/"
                    sh "sudo docker exec kso ls"
                }
            }
        }


    }
}

