require('dotenv').config();
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});


module.exports.uploadImage = async(imgbuffer) => {
    try {
        const result = await cloudinary.uploader.upload(imgbuffer);
        return result
    } catch (error) {
      console.error('Error uploading image:', error);  // Handle any errors during the upload
    }
}


