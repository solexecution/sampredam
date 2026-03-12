const router = require('express').Router();
const { execSync } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');

function run(cmd) {
  return execSync(cmd, { cwd: ROOT, encoding: 'utf-8', timeout: 30000 }).trim();
}

// GET /api/deploy/status — git status info
router.get('/status', (req, res) => {
  try {
    const status = run('git status --porcelain');
    const lastCommit = run('git log -1 --oneline');
    let remote = '';
    try { remote = run('git remote get-url origin'); } catch (e) { /* no remote */ }
    res.json({
      dirty: status.length > 0,
      changes: status ? status.split('\n').filter(Boolean) : [],
      lastCommit,
      remote,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/deploy — commit and push
router.post('/', (req, res) => {
  try {
    const message = req.body.message || 'Update listing via editor';
    const status = run('git status --porcelain');
    if (!status) {
      return res.json({ ok: true, message: 'Nothing to deploy — no changes.' });
    }
    run('git add -A');
    run(`git commit -m "${message.replace(/"/g, '\\"')}"`);
    run('git push origin main');
    res.json({ ok: true, message: 'Deployed successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.stderr || err.message });
  }
});

module.exports = router;
