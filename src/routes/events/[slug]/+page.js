import { error } from '@sveltejs/kit';
import { events } from '#lib/data/events.js';

export function load({ params }) {
	const event = events.find((event) => event.slug === params.slug);
	if (!event) error(404, 'We could not find this event.');
	return { event };
}
