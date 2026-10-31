CREATE TABLE IF NOT EXISTS posts (
	id uuid PRIMARY KEY,
	title varchar(120) NOT NULL,
	summary varchar(280) NOT NULL,
	body text NOT NULL,
	author varchar(120) NOT NULL,
	image text,
	created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS comments (
	id uuid PRIMARY KEY,
	post_id uuid NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
	name varchar(80) NOT NULL,
	body varchar(2000) NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS comments_post_created_at_idx
	ON comments (post_id, created_at);

INSERT INTO posts (id, title, summary, body, author, image, created_at)
VALUES
	(
		'00000000-0000-4000-8000-000000000001',
		'Sundays at Beit brings live music to Stockholm',
		'Sundays at Beit creates space for live music, artists and community.',
		'Sundays at Beit is a live music series that brings artists and audiences together in Stockholm.

Our events are part of a wider effort to create culture together and make room for artists from the global majority and queer artists.',
		'Beit Kultur',
		'sundays-at-beit.jpg',
		'2026-10-30 12:00:00+00'
	),
	(
		'00000000-0000-4000-8000-000000000002',
		'Making space for artists and new ideas',
		'We work with artists and local partners to make creative projects together.',
		'Beit Kultur is a grassroots, non-profit cultural association in Stockholm. We work with artists, associations and galleries to make projects together.

Live sets, poetry, film and visual art help us bring people together and create dialogue.',
		'Beit Kultur',
		'event-crowd.jpg',
		'2026-10-18 12:00:00+00'
	),
	(
		'00000000-0000-4000-8000-000000000003',
		'A new digital home for Beit Kultur',
		'The website makes it easier to find our events, projects and ways to take part.',
		'This website brings Beit Kultur news, events and projects together in one place.

Artists, audiences, volunteers and partners can explore what we do and find ways to get involved.',
		'Beit Kultur',
		'drawing-hanging-art.jpg',
		'2026-10-04 12:00:00+00'
	)
ON CONFLICT (id) DO NOTHING;
