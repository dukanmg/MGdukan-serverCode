const { uploadImage } = require("./dbcloudinary");
const cloudinary = require('cloudinary').v2;

const fs = require('fs');
const path = require('path');

// Function to convert image to Base64 Data URI
function imageToBase64DataURI(imagePath) {
    // Read the image file into a buffer
    const imageBuffer = fs.readFileSync(imagePath);
  
    // Get the image extension (e.g., .png, .jpg, etc.)
    const extname = path.extname(imagePath).slice(1); // Remove the leading dot
  
    // Create the Base64 Data URI and remove newlines
    const base64Data = imageBuffer.toString('base64').replace(/\r?\n/g, '');  // Remove any newline characters
    const base64DataURI = `data:image/${extname};base64,${base64Data}`;
    // console.log(base64DataURI)
    return base64DataURI;
  }


(async function () {
    try {
        const imagePath = 'D:\\WorkSpace\\MG-dukan\\mg.png'; // Double backslashes
        const imageBuffer = imageToBase64DataURI(imagePath);
        let result = await uploadImage(imageBuffer)

        // const result = await cloudinary.uploader.upload(base64DataURI);
        console.log(result);  // Log the result of the upload
    } catch (error) {
      console.error('Error uploading image:', error);  // Handle any errors during the upload
    }
  })();
