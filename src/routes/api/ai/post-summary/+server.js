import { json } from '@sveltejs/kit';
import { isVolunteer } from '#lib/server/auth.js';
import { createPostSummary, isAiConfigured } from '#lib/server/ai.js';

const MAX_TITLE_LENGTH = 120;
const MAX_ARTICLE_LENGTH = 10000;

export async function POST({ request, cookies }) {
	if (!isVolunteer(cookies)) {
		return json({ error: 'Sign in as a volunteer to use the AI writing helper.' }, { status: 401 });
	}
	if (!isAiConfigured()) {
		return json({ error: 'Set GEMINI_API_KEY to enable AI summaries.' }, { status: 503 });
	}

	let input;
	try {
		input = await request.json();
	} catch {
		return json({ error: 'Send a valid article title and text.' }, { status: 400 });
	}

	if (!input || typeof input !== 'object' || Array.isArray(input)) {
		return json({ error: 'Send a valid article title and text.' }, { status: 400 });
	}

	const title = typeof input.title === 'string' ? input.title.trim() : '';
	const text = typeof input.text === 'string' ? input.text.trim() : '';

	if (!title || !text) {
		return json({ error: 'Add a title and article before generating a summary.' }, { status: 400 });
	}
	if (title.length > MAX_TITLE_LENGTH || text.length > MAX_ARTICLE_LENGTH) {
		return json({ error: 'The title or article is too long.' }, { status: 413 });
	}

	try {
		return json({ summary: await createPostSummary({ title, text }) });
	} catch (cause) {
		console.error('Gemini post-summary request failed:', cause);
		return json(
			{ error: 'The AI summary could not be generated. Try again later.' },
			{ status: 502 }
		);
	}
}
