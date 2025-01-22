/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execa } from 'execa';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

await execa('bun', ['clean'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

await Promise.all([
	execa('bun', ['build-pre'], {
		cwd: _dirname + '/../',
		stdout: process.stdout,
		stderr: process.stderr,
	}),
	execa('bun', ['build-assets'], {
		cwd: _dirname + '/../',
		stdout: process.stdout,
		stderr: process.stderr,
	}),
	execa('bun', ['--filter', 'misskey-js', 'build'], {
		cwd: _dirname + '/../',
		stdout: process.stdout,
		stderr: process.stderr,
	}),
]);

await Promise.all([
	execa('bun', ['--filter', 'misskey-reversi', 'build'], {
		cwd: _dirname + '/../',
		stdout: process.stdout,
		stderr: process.stderr,
	}),
	execa('bun', ['--filter', 'misskey-bubble-game', 'build'], {
		cwd: _dirname + '/../',
		stdout: process.stdout,
		stderr: process.stderr,
	}),
]);

execa('bun', ['build-pre', '--watch'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('bun', ['build-assets', '--watch'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('bun', ['--filter', 'backend', 'dev'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('bun', ['--filter', 'frontend-shared', 'watch'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('bun', ['--filter', 'frontend', process.env.MK_DEV_PREFER === 'backend' ? 'watch' : 'dev'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('bun', ['--filter', 'frontend-embed', process.env.MK_DEV_PREFER === 'backend' ? 'watch' : 'dev'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

/*
execa('bun', ['--filter', 'sw', 'watch'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('bun', ['--filter', 'misskey-js', 'watch'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('bun', ['--filter', 'misskey-reversi', 'watch'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});

execa('bun', ['--filter', 'misskey-bubble-game', 'watch'], {
	cwd: _dirname + '/../',
	stdout: process.stdout,
	stderr: process.stderr,
});
*/
