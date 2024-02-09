import boto3

# Define AWS region
region = "ap-south-1"

# Define S3 bucket name and key where the model artifact is stored
bucket_name = 'imageclassifieanimal'
model_key = 'my_model.tar.gz'

# Define model name
model_name = 'animalmodel'

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

# Define endpoint configuration name
endpoint_config_name = 'animal-injury-endpoint-config'

# Define the instance type and count for the endpoint
instance_type = 'ml.t2.medium'
initial_instance_count = 1

# Create endpoint configuration
response = sagemaker.create_endpoint_config(
    EndpointConfigName=endpoint_config_name,
    ProductionVariants=[
        {
            'VariantName': 'AllTraffic',
            'ModelName': model_name,
            'InitialInstanceCount': initial_instance_count,
            'InstanceType': instance_type
        }
    ]
)

# Create endpoint
endpoint_name = 'animal-injury-endpoint'
response = sagemaker.create_endpoint(
    EndpointName=endpoint_name,
    EndpointConfigName=endpoint_config_name
)

# Wait for endpoint to be in service
waiter = sagemaker.get_waiter('endpoint_in_service')
waiter.wait(EndpointName=endpoint_name)

print("Endpoint created successfully!")
