import boto3
from PIL import Image
import io

s3_client = boto3.client('s3')
rekognition_client = boto3.client('rekognition')
sagemaker_runtime = boto3.client('sagemaker-runtime')

s3_bucket_name = 'userbucketimagecame'
rekognition_max_labels = 10
rekognition_min_confidence = 70

def lambda_handler(event, context):
    # Get the uploaded image details from the event
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    object_key = event['Records'][0]['s3']['object']['key']
    
    # Retrieve the uploaded image from S3
    image_object = s3_client.get_object(Bucket=bucket_name, Key=object_key)
    image_content = image_object['Body'].read()
    
    # Detect objects in the image using AWS Rekognition
    response = rekognition_client.detect_labels(
        Image={'Bytes': image_content},
        MaxLabels=rekognition_max_labels,
        MinConfidence=rekognition_min_confidence
    )
    
    # Extract the region of interest (ROI) containing the injured animal
    injured_animal_bbox = None
    for label in response['Labels']:
        if label['Name'] == 'Animal' and 'Instances' in label:
            # Assuming the first instance of the detected animal as the injured one
            injured_animal_bbox = label['Instances'][0]['BoundingBox']
            break
    
    if injured_animal_bbox:
        # Crop the image to extract the region of interest (ROI)
        image = Image.open(io.BytesIO(image_content))
        width, height = image.size
        left = int(injured_animal_bbox['Left'] * width)
        top = int(injured_animal_bbox['Top'] * height)
        right = int((injured_animal_bbox['Left'] + injured_animal_bbox['Width']) * width)
        bottom = int((injured_animal_bbox['Top'] + injured_animal_bbox['Height']) * height)
        roi_image = image.crop((left, top, right, bottom))
        
        # Save the ROI image to a temporary file
        roi_image_file = io.BytesIO()
        roi_image.save(roi_image_file, format='JPEG')
        roi_image_file.seek(0)
        
        # Invoke the SageMaker endpoint with the ROI image
        sagemaker_response = sagemaker_runtime.invoke_endpoint(
            EndpointName='your-sagemaker-endpoint-name',
            Body=roi_image_file.read(),
            ContentType='image/jpeg'
        )
        
        # Process the response from the SageMaker endpoint
        # You can handle the response based on your application's requirements
        
        return {
            'statusCode': 200,
            'body': 'Image processed successfully'
        }
    else:
        return {
            'statusCode': 400,
            'body': 'No injured animal detected in the image'
        }
