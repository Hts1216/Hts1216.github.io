// Manage this blog's GitHub Pages settings using the local Git credential helper.
// Credentials stay in memory and are never written to the project or printed.
import { execFileSync, spawnSync } from 'node:child_process';

const repository = 'Hts1216/Hts1216.github.io';
const command = process.argv[2] ?? 'inspect';
const commit = process.argv[3];

if (!['inspect', 'configure', 'status'].includes(command)) {
	throw new Error('Use inspect, configure, or status [commit SHA].');
}
if (commit && !/^[a-f0-9]{40}$/.test(commit)) {
	throw new Error('The commit must be a full Git SHA.');
}

const remote = execFileSync('git', ['remote', 'get-url', 'origin'], { encoding: 'utf8' }).trim();
if (remote.toLowerCase() !== `https://github.com/${repository.toLowerCase()}.git`) {
	throw new Error('The origin remote does not match this blog repository.');
}

const credentials = spawnSync('git', ['credential', 'fill'], {
	input: 'protocol=https\nhost=github.com\nusername=Hts1216\n\n',
	encoding: 'utf8',
	env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' },
});
if (credentials.status !== 0) {
	throw new Error('GitHub login is required. Run git credential-manager github login first.');
}
const token = credentials.stdout.split(/\r?\n/).find((line) => line.startsWith('password='))?.slice(9);
if (!token) throw new Error('The Git credential helper returned no GitHub credential.');

async function github(path, method = 'GET', body) {
	const response = await fetch(`https://api.github.com/repos/${repository}/${path}`, {
		method,
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${token}`,
			'User-Agent': 'hts1216-astro-blog',
			'X-GitHub-Api-Version': '2022-11-28',
			...(body ? { 'Content-Type': 'application/json' } : {}),
		},
		body: body ? JSON.stringify(body) : undefined,
		signal: AbortSignal.timeout(30000),
	});
	if (!response.ok) throw new Error(`GitHub API ${method} ${path} returned HTTP ${response.status}.`);
	return response.status === 204 ? null : response.json();
}

try {
	if (command === 'configure') {
		await github('pages', 'PUT', { build_type: 'workflow' });
	}
	if (command === 'status') {
		const query = new URLSearchParams({ per_page: '5' });
		if (commit) query.set('head_sha', commit);
		const result = await github(`actions/runs?${query}`);
		console.log(JSON.stringify(result.workflow_runs.map((run) => ({
			id: run.id, name: run.name, status: run.status, conclusion: run.conclusion,
			sha: run.head_sha, url: run.html_url,
		})), null, 2));
	} else {
		const result = await github('pages');
		console.log(JSON.stringify({
			url: result.html_url, buildType: result.build_type,
			source: result.source, customDomain: result.cname, httpsEnforced: result.https_enforced,
		}, null, 2));
	}
} catch (error) {
	console.error(error.message);
	process.exitCode = 1;
}
