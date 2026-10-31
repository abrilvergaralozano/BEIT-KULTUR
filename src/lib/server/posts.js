import { randomUUID } from 'node:crypto';
import { posts as samplePosts } from '#lib/data/news.js';
import { getSql, isDatabaseConfigured } from '#lib/server/db.js';

const POST_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function formatDate(value) {
	return new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'Europe/Stockholm'
	}).format(new Date(value));
}

function fromRow(row) {
	return {
		id: row.id,
		date: formatDate(row.created_at),
		author: row.author,
		title: row.title,
		image: row.image,
		summary: row.summary,
		text: row.body.split(/\r?\n\s*\r?\n/).map((paragraph) => paragraph.trim()).filter(Boolean)
	};
}

export async function getPosts() {
	if (!isDatabaseConfigured()) return samplePosts;

	const sql = getSql();
	const rows = await sql`
		SELECT id, created_at, author, title, image, summary, body
		FROM posts
		ORDER BY created_at DESC
	`;
	return rows.map(fromRow);
}

export async function getPostById(id) {
	if (!POST_ID_PATTERN.test(id)) return undefined;

	if (!isDatabaseConfigured()) {
		return samplePosts.find((post) => String(post.id) === id);
	}

	const sql = getSql();
	const rows = await sql`
		SELECT id, created_at, author, title, image, summary, body
		FROM posts
		WHERE id = ${id}
		LIMIT 1
	`;
	return rows[0] ? fromRow(rows[0]) : undefined;
}

export async function createPost({ title, summary, text }) {
	const sql = getSql();
	const id = randomUUID();
	const rows = await sql`
		INSERT INTO posts (id, title, summary, body, author)
		VALUES (${id}, ${title}, ${summary}, ${text}, 'Beit Kultur volunteer')
		RETURNING id, created_at, author, title, image, summary, body
	`;
	return fromRow(rows[0]);
}

export async function getComments(postId) {
	if (!isDatabaseConfigured()) return [];

	const sql = getSql();
	const rows = await sql`
		SELECT id, name, body, created_at
		FROM comments
		WHERE post_id = ${postId}
		ORDER BY created_at ASC
	`;
	return rows.map((row) => ({
		id: row.id,
		name: row.name,
		text: row.body,
		date: formatDate(row.created_at)
	}));
}

export async function createComment({ postId, name, text }) {
	if (!POST_ID_PATTERN.test(postId)) {
		throw new Error('Cannot save a comment for an invalid article ID.');
	}

	const sql = getSql();
	const rows = await sql`
		INSERT INTO comments (id, post_id, name, body)
		VALUES (${randomUUID()}, ${postId}, ${name}, ${text})
		RETURNING id, name, body, created_at
	`;
	const row = rows[0];
	return { id: row.id, name: row.name, text: row.body, date: formatDate(row.created_at) };
}
