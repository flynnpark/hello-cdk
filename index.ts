import cdk = require('@aws-cdk/cdk');
import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');

class HelloCDK extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.VpcNetwork(this, 'HelloVPC', { maxAZs: 2 });
    const cluster = new ecs.Cluster(this, 'EC2Cluster', { vpc });
    cluster.addCapacity('AutoScalingGroup', {
      instanceType: new ec2.InstanceType('t2.micro')
    });

    const ecsService = new ecs.LoadBalancedEc2Service(this, 'EC2Service', {
      cluster,
      image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
      memoryLimitMiB: 512
    });

    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: ecsService.loadBalancer.dnsName
    });
  }
}

const app = new cdk.App();

new HelloCDK(app, 'HelloCDK');

app.run();
