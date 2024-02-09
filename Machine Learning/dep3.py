import boto3

# Define AWS region
region = "ap-south-1"

# Define S3 bucket name and key where the model artifact is stored
bucket_name = 'imageclassifieanimal'
model_key = 'my_model.tar.gz'

# Define model name
model_name = 'animalinjurymodel'

# Define SageMaker execution role ARN
execution_role_arn = 'arn:aws:iam::770065223990:role/Role'

# Create a SageMaker client
sagemaker = boto3.client('sagemaker', region_name=region)

# Define the model data URL
model_url = f's3://{bucket_name}/{model_key}'

# Create a model

response = sagemaker.create_model(
    ModelName=model_name,
    PrimaryContainer={
        'Image': '770065223990.dkr.ecr.ap-south-1.amazonaws.com/model1:latest',  # ECR image URI
        'ModelDataUrl': model_url,
        # Add any environment variables or other configuration settings as needed
        'Environment': {
            'SAGEMAKER_REQUIREMENTS': 'requirements.txt'
        }
    },
    ExecutionRoleArn=execution_role_arn
)

# Print the response
print("Model created successfully:", response)
