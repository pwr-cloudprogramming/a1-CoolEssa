#!/bin/bash
API_URL="http://169.254.169.254/latest/api"
TOKEN=`curl -X PUT "$API_URL/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 600"` 
TOKEN_HEADER="X-aws-ec2-metadata-token: $TOKEN"
METADATA_URL="http://169.254.169.254/latest/meta-data"
PUBLIC_HOSTNAME=`curl -H "$TOKEN_HEADER" -s http://169.254.169.254/latest/meta-data/public-hostname`

echo "export const BASE_URL = 'http://${PUBLIC_HOSTNAME}:8080';" > ./src/app/base-url.ts
