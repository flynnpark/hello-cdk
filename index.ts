import cdk = require('@aws-cdk/cdk');
import lambda = require('@aws-cdk/aws-lambda');
import { ApiEventSource } from '@aws-cdk/aws-lambda-event-sources';

class HelloCDK extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFn = new lambda.Function(this, 'HelloFunction', {
      runtime: lambda.Runtime.NodeJS810,
      handler: 'handler.handler',
      code: lambda.Code.asset('./lambdaFn')
    });

    const rule = new ApiEventSource('GET', '/');
    rule.bind(lambdaFn);
  }
}

const app = new cdk.App();

new HelloCDK(app, 'HelloCDK', { env: { region: 'ap-northeast-2' } });

app.run();
