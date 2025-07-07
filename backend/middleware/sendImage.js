const upload = multer({ storage });

module.exports = (req, res, next) => {
  console.log("🟡 multer running...");
  upload.single("URL")(req, res, function (err) {
    if (err) {
      console.log("🔴 Multer error:", err);
      return res.status(400).json({ message: "Upload failed", error: err });
    }
    console.log("🟢 multer succeeded");
    next();
  });
};
