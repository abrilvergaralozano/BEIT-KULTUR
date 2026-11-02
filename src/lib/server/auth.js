import { randomUUID, createHmac, timingSafeEqual } from 'node:crypto';
import bcrypt from 'bcryptjs';
import {
	ADMIN_PASSWORD,
	ADMIN_USERNAME,
	SESSION_SECRET,
	VOLUNTEER_PASSWORD,
	VOLUNTEER_USERNAME
} from '$app/env/private';
import { getSql, isDatabaseConfigured } from '#lib/server/db.js';

const COOKIE_NAME = 'beit-volunteer-session';
const SESSION_DURATION = 8 * 60 * 60;
const BCRYPT_ROUNDS = 12;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function normalizeUsername(value) {
	return value.trim().toLowerCase();
}

function matchesSecret(value, expected) {
	if (!value || !expected) return false;
	const supplied = Buffer.from(value);
	const configured = Buffer.from(expected);
	return supplied.length === configured.length && timingSafeEqual(supplied, configured);
}

export function isAuthConfigured() {
	return Boolean(isDatabaseConfigured() && SESSION_SECRET && SESSION_SECRET.length >= 32);
}

async function findUser(username) {
	const sql = getSql();
	const rows = await sql`
		SELECT id, username, email, password_hash, role
		FROM users
		WHERE lower(username) = ${username}
		LIMIT 1
	`;
	return rows[0] ?? null;
}

async function createConfiguredUser({ username, email, password, role }) {
	const sql = getSql();
	const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
	await sql`
		INSERT INTO users (id, username, email, password_hash, role)
		VALUES (${randomUUID()}, ${username}, ${email}, ${passwordHash}, ${role})
		ON CONFLICT DO NOTHING
	`;
	return findUser(username);
}

export async function authenticateUser(usernameInput, password) {
	if (!isAuthConfigured()) return null;

	const username = normalizeUsername(usernameInput);
	if (!username || !password || Buffer.byteLength(password, 'utf8') > 72) return null;

	let user = await findUser(username);

	if (
		!user &&
		ADMIN_USERNAME &&
		ADMIN_PASSWORD &&
		matchesSecret(username, normalizeUsername(ADMIN_USERNAME)) &&
		matchesSecret(password, ADMIN_PASSWORD)
	) {
		user = await createConfiguredUser({
			username,
			email: null,
			password,
			role: 'admin'
		});
	}

	if (
		!user &&
		VOLUNTEER_USERNAME &&
		VOLUNTEER_PASSWORD &&
		matchesSecret(username, normalizeUsername(VOLUNTEER_USERNAME)) &&
		matchesSecret(password, VOLUNTEER_PASSWORD)
	) {
		user = await createConfiguredUser({
			username,
			email: null,
			password,
			role: 'volunteer'
		});
	}

	if (!user || !(await bcrypt.compare(password, user.password_hash))) return null;

	return {
		id: user.id,
		username: user.username,
		email: user.email,
		role: user.role
	};
}

function sign(payload) {
	return createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
}

export function startUserSession(cookies, user, secure) {
	const expires = Math.floor(Date.now() / 1000) + SESSION_DURATION;
	const payload = `${user.id}.${expires}`;

	cookies.set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
		path: '/',
		httpOnly: true,
		secure,
		sameSite: 'lax',
		maxAge: SESSION_DURATION
	});
}

export async function getSessionUser(cookies) {
	if (!isAuthConfigured()) return null;

	const token = cookies.get(COOKIE_NAME);
	if (!token) return null;

	const signatureSeparator = token.lastIndexOf('.');
	if (signatureSeparator <= 0) return null;

	const payload = token.slice(0, signatureSeparator);
	const suppliedSignature = token.slice(signatureSeparator + 1);
	const payloadSeparator = payload.lastIndexOf('.');
	if (payloadSeparator <= 0) return null;

	const userId = payload.slice(0, payloadSeparator);
	const expires = Number(payload.slice(payloadSeparator + 1));
	if (!UUID_PATTERN.test(userId) || !Number.isSafeInteger(expires)) return null;
	if (expires <= Math.floor(Date.now() / 1000)) return null;

	const expectedSignature = Buffer.from(sign(payload), 'base64url');
	const actualSignature = Buffer.from(suppliedSignature, 'base64url');
	if (
		actualSignature.length !== expectedSignature.length ||
		!timingSafeEqual(actualSignature, expectedSignature)
	) {
		return null;
	}

	const sql = getSql();
	const rows = await sql`
		SELECT id, username, email, role
		FROM users
		WHERE id = ${userId}
		LIMIT 1
	`;
	return rows[0] ?? null;
}

export async function isVolunteer(cookies) {
	return (await getSessionUser(cookies))?.role === 'volunteer';
}

export function endVolunteerSession(cookies) {
	cookies.delete(COOKIE_NAME, { path: '/' });
}
