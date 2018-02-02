pipeline {
    agent {
        label 'master'
    }

    stages {
        stage("docker build") {
            steps {
                script {
                    sh "sudo docker build -t neskire/koereskoleoversigten:${env.BUILD_ID} ."
                }
            }
        }
        stage("docker run") {
            steps {
                script {
                    sh "sudo docker run -d --name kso neskire/koereskoleoversigten:${env.BUILD_ID} "
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

        stage("push image to hub"){
            steps {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'neskire_docker_hub',
                    usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {

                    sh "sudo docker login --username $USERNAME --password $PASSWORD"
                    sh "sudo docker push neskire/koereskoleoversigten:${env.BUILD_ID}"

                    sh "sudo docker tag neskire/koereskoleoversigten:${env.BUILD_ID} neskire/koereskoleoversigten:latest"
                    sh "sudo docker push neskire/koereskoleoversigten:latest"
                }
            }
        }

        stage("deploy on staging"){
            environment {
                key_aws = credentials('key_aws')
            }
            steps {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'neskire_docker_hub',
                usernameVariable: 'USERNAME',  passwordVariable: 'PASSWORD']]) {
                    sh  'ssh -i $key_aws admin@kso.ariksen.dk -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no <<-ENDSSH\n' +
                        'sudo docker rm -f kso\n' +
                        'sudo docker login -u $USERNAME -p $PASSWORD \n' +
                        'sudo docker run -d -p 80:80 --name kso neskire/koereskoleoversigten \n' +
                        'ENDSSH\n'
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