# Transaction Ingest Infrastructure

This stack deploys the `transaction-ingest` Lambda and supporting AWS resources.

## Prerequisites
- Node.js 20+
- AWS credentials configured for the target account
- [AWS CDK v2](https://docs.aws.amazon.com/cdk/v2/guide/home.html) installed (`npm i -g aws-cdk`)

## Resources Created
- **DynamoDB Table** `Transactions` with PAY_PER_REQUEST billing
- **Lambda Function** `transaction-ingest` built from `services/transaction-ingest`
- **API Gateway** POST `/api/ingest/run` (IAM auth)
- **EventBridge Rule** running the Lambda nightly at 02:00 PT
- **SSM Parameter** `PLAID_SECRET` holding the Plaid API key

## Setup Steps
1. Build the Lambda artifact if not using CI:
   ```bash
   cd ../services/transaction-ingest
   GOOS=linux GOARCH=amd64 go build -o main && zip -j bin/main.zip main
   ```
2. Create an [SSM Parameter](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) named `PLAID_SECRET` with your Plaid sandbox key.
3. Ensure the AWS account has an [ECR Public](https://docs.aws.amazon.com/AmazonECR/latest/public/what-is-ecr.html) repository named `transaction-ingest` if using the CI workflow to publish the image.
4. Deploy the stack:
   ```bash
   cd infra
   npm install
   npx cdk deploy --all
   ```

After deployment the Lambda can be invoked via the API Gateway endpoint or will run automatically each night.
