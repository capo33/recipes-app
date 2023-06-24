import path from "path";
import multer, * as multer_1 from "multer";
import express, { Request } from "express";

const router = express.Router();

// If production, use Render server's data folder, else use local uploads folder
const uploadFolder =
  process.env.NODE_ENV === "production" ? "/var/data/uploads/" : "uploads/";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Set Storage Engine
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(null, uploadFolder);
  },

  // we describe how we want the filename to be formatted
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    //extname = extension name of the file (e.g. .jpg, .png, .pdf)
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path?.extname(file.originalname)}`
    );
  },
});

// Check File Type
const checkFileType = (file: Express.Multer.File, cb: multer_1.FileFilterCallback) => {
  // Allowed extensions
  const filetypes = /jpg|jpeg|png/;
  // Check extension

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    // cb = callback
    cb(new Error("Only images are allowed"));
  }
};

// Init Upload
const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// @route POST /upload
// @desc Uploads file to DB
router.post("/", upload.single("image"), (req, res) => {
  try {
    res.json({
      message: "Image Uploaded Successfully",
      image: `/${req?.file?.path.replace(/\\/g, "/")}`,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
