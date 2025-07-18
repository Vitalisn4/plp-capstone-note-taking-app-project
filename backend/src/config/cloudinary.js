import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary using the environment variable
cloudinary.config({
  secure: true, // This is set by default if CLOUDINARY_URL is present
});

export default cloudinary;
