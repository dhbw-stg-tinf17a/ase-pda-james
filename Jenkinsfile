pipeline {
  agent any
  stages {
    stage('prepare .env') {
      steps {
        withCredentials([file(credentialsId: 'ase-james-env', variable: 'SECRET')]) {
          sh "> .env"
          sh "echo `cat ${SECRET}` > .env"
        }
      }
    }

    stage('run tests') {
      steps {
        sh 'npm install'
        sh 'npm test'
      }
    }

    stage('build backend') {
      steps {
        sh 'docker build -t ase-james .'
      }
    }

    stage('deploy') {
      when {
        expression {env.BRANCH_NAME == 'dev'}
      }
      steps {
        sh 'docker-compose up -d'
      }
    }
  }
}
