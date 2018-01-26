pipeline {

    agent {
        label 'master'
    }

    stages {

        stage("docker build") {
            steps {
                script {
                    sh "sudo -s"
                    sh "docker build -t kso ."
                }
            }
        }

        stage("docker run") {
            steps {
                script {
                    sh "sudo -s"
                    sh "docker rm -f kso"
                    sh "docker run -d --name kso kso "
                }
            }
        }

        stage("newman test") {
            steps {
                script {
                    sh "sudo -s"
                    sh "docker exec kso npm install newman --global"
                    sh "docker cp work/KSO_local.postman_environment.json kso:/usr/src/app"
                    sh "docker cp work/KSO.postman_collection.json kso:/usr/src/app"
                    sh "docker exec kso newman run KSO.postman_collection.json -e KSO_local.postman_environment.json"
                }
            }
        }


    }
    post {
        always {
            sh "docker rm -f kso"
            cleanWs()
        }
    }
}
