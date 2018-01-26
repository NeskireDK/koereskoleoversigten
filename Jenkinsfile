pipeline {

    agent {
        label 'master'
    }

    stages {

        stage("docker build") {
            steps {
                script {
                    echo "Password is"
                    echo $neskire-docker-hub

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
                    sh "sudo docker cp work/KSO_local.postman_environment.json kso:/usr/src/app"
                    sh "sudo docker cp work/KSO.postman_collection.json kso:/usr/src/app"
                    sh "sudo docker exec kso newman run KSO.postman_collection.json -e KSO_local.postman_environment.json"
                }
            }
        }


    }
    post {
        always {
            sh "sudo docker rm -f kso"
            cleanWs()
        }
    }
}
