import * as cdk from 'aws-cdk-lib';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';

export class CodeDeployStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const application = new codedeploy.ServerApplication(this, 'BlackflowApp', {
      applicationName: 'BlackflowApp',
    });

    new codedeploy.ServerDeploymentGroup(this, 'BlackflowDG', {
      application,
      deploymentGroupName: 'BlackflowDG',
      ec2InstanceTags: new codedeploy.InstanceTagSet({
        Name: ['blackflow-ec2'],
      }),
      deploymentConfig: codedeploy.ServerDeploymentConfig.ONE_AT_A_TIME,
    });
  }
}
