# advdevops
## code for dynamodb
import json<br/>
import boto3<br/>

def lambda_handler(event, context):<br/>
    client_dynamo=boto3.resource('dynamodb')<br/>
    table=client_dynamo.Table('booktables')<br/>
    try:<br/>
        response=table.put_item(Item=event)<br/>
        return "Done"<br/>
    except:<br/>
        raise<br/>
## code for pipeline
{<br/>
    "Version": "2012-10-17",<br/>
    "Statement": [<br/>
        {<br/>
            "Effect": "Allow",<br/>
            "Principal": "*",<br/>
            "Action": "s3:GetObject",<br/>
            "Resource": "arn:aws:s3:::<Bucket_name>/*"<br/>
        }<br/>
    ]<br/>
}<br/>
