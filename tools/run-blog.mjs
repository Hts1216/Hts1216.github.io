import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, delimiter, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const action = process.argv[2];
if (!['dev', 'build', 'preview', 'check'].includes(action)) {
	throw new Error('Use dev, build, preview, or check.');
}

const [major, minor] = process.versions.node.split('.').map(Number);
const meetsRequirement = major > 26 || (major === 26 && minor >= 13);
const portableNode = join(root, '.runtime', 'node-v26.13.0-win-x64', 'node.exe');
const runtime = meetsRequirement ? process.execPath : portableNode;
if (!existsSync(runtime)) {
	throw new Error('这个主题需要 Node.js 26.13.0 或以上版本。请先安装对应版本，再运行博客。');
}

const require = createRequire(import.meta.url);
const manifestPath = require.resolve('astro/package.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const cli = join(dirname(manifestPath), typeof manifest.bin === 'string' ? manifest.bin : manifest.bin.astro);
const result = spawnSync(runtime, [cli, action, ...process.argv.slice(3)], {
	cwd: root,
	stdio: 'inherit',
	env: { ...process.env, PATH: `${dirname(runtime)}${delimiter}${process.env.PATH ?? ''}` },
});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
