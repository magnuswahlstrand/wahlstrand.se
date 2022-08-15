import {CfnOutput, RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';

import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";


export class InfraStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // example resource
        const imageBucket = new s3.Bucket(this, "wahlstrand-se-bucket", {
            bucketName: "wahlstrand-se-bucket",
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: RemovalPolicy.RETAIN,
            accessControl: s3.BucketAccessControl.PRIVATE,
            objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
        });

        let group = new iam.Group(this, "wahlstrand-se-bucket-manager", {
            groupName: "wahlstrand.se-bucket-manager",
        })
        group.addToPolicy(new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ["s3:ListBucket"],
            resources: [imageBucket.bucketArn],
        }));
        group.addToPolicy(new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            resources: [`${imageBucket.bucketArn}/*`],
        }));


        const cf = new cloudfront.Distribution(this, "cdnDistribution", {
            defaultBehavior: {
                origin: new origins.S3Origin(imageBucket)
            },
        });

        const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
            this, 'CloudFrontOriginAccessIdentity');

        imageBucket.addToResourcePolicy(new iam.PolicyStatement({
            actions: ['s3:GetObject'],
            resources: [imageBucket.arnForObjects('*')],
            principals: [new iam.CanonicalUserPrincipal(
                cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
        }));

        new CfnOutput(this, "CloudFrontURL", {
            value: cf.distributionDomainName,
        })
        new CfnOutput(this, "Policy", {
            value: group.groupName
        })
    }
}
