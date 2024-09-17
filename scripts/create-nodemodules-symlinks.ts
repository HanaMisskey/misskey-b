/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import packageJson from '../package.json';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

function main() {
	const nodeModulesPath = path.join(__dirname, '../node_modules');

	for (const workspacePath of packageJson.workspaces) {
		const packagePath = path.join(__dirname, '../', workspacePath);

		const workspaceNodeModulesPath = path.join(packagePath, 'node_modules');

		const workspacePackageJson = JSON.parse(fs.readFileSync(path.join(packagePath, 'package.json'), 'utf-8'));

		if (fs.existsSync(workspaceNodeModulesPath)) {
			console.log(`Creating symlink: ${workspaceNodeModulesPath} -> ${nodeModulesPath}`);
			[...Object.keys(workspacePackageJson.dependencies), ...Object.keys(workspacePackageJson.devDependencies)].forEach((dependency) => {
				if (!fs.existsSync(path.join(workspaceNodeModulesPath, dependency)) && fs.existsSync(path.join(nodeModulesPath, dependency))) {
					const path = dependency.split('/')[0];
					execSync(`ln -s ${nodeModulesPath}/${path} ${workspaceNodeModulesPath}/${path}`);
				}
			});
		} else {
			console.log(`Creating symlink: ${workspaceNodeModulesPath} -> ${nodeModulesPath}`);
			execSync(`ln -s ${nodeModulesPath} ${workspaceNodeModulesPath}`);
		}
	}
}

main();
