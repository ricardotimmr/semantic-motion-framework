import fs from 'node:fs';
import path from 'node:path';

const name = process.argv[2];
if (!name) {
  console.log('Usage: node scripts/rename-project.mjs <new-name>');
  process.exit(1);
}

const pkgPath = path.resolve('package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

pkg.name = name;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

console.log(`package.json name set to "${name}"`);