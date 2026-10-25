pipeline {
    agent any

    // Triggers automatically every day at 9:00 AM
    triggers {
        cron('0 9 * * *')
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Pulls your code from GitHub
                git branch: 'main', url: 'https://github.com/vishalkorde06/playwrightAutomation.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx.cmd playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Runs your tests using npx.cmd just like in VS Code
                bat 'npx.cmd playwright test'
            }
        }
    }

    post {
        always {
            // Sends an email notification after execution
            emailext (
                subject: "Playwright Test Report - Build #${env.BUILD_NUMBER} (${currentBuild.result ?: 'SUCCESS'})",
                body: """Hi Vishal,

Your scheduled Playwright tests have finished running.

- Status: ${currentBuild.result ?: 'SUCCESS'}
- Build Link: ${env.BUILD_URL}

Regards,
Jenkins Automation""",
                to: 'vishalkorde42@gmail.com' // Replace with your actual email address
            )
        }
    }
}
