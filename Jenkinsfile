pipeline {
    agent { dockerfile true }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'svn --version'
            }
        }
    }

}
node{
    post {
            always {
                archive "target/**/*"
                //  Save unit test, find module fx JUNIT 'target/surefire-reports/*.xml'
            }
        }
}