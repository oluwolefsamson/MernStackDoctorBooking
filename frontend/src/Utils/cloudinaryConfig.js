// src/config/cloudinaryConfig.js
import { Cloudinary } from "cloudinary-core";

// Initialize Cloudinary
const cloudinary = new Cloudinary({
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
  secure: true, // Use HTTPS
});

export default cloudinary;
