import { randomUUID } from 'node:crypto';
import { getSql } from '#lib/server/db.js';
import { contactTopics } from '#lib/data/contact-topics.js';

export const VOLUNTEER_TOPIC = contactTopics.find((topic) => topic.value === 'volunteer').label;

export async function createContactMessage({ name, email, topic, body }) {
	const selectedTopic = contactTopics.find((option) => option.value === topic);
	if (!selectedTopic) throw new Error('Cannot save a contact message with an unknown topic.');

	const sql = getSql();
	await sql`
		INSERT INTO contact_messages (id, name, email, topic, body)
		VALUES (${randomUUID()}, ${name}, ${email}, ${selectedTopic.label}, ${body})
	`;
}

export async function getVolunteerMessages() {
	const sql = getSql();
	return sql`
		SELECT
			messages.id,
			messages.name,
			messages.email,
			messages.topic,
			messages.body,
			messages.status,
			messages.created_at,
			messages.volunteer_user_id,
			users.username AS volunteer_username
		FROM contact_messages AS messages
		LEFT JOIN users ON users.id = messages.volunteer_user_id
		WHERE messages.topic = ${VOLUNTEER_TOPIC}
		ORDER BY messages.created_at DESC
	`;
}

export async function updateVolunteerMessageStatus(id, status) {
	if (status !== 'approved' && status !== 'rejected') {
		throw new Error('Cannot update a contact message to an unknown status.');
	}

	const sql = getSql();
	const rows = await sql`
		UPDATE contact_messages
		SET status = ${status}
		WHERE id = ${id}
			AND topic = ${VOLUNTEER_TOPIC}
			AND status = 'pending'
		RETURNING id
	`;
	return rows.length > 0;
}

export async function createVolunteerAccount({ messageId, username, password }) {
	const sql = getSql();
	const userId = randomUUID();
	const passwordHash = await (await import('bcryptjs')).default.hash(password, 12);

	const [, createdUsers, linkedMessages] = await sql.transaction((transaction) => [
		transaction`
			SELECT id
			FROM contact_messages
			WHERE id = ${messageId}
				AND topic = ${VOLUNTEER_TOPIC}
				AND status = 'approved'
				AND volunteer_user_id IS NULL
			FOR UPDATE
		`,
		transaction`
			INSERT INTO users (id, username, email, password_hash, role)
			SELECT ${userId}, ${username}, email, ${passwordHash}, 'volunteer'
			FROM contact_messages
			WHERE id = ${messageId}
				AND topic = ${VOLUNTEER_TOPIC}
				AND status = 'approved'
				AND volunteer_user_id IS NULL
			ON CONFLICT DO NOTHING
			RETURNING id, username
		`,
		transaction`
			UPDATE contact_messages
			SET volunteer_user_id = ${userId}
			WHERE id = ${messageId}
				AND topic = ${VOLUNTEER_TOPIC}
				AND status = 'approved'
				AND volunteer_user_id IS NULL
				AND EXISTS (SELECT 1 FROM users WHERE id = ${userId})
			RETURNING id
		`
	]);

	if (!createdUsers.length) return { created: false, reason: 'username-taken' };
	if (!linkedMessages.length) throw new Error('The approved volunteer account could not be linked.');

	return { created: true, username: createdUsers[0].username };
}
