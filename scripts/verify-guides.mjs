import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const forbidden = ['undefined', '[object Object]', '{{', '}}'];

const manifest = JSON.parse(fs.readFileSync(path.join(rootDir, 'manifest.json'), 'utf8'));
assert.ok(Array.isArray(manifest.guides) && manifest.guides.length >= 20, 'Expected at least 20 guides in manifest.json');

for (const item of manifest.guides) {
  const mdPath = path.join(rootDir, item.githubPath);
  assert.ok(fs.existsSync(mdPath), 'Missing guide playbook: ' + item.githubPath);
  const content = fs.readFileSync(mdPath, 'utf8');
  assert.ok(content.includes(item.canonicalUrl), item.githubPath + ': missing canonical URL ' + item.canonicalUrl);
  for (const bad of forbidden) {
    assert.ok(!content.includes(bad), item.githubPath + ': contains forbidden string ' + bad);
  }
}

for (const topFile of ['README.md', 'README.zh-CN.md', 'llms.txt']) {
  const text = fs.readFileSync(path.join(rootDir, topFile), 'utf8');
  for (const bad of forbidden) {
    assert.ok(!text.includes(bad), topFile + ': contains forbidden string ' + bad);
  }
}

console.log('Verified ' + manifest.guides.length + ' multilingual guide playbooks cleanly.');
