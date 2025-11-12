const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = uploadPath =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `./uploads/${uploadPath}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${Date.now()}-${name}${ext}`);
    },
  });

const upload = uploadPath =>
  multer({
    storage: storage(uploadPath),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit for high quality images
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/webp'
      ) {
        cb(null, true);
      } else {
        cb(new Error('Only .png, .jpg, .jpeg and .webp format allowed!'));
      }
    },
  });

module.exports = upload;
