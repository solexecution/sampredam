const router = require('express').Router();
const { readConfig, writeConfig } = require('../config-io');

// GET /api/config — return parsed CONFIG as JSON
router.get('/', (req, res) => {
  try {
    const config = readConfig();
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/config — write full CONFIG back to config.js
router.put('/', (req, res) => {
  try {
    writeConfig(req.body);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
