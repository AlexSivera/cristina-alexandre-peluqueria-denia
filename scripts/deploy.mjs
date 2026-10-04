// Publica src/ en la rama gh-pages del repositorio (GitHub Pages).
// Uso: npm run deploy
import { execSync } from 'node:child_process';
import { cp, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit' });
const out = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim();

const remote = out('git remote get-url origin');
const rev = out('git rev-parse --short HEAD');
const dir = await mkdtemp(join(tmpdir(), 'gh-pages-'));
await cp('src', dir, { recursive: true });
run('git init -q -b gh-pages', dir);
run('git add -A', dir);
run(`git commit -q -m "Publicar web (${rev})"`, dir);
run(`git push -f "${remote}" gh-pages`, dir);
await rm(dir, { recursive: true, force: true });
console.log('Publicado en gh-pages');
