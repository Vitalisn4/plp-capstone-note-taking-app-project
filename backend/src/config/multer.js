import multer from "multer";

// Use memory storage to process the file before uploading to the cloud
const storage = multer.memoryStorage();

const multerUpload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
});

export default multerUpload;
