import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc');

    const securityGroup = new ec2.SecurityGroup(this, 'WebServerSG', {
      vpc,
      description: 'Security group for web server',
      allowAllOutbound: true,
    });

    [22, 80, 443].forEach(port =>
      securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(port)),
    );

    const instance = new ec2.Instance(this, 'WebServerInstance', {
      vpc,
      securityGroup,
      instanceType: new ec2.InstanceType('t3.nano'),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
    });

    const eip = new ec2.CfnEIP(this, 'WebServerEip');

    new ec2.CfnEIPAssociation(this, 'WebServerEipAssociation', {
      allocationId: eip.attrAllocationId,
      instanceId: instance.instanceId,
    });

    new cdk.CfnOutput(this, 'WebServerPublicIp', {
      value: eip.attrPublicIp,
      description: 'Elastic IP for the web server instance',
    });
  }
}
