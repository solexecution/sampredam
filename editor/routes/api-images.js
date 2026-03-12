const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const GALLERY_DIR = path.resolve(__dirname, '../../images/gallery');

const storage = multer.diskStorage({
  destination: GALLERY_DIR,
  filename: (req, file, cb) => {
    // Sanitize: lowercase, replace spaces with underscores, strip unsafe chars
    const clean = file.originalname
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_\-.]/g, '');
    // Avoid overwriting: prepend timestamp if file exists
    const dest = path.join(GALLERY_DIR, clean);
    if (fs.existsSync(dest)) {
      const ext = path.extname(clean);
      const base = path.basename(clean, ext);
      cb(null, `${base}_${Date.now()}${ext}`);
    } else {
      cb(null, clean);
    }
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|webp|svg|gif)$/i;
    cb(null, allowed.test(file.originalname));
  },
});

// GET /api/images — list all images in gallery folder
router.get('/', (req, res) => {
  try {
    const files = fs.readdirSync(GALLERY_DIR).filter(f => {
      return /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(f);
    });
    const images = files.map(f => {
      const stat = fs.statSync(path.join(GALLERY_DIR, f));
      return {
        filename: f,
        src: `images/gallery/${f}`,
        size: stat.size,
        modified: stat.mtime,
      };
    });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/images/upload — upload one or more images
router.post('/upload', upload.array('images', 20), (req, res) => {
  const uploaded = req.files.map(f => ({
    filename: f.filename,
    src: `images/gallery/${f.filename}`,
    size: f.size,
  }));
  res.json({ uploaded });
});

// DELETE /api/images/:filename — delete an image
router.delete('/:filename', (req, res) => {
  try {
    const filePath = path.join(GALLERY_DIR, req.params.filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    fs.unlinkSync(filePath);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
