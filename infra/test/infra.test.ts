import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { InfraStack } from '../lib/infra-stack';

test('creates EC2 instance with Elastic IP', () => {
  const app = new cdk.App();
  const stack = new InfraStack(app, 'MyTestStack');
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::EC2::Instance', 1);
  template.hasResourceProperties('AWS::EC2::Instance', {
    InstanceType: 't3.nano',
  });
  template.resourceCountIs('AWS::EC2::SecurityGroup', 1);
  template.resourceCountIs('AWS::EC2::EIPAssociation', 1);
});
