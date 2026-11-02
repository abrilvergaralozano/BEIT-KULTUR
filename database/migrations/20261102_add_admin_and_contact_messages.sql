CREATE TABLE IF NOT EXISTS users (
	id uuid PRIMARY KEY,
	username varchar(40) NOT NULL,
	email varchar(254),
	password_hash varchar(100) NOT NULL,
	role varchar(20) NOT NULL CHECK (role IN ('admin', 'volunteer')),
	created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS users_username_lower_idx
	ON users (lower(username));

CREATE TABLE IF NOT EXISTS contact_messages (
	id uuid PRIMARY KEY,
	name varchar(120) NOT NULL,
	email varchar(254) NOT NULL,
	topic varchar(80) NOT NULL,
	body varchar(2000) NOT NULL,
	status varchar(20) NOT NULL DEFAULT 'pending'
		CHECK (status IN ('pending', 'approved', 'rejected')),
	volunteer_user_id uuid REFERENCES users (id) ON DELETE SET NULL,
	created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_messages_topic_status_created_at_idx
	ON contact_messages (topic, status, created_at DESC);
