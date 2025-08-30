const express = require("express");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || ".png";
    const fname = `photo_${Date.now()}${ext}`;
    cb(null, fname);
  }
});
const upload = multer({ storage });

app.post("/upload", upload.single("photo"), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: "No file received" });
  const url = `/uploads/${req.file.filename}`;
  res.json({ ok: true, url });
});

app.get("/gallery", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).send("Error reading uploads");
    files = files.filter(f => !f.startsWith("."))
                 .sort((a,b)=>fs.statSync(path.join(uploadDir,b)).mtime - fs.statSync(path.join(uploadDir,a)).mtime);
    const items = files.map(f => `<a href="/uploads/${f}" target="_blank"><img src="/uploads/${f}" style="max-width:140px; margin:8px; border:1px solid #ccc;"/></a>`).join("");
    res.send(`
      <html><head><meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Uploaded Photos</title></head>
      <body style="font-family: sans-serif; padding: 16px;">
        <h2>Uploaded Photos</h2>
        <div>${items || "No photos yet."}</div>
      </body></html>`);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
  console.log("Open http://localhost:"+PORT+" to test.");
});
