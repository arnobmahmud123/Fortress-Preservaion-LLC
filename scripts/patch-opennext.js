const fs = require('fs');
const path = require('path');

const fileToPatch = path.join(
  __dirname,
  '../node_modules/@opennextjs/cloudflare/dist/cli/build/patches/plugins/wrangler-external.js'
);

if (fs.existsSync(fileToPatch)) {
  let content = fs.readFileSync(fileToPatch, 'utf8');
  if (!content.includes('pg-cloudflare')) {
    content = content.replace(
      "filter: /(\\.bin|\\.wasm(\\?module)?)$/",
      "filter: /(\\.bin|\\.wasm(\\?module)?|pg-cloudflare)$/"
    );
    fs.writeFileSync(fileToPatch, content, 'utf8');
    console.log('Successfully patched wrangler-external.js to mark pg-cloudflare as external!');
  } else {
    console.log('wrangler-external.js is already patched.');
  }
} else {
  console.error('Could not find wrangler-external.js to patch at:', fileToPatch);
}
