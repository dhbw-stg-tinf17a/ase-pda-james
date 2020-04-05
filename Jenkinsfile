pipeline {
  agent any
  stages {
    stage('prepare .env') {
      steps {
        withCredentials([file(credentialsId: 'ase-james-env', variable: 'SECRET')]) {
          sh "> .env"
          sh "echo `cat $${SECRET}` > .env"
        }
      }
    }

    stage('build backend') {
      steps {
        sh 'docker build -t ase-james .'
      }
    }

    stage('deploy') {
      steps {
        sh 'docker-compose up -d'
      }
    }
  }
}
