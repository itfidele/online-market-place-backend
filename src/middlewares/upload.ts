import multer from 'multer';


// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req:any, file:any, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req:any, file:any, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


export const upload = multer({ storage: storage });