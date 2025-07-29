#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { TransactionIngestStack } from '../lib/transaction_ingest_stack';

const app = new App();
new TransactionIngestStack(app, 'TransactionIngestStack');
