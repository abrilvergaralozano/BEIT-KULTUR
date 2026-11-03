import { createInterface } from 'node:readline/promises';
import { readFile } from 'node:fs/promises';
import { stdin, stdout } from 'node:process';
import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';

const USERNAME_PATTERN = /^[a-z0-9][a-z0-9._-]{2,39}$/;

async function ask(prompt) {
	const interface_ = createInterface({ input: stdin, output: stdout });
	try {
		return (await interface_.question(prompt)).trim();
	} finally {
		interface_.close();
	}
}

async function askHidden(prompt) {
	if (!stdin.isTTY || typeof stdin.setRawMode !== 'function') {
		throw new Error('Run this command in the VS Code PowerShell terminal.');
	}

	stdout.write(prompt);
	stdin.setRawMode(true);
	stdin.resume();

	return new Promise((resolve, reject) => {
		let value = '';

		function finish(error) {
			stdin.off('data', onData);
			stdin.setRawMode(false);
			stdout.write('\n');
			if (error) reject(error);
			else resolve(value);
		}

		function onData(chunk) {
			for (const character of chunk.toString('utf8')) {
				if (character === '\u0003') {
					finish(new Error('Password update cancelled.'));
					return;
				}
				if (character === '\r' || character === '\n') {
					finish();
					return;
				}
				if (character === '\u007f' || character === '\b') {
					value = value.slice(0, -1);
					continue;
				}
				if (character >= ' ') value += character;
			}
		}

		stdin.on('data', onData);
	});
}

function getDatabaseUrl(environmentFile) {
	const match = environmentFile.match(/^\s*DATABASE_URL\s*=\s*(.*)\s*$/m);
	const value = match?.[1]?.trim().replace(/^(['"])(.*)\1$/, '$2');
	if (!value) throw new Error('DATABASE_URL is missing from .env.');

	const url = new URL(value);
	url.hostname = url.hostname.replace('-pooler.', '.');
	return url.toString();
}

async function main() {
	const environmentFile = await readFile('.env', 'utf8');
	const sql = neon(getDatabaseUrl(environmentFile));
	const admins = await sql`
		SELECT id, username
		FROM users
		WHERE role = 'admin'
		ORDER BY created_at
	`;

	if (admins.length === 0) {
		throw new Error('No admin account was found in the Neon database.');
	}

	let admin = admins[0];
	if (admins.length > 1) {
		const currentUsername = await ask('Current admin username: ');
		admin = admins.find((user) => user.username.toLowerCase() === currentUsername.toLowerCase());
		if (!admin) throw new Error('No admin account matches that username.');
	} else {
		console.log(`Updating the admin account "${admin.username}".`);
	}

	const username = (await ask('New admin username: ')).toLowerCase();
	if (!USERNAME_PATTERN.test(username)) {
		throw new Error('Use 3–40 characters: lowercase letters, numbers, dots, underscores or hyphens.');
	}

	const taken = await sql`
		SELECT id FROM users
		WHERE lower(username) = ${username} AND id != ${admin.id}
		LIMIT 1
	`;
	if (taken.length) throw new Error('That username is already in use.');

	const password = await askHidden('New password (at least 12 characters): ');
	if (password.length < 12 || Buffer.byteLength(password, 'utf8') > 72) {
		throw new Error('Use a password of at least 12 characters and no more than 72 bytes.');
	}

	const confirmation = await askHidden('Type the new password again: ');
	if (password !== confirmation) throw new Error('The passwords do not match.');

	const passwordHash = await bcrypt.hash(password, 12);
	const updated = await sql`
		UPDATE users
		SET username = ${username}, password_hash = ${passwordHash}
		WHERE id = ${admin.id} AND role = 'admin'
		RETURNING username
	`;
	if (updated.length !== 1) throw new Error('The admin account could not be updated.');

	console.log(`Admin login updated for "${updated[0].username}".`);
}

main().catch((error) => {
	console.error(error.message);
	process.exitCode = 1;
});
