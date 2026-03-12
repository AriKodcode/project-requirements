import multer from "multer";
import path from "path";

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "data/uploadsImage/");
  },
  filename: (req, file, cb) => {
    const uniqeName = Date.now() + path.extname(file.originalname);
    cb(null, uniqeName);
  },
});

const fileFilterImage = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("only images are allowed"));
  }
};

export const uploadImage = multer({
  storage: storageImage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilterImage,
});

const storageCsv = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "data/uploadsCsv/");
  },
  filename: (req, file, cb) => {
    const uniqeName = Date.now() + path.extname(file.originalname);
    cb(null, uniqeName);
  },
});

const fileFilterCsv = (req, file, cb) => {
  const allowedTypes = ["text/csv", "application/vnd.ms-excel"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("only csv are allowed"));
  }
};

export const uploadCsv = multer({
  storage: storageCsv,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilterCsv,
});
