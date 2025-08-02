#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CodeDeployStack } from '../lib/codedeploy-stack';

const app = new cdk.App();
new CodeDeployStack(app, 'BlackflowCodeDeployStack');
