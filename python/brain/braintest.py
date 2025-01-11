import numpy as np
import cv2
from tensorflow.keras.models import load_model
import matplotlib.pyplot as plt

# Load the trained model
model = load_model('brain_mri_segmentation_model.h5')
print("Model loaded successfully.")

# Provide the path to a single image for testing
image_path = input("Enter the path of the image you want to test: ")

# Load the input image
image = cv2.imread(image_path, cv2.IMREAD_COLOR)
if image is None:
    print("Error: Unable to load the image. Please check the path.")
else:
    # Resize and normalize the image
    image_resized = cv2.resize(image, (128, 128))  # Resize to 128x128 (model's expected input size)
    image_normalized = image_resized / 255.0  # Normalize image to [0, 1]
    image_input = np.expand_dims(image_normalized, axis=0)  # Add batch dimension

    # Predict the mask for the input image
    predicted_mask = model.predict(image_input)[0]

    # Visualize the raw predicted mask
    plt.figure(figsize=(18, 6))

    # Display the input image
    plt.subplot(1, 4, 1)
    plt.title("Input Image")
    plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))  # Convert BGR to RGB

    # Display the raw predicted mask (before binarization)
    plt.subplot(1, 4, 2)
    plt.title("Raw Predicted Mask")
    plt.imshow(predicted_mask.squeeze(), cmap='gray')
    plt.colorbar()

    # Binarize the predicted mask
    predicted_mask_binarized = (predicted_mask > 0.5).astype(np.uint8)

    # Display the binarized predicted mask
    plt.subplot(1, 4, 3)
    plt.title("Binarized Predicted Mask")
    plt.imshow(predicted_mask_binarized.squeeze(), cmap='gray')

    # Overlay the predicted mask on the original image
    overlay = image_resized.copy()
    overlay[predicted_mask_binarized.squeeze() == 1] = [255, 0, 0]  # Red for mask

    plt.subplot(1, 4, 4)
    plt.title("Overlay of Mask on Image")
    plt.imshow(cv2.cvtColor(overlay, cv2.COLOR_BGR2RGB))

    plt.tight_layout()
    plt.show()
