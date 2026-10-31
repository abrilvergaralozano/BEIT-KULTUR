import { SESSION_SECRET, VOLUNTEER_PASSWORD, VOLUNTEER_USERNAME } from '$app/env/private';
import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'beit-volunteer-session';
const SESSION_DURATION = 8 * 60 * 60;

export function isAuthConfigured() {
	return Boolean(
		VOLUNTEER_USERNAME && VOLUNTEER_PASSWORD && SESSION_SECRET && SESSION_SECRET.length >= 32
	);
}

function matchesSecret(value, expected) {
	const supplied = Buffer.from(value);
	const configured = Buffer.from(expected);
	return supplied.length === configured.length && timingSafeEqual(supplied, configured);
}

export function verifyCredentials(username, password) {
	if (!isAuthConfigured()) return false;
	const usernameMatches = matchesSecret(username, VOLUNTEER_USERNAME);
	const passwordMatches = matchesSecret(password, VOLUNTEER_PASSWORD);
	return usernameMatches && passwordMatches;
}

function sign(payload) {
	return createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
}

export function startVolunteerSession(cookies, secure) {
	const expires = Math.floor(Date.now() / 1000) + SESSION_DURATION;
	const payload = `${encodeURIComponent(VOLUNTEER_USERNAME)}.${expires}`;

	cookies.set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
		path: '/',
		httpOnly: true,
		secure,
		sameSite: 'lax',
		maxAge: SESSION_DURATION
	});
}

export function isVolunteer(cookies) {
	if (!isAuthConfigured()) return false;

	const token = cookies.get(COOKIE_NAME);
	if (!token) return false;

	const signatureSeparator = token.lastIndexOf('.');
	if (signatureSeparator <= 0) return false;

	const payload = token.slice(0, signatureSeparator);
	const suppliedSignature = token.slice(signatureSeparator + 1);
	const payloadSeparator = payload.lastIndexOf('.');
	if (signatureSeparator < 0 || payloadSeparator < 0) return false;

	let username;
	try {
		username = decodeURIComponent(payload.slice(0, payloadSeparator));
	} catch {
		return false;
	}
	const expires = Number(payload.slice(payloadSeparator + 1));
	if (username !== VOLUNTEER_USERNAME || !Number.isFinite(expires)) return false;
	if (expires <= Math.floor(Date.now() / 1000)) return false;

	const expectedSignature = Buffer.from(sign(payload), 'base64url');
	const actualSignature = Buffer.from(suppliedSignature, 'base64url');
	return (
		actualSignature.length === expectedSignature.length &&
		timingSafeEqual(actualSignature, expectedSignature)
	);
}

export function endVolunteerSession(cookies) {
	cookies.delete(COOKIE_NAME, { path: '/' });
}
