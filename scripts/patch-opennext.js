const fs = require('fs');
const path = require('path');

// 1. Revert wrangler-external.js patch
const openNextFile = path.join(
  __dirname,
  '../node_modules/@opennextjs/cloudflare/dist/cli/build/patches/plugins/wrangler-external.js'
);

if (fs.existsSync(openNextFile)) {
  let content = fs.readFileSync(openNextFile, 'utf8');
  if (content.includes('pg-cloudflare')) {
    content = content.replace(
      "filter: /(\\.bin|\\.wasm(\\?module)?|pg-cloudflare)$/",
      "filter: /(\\.bin|\\.wasm(\\?module)?)$/"
    );
    fs.writeFileSync(openNextFile, content, 'utf8');
    console.log('Successfully reverted wrangler-external.js patch.');
  }
}

// 2. Patch node_modules/pg/lib/stream.js
const pgStreamFile = path.join(
  __dirname,
  '../node_modules/pg/lib/stream.js'
);

if (fs.existsSync(pgStreamFile)) {
  let content = fs.readFileSync(pgStreamFile, 'utf8');
  if (content.includes("require('pg-cloudflare')") || content.includes("require('pg-' + 'cloudflare')") || content.includes("require(String('pg-cloudflare'))")) {
    content = content.replace(
      "require('pg-cloudflare')",
      "require('pg-' + (Math.random() > 2 ? 'invalid' : 'cloudflare'))"
    ).replace(
      "require('pg-' + 'cloudflare')",
      "require('pg-' + (Math.random() > 2 ? 'invalid' : 'cloudflare'))"
    ).replace(
      "require(String('pg-cloudflare'))",
      "require('pg-' + (Math.random() > 2 ? 'invalid' : 'cloudflare'))"
    );
    fs.writeFileSync(pgStreamFile, content, 'utf8');
    console.log('Successfully patched pg/lib/stream.js to use dynamic require for pg-cloudflare.');
  } else {
    console.log('pg/lib/stream.js is already patched or does not contain pg-cloudflare require.');
  }
} else {
  console.error('Could not find pg/lib/stream.js to patch.');
}

