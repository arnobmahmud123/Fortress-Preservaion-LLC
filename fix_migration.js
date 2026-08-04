const fs = require('fs');
const path = require('path');

const oldSrc = 'old-static/src';
const appDir = 'src/app';

const files = fs.readdirSync(oldSrc).filter(f => f.endsWith('.html'));

for (const file of files) {
  const name = file.replace('.html', '');
  if (name === 'blog') continue;
  
  const content = fs.readFileSync(path.join(oldSrc, file), 'utf8');
  
  // Extract just what's inside <body> using a regex
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : content;
  
  // Remove the <script src="/main.js"></script> tag from the end of body since layout handles it
  const cleanBody = bodyContent.replace(/<script[^>]*src="\/main\.js"[^>]*><\/script>/gi, '');
  
  const routeDir = name === 'index' ? appDir : path.join(appDir, name);
  
  const pageContent = `export default function ${name.charAt(0).toUpperCase() + name.slice(1)}Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(cleanBody)} }} />
  )
}`;

  fs.writeFileSync(path.join(routeDir, 'page.tsx'), pageContent);
}
console.log("Fixed migration.");
