const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();


cloudinary.config({
  cloud_name:'h0bwkdhy' ,
  api_key: '615637364183765' ,
  api_secret: 'l8dKy53FeXCwLCp2GVICa3Phb3s'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog_images',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], 
  },
});

const upload = multer({ storage: storage });

module.exports = upload;