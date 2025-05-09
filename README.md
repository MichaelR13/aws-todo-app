# Serverless To-Do List Application

This project demonstrates a serverless application architecture using AWS services. It's a simple To-Do List application that showcases:

1. **AWS Lambda** - For serverless compute
2. **API Gateway** - For API management
3. **AWS WAF** - For API security
4. **IAM** - For secure access control
5. **CloudWatch** - For logging and monitoring

Additional services:
- DynamoDB for data storage
- AWS Amplify for hosting the frontend
- GitHub Actions for CI/CD

## Architecture Overview

![Serverless Architecture](https://via.placeholder.com/800x400?text=Serverless+Architecture+Diagram)

The application follows a serverless architecture pattern:
- React frontend hosted on AWS Amplify
- API Gateway providing RESTful endpoints
- Lambda functions for backend business logic
- DynamoDB for data persistence
- WAF for API protection
- CloudWatch for monitoring and logging

## Features

- Create, read, update, and delete to-do items
- Secure API with API keys and WAF protection
- Automated deployments with GitHub Actions
- Comprehensive logging with CloudWatch

## Prerequisites

- AWS Account
- GitHub Account
- AWS CLI installed and configured
- Node.js and npm
- AWS SAM CLI

## Local Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/todo-serverless-app.git
   cd todo-serverless-app
   ```

2. Install dependencies:
   ```
   # For Lambda functions
   cd lambda
   npm init -y
   npm install aws-sdk uuid
   cd ..
   
   # For frontend
   npm install
   ```

3. Start the frontend locally:
   ```
   npm start
   ```

4. Test Lambda functions locally:
   ```
   sam local invoke GetTodosFunction
   ```

## Deployment

### Manual Deployment

1. Deploy the backend with SAM:
   ```
   sam build
   sam deploy --guided
   ```

2. Build and deploy the frontend to Amplify:
   ```
   npm run build
   # Then deploy to Amplify Console manually or using the AWS CLI
   ```

### Automated Deployment with GitHub Actions

1. Set up the following secrets in your GitHub repository:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`

2. Push changes to the main branch to trigger the workflow:
   ```
   git add .
   git commit -m "Update application"
   git push origin main
   ```

## Security Considerations

This application implements several security measures:
- IAM roles with least privilege principle
- API Keys for API access control
- WAF for protecting against common web exploits
- CloudWatch logging for audit and monitoring

## Monitoring and Logging

- All Lambda functions log to CloudWatch Logs
- API Gateway access logs are stored in CloudWatch
- WAF logs are available for security monitoring