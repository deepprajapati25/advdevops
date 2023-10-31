# advdevops
## code for dynamodb
import json
import boto3

def lambda_handler(event, context):
    client_dynamo=boto3.resource('dynamodb')
    table=client_dynamo.Table('booktables')
    try:
        response=table.put_item(Item=event)
        return "Done"
    except:
        raise
## code for pipeline
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<Bucket_name>/*"
        }
    ]
}
