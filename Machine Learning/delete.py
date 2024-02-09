import boto3

# Define AWS region
region = "ap-south-1"

# Create a SageMaker client
sagemaker = boto3.client('sagemaker', region_name=region)

# Specify the name of the existing model to delete
model_name = 'animalmodel'

# Delete the existing model
sagemaker.delete_model(ModelName=model_name)

print("Model deleted successfully.")
