const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImagetocloudinary = async (file, folder, transformation = {}) => {
  try {
    const options = {
      folder,
      resource_type: "auto",
      ...transformation,
    };

    // Check if file has tempFilePath (from multer)
    if (file.tempFilePath) {
      const result = await cloudinary.uploader.upload(file.tempFilePath, options);
      // Delete temp file after upload
      fs.unlinkSync(file.tempFilePath);
      return result;
    } else if (file.path) {
      const result = await cloudinary.uploader.upload(file.path, options);
      return result;
    } else {
      throw new Error("Invalid file format for upload");
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

module.exports = { uploadImagetocloudinary };