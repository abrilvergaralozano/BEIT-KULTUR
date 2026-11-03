ALTER TABLE contact_messages
	ADD COLUMN IF NOT EXISTS artist_replied_at timestamptz;
