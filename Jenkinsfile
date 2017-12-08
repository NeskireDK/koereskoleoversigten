pipeline {
    agent {
        label 'master'
    }

    tools {
        nodejs 'Node8'
    }

        stage("build image") {
            steps {
                script {
                    docker.build('12drive')
                }
            }
        }
    } 
}