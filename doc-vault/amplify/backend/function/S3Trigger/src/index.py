import json
import boto3
import os
from datetime import datetime

# Get environment variables
dynamodb_table_name = os.getenv("STORAGE_FILEMETADATATABLE_NAME")
s3_bucket_name = os.getenv("STORAGE_S3DOCVAULTFILES_BUCKETNAME")

# Initialize AWS clients
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(dynamodb_table_name)

def lambda_handler(event, context):
    try:
        print("Received event:", json.dumps(event, indent=2))

        for record in event["Records"]:aws s3 cp testfile.txt s3://docvaultfiles3a9d1-dev/

            s3_bucket = record["s3"]["bucket"]["name"]
            s3_key = record["s3"]["object"]["key"]

            # Store file metadata in DynamoDB
            item = {
                "file_name": s3_key,
                "s3_bucket": s3_bucket,
                "upload_time": datetime.utcnow().isoformat()
            }

            table.put_item(Item=item)
            print(f"Stored {s3_key} from {s3_bucket} in {dynamodb_table_name}")

        return {"statusCode": 200, "body": json.dumps("Success")}

    except Exception as e:
        print(f"Error processing S3 event: {str(e)}")
        return {"statusCode": 500, "body": json.dumps(f"Error: {str(e)}")}

