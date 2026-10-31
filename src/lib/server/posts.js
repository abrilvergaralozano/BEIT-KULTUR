import { randomUUID } from 'node:crypto';
import { posts as samplePosts } from '#lib/data/news.js';

const posts = samplePosts.map((post) => ({ ...post, text: [...post.text] }));

export function getPosts() {
	return posts;
}

export function getPostById(id) {
	return posts.find((post) => String(post.id) === id);
}

export function createPost({ title, summary, text }) {
	const post = {
		id: randomUUID(),
		date: new Intl.DateTimeFormat('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			timeZone: 'Europe/Stockholm'
		}).format(new Date()),
		author: 'Beit Kultur volunteer',
		title,
		image: null,
		summary,
		text: text.split(/\r?\n\s*\r?\n/).map((paragraph) => paragraph.trim()).filter(Boolean)
	};

	posts.unshift(post);
	return post;
}
