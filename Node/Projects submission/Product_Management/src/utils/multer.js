const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary-v2");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products_images",
  },
});



const upload = multer ({storage: storage})


module.exports = upload