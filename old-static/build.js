const fs = require('fs');
const path = require('path');
const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');
if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });
fs.readdirSync(SRC, { withFileTypes: true }).forEach(e => {
  if (e.isFile()) { fs.copyFileSync(path.join(SRC, e.name), path.join(DIST, e.name)); console.log('  ✓', e.name); }
});
console.log('\n✅ Build complete! dist/ is ready.\n   Run: npx wrangler pages dev dist --port 8788');
