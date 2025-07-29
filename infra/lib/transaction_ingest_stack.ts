import { Construct } from 'constructs';
import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as path from 'path';
import * as logs from 'aws-cdk-lib/aws-logs';

export class TransactionIngestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'Transactions', {
      partitionKey: { name: 'user_id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'date', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const func = new lambda.Function(this, 'TransactionIngest', {
      runtime: lambda.Runtime.GO_1_X,
      handler: 'main',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../services/transaction-ingest/bin/main.zip')),
      environment: {
        TRANSACTIONS_TABLE: table.tableName,
        PLAID_SECRET: ssm.StringParameter.valueForStringParameter(this, 'PLAID_SECRET'),
      },
      logRetention: logs.RetentionDays.TWO_WEEKS,
    });

    table.grantReadWriteData(func);

    const rule = new events.Rule(this, 'NightlySync', {
      schedule: events.Schedule.cron({ minute: '0', hour: '10' }), // 02:00 PT
    });
    rule.addTarget(new targets.LambdaFunction(func));

    const api = new apigw.RestApi(this, 'IngestApi', {
      deployOptions: { stageName: 'prod' },
    });

    const run = api.root.addResource('api').addResource('ingest').addResource('run');
    run.addMethod('POST', new apigw.LambdaIntegration(func), {
      authorizationType: apigw.AuthorizationType.IAM,
    });

    api.addUsagePlan('PerUserPlan', {
      throttle: { burstLimit: 10, rateLimit: 10 },
    });

    new ssm.StringParameter(this, 'PlaidSecretParam', {
      parameterName: 'PLAID_SECRET',
      stringValue: 'sandbox-123',
    });
  }
}
