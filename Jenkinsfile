pipeline {
    agent {
        label 'master'
    }

    tools {
        nodejs 'Node8'
    }
	
/*
    stages {
        stage("yarn build") {
            steps {
                sh 'yarn install'
                sh 'yarn run build-prod'
            }
        }
*/
        stage("build image") {
            steps {
                script {
                    docker.build('12drive')
                }
            }
        }
    } 
}
node{
    post {
            always {
                archive "*"
                //  Save unit test, find module fx JUNIT 'target/surefire-reports/*.xml'
            }
        }
}