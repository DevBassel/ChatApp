import multer from "multer";

const storage: multer.StorageEngine = multer.diskStorage({
  filename(req, file, callback) {
    const ext = file.mimetype.split("/")[1];
    callback(null, `${file.fieldname}_${Date.now().toString(16)}.${ext}`);
  },
});

export default multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    const fileType = file.mimetype.split("/")[0];
    if (fileType === "image") callback(null, true);
    else callback(new Error("file shoud be image"));
  },
});
