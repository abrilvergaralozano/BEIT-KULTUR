<script>
	let { data, form } = $props();

	function formatDate(value) {
		return new Intl.DateTimeFormat('en-GB', {
			dateStyle: 'medium',
			timeStyle: 'short',
			timeZone: 'UTC'
		}).format(new Date(value));
	}

	function artistReplyLink(message) {
		const subject = 'Thank you for contacting Beit Kultur';
		const body = `Hi ${message.name},\n\nThank you for getting in touch with Beit Kultur and sharing your work with us. We have received your message and will be in touch soon.\n\nBest,\nBeit Kultur`;
		return `mailto:${encodeURIComponent(message.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	}
</script>

<svelte:head>
	<title>Volunteer requests – Beit Kultur</title>
</svelte:head>

<h1>Volunteer requests</h1>
<p>Review people who asked to volunteer with Beit Kultur.</p>

{#if form?.error}
	<p class="notice notice-error" role="alert">
		<span aria-hidden="true">!</span>
		{form.error}
	</p>
{/if}
{#if form?.success}
	<p class="notice" role="status">{form.success}</p>
{/if}

{#if data.messages.length === 0}
	<section class="empty-state">
		<h2>No volunteer requests yet</h2>
		<p>New applications from the volunteer sign-up page will appear here.</p>
	</section>
{:else}
	<div class="requests">
		{#each data.messages as message (message.id)}
			<article class="request">
				<div class="request-heading">
					<div>
						<h2>{message.name}</h2>
						<a href={`mailto:${message.email}`}>{message.email}</a>
					</div>
					<div class="status">
						<span>{message.status}</span>
						<time datetime={new Date(message.created_at).toISOString()}>
							{formatDate(message.created_at)} UTC
						</time>
					</div>
				</div>

				<p class="message">{message.body}</p>

				{#if message.status === 'pending'}
					<div class="actions">
						<form method="POST" action="?/approve">
							<input type="hidden" name="messageId" value={message.id} />
							<button type="submit" class="button button-dark">Approve</button>
						</form>
						<form method="POST" action="?/reject">
							<input type="hidden" name="messageId" value={message.id} />
							<button type="submit" class="button button-second">Reject</button>
						</form>
					</div>
				{:else if message.status === 'approved' && message.volunteer_user_id}
					<p class="account-created">
						Login created for <strong>{message.volunteer_username}</strong>.
					</p>
				{:else if message.status === 'approved'}
					<form class="create-account" method="POST" action="?/createVolunteer">
						<h3>Create volunteer login</h3>
						<input type="hidden" name="messageId" value={message.id} />

						<label for={`username-${message.id}`}>Username (required)</label>
						<input
							id={`username-${message.id}`}
							name="username"
							type="text"
							autocomplete="off"
							minlength="3"
							maxlength="40"
							pattern="[a-zA-Z0-9][a-zA-Z0-9._-]{2,39}"
							value={form?.messageId === message.id ? form.username : ''}
							required
						/>

						<label for={`password-${message.id}`}>Temporary password (required)</label>
						<input
							id={`password-${message.id}`}
							name="password"
							type="password"
							autocomplete="new-password"
							minlength="12"
							maxlength="72"
							required
						/>
						<p class="hint">Use at least 12 characters. The password is saved as a secure hash.</p>

						<button type="submit" class="button button-dark">Create login</button>
					</form>
				{/if}
			</article>
		{/each}
	</div>
{/if}

<section class="artist-inquiries">
	<h2>Artist inquiries</h2>
	<p>Messages from artists who want to share their work with Beit Kultur.</p>

	{#if data.artistMessages.length === 0}
		<p>No artist messages yet.</p>
	{:else}
		<div class="requests">
			{#each data.artistMessages as message (message.id)}
				<article class="request">
					<div class="request-heading">
						<div>
							<h3>{message.name}</h3>
							<a href={`mailto:${message.email}`}>{message.email}</a>
						</div>
						<div class="status">
							{#if message.artist_replied_at}
								<span>Replied</span>
								<time datetime={new Date(message.artist_replied_at).toISOString()}>
									{formatDate(message.artist_replied_at)} UTC
								</time>
							{:else}
								<span>Not replied</span>
								<time datetime={new Date(message.created_at).toISOString()}>
									Received {formatDate(message.created_at)} UTC
								</time>
							{/if}
						</div>
					</div>
					<p class="message">{message.body}</p>
					<div class="actions">
						<a class="button button-dark" href={artistReplyLink(message)}>Reply by email</a>
						{#if !message.artist_replied_at}
							<form method="POST" action="?/markArtistReplied">
								<input type="hidden" name="messageId" value={message.id} />
								<button type="submit" class="button button-second">Mark as replied</button>
							</form>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	{/if}
</section>

<style>
	.artist-inquiries {
		margin-top: 3rem;
	}

	.requests {
		display: grid;
		gap: 1.25rem;
	}

	.notice-error {
		display: flex;
		gap: 0.5rem;
		align-items: flex-start;
	}

	.request,
	.empty-state {
		padding: clamp(1.25rem, 3vw, 2rem);
		border: 1px solid var(--card-border);
		background: var(--card);
	}

	.request-heading {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.request-heading h2 {
		margin-bottom: 0.25rem;
	}

	.request-heading h3 {
		margin-bottom: 0.25rem;
	}

	.status {
		display: grid;
		gap: 0.25rem;
		text-align: right;
		text-transform: capitalize;
	}

	.status time,
	.hint {
		color: var(--muted);
		font-size: 0.9rem;
	}

	.message {
		margin-top: 1.5rem;
		white-space: pre-wrap;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.actions form,
	.create-account {
		margin: 0;
	}

	.actions a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		text-decoration: none;
	}

	.create-account {
		max-width: 32rem;
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--card-border);
	}

	.create-account h3 {
		margin-bottom: 0.75rem;
	}

	.create-account .hint {
		margin: 0 0 1rem;
	}

	.account-created {
		margin-top: 1.5rem;
	}

	@media (max-width: 600px) {
		.request-heading {
			flex-direction: column;
		}

		.status {
			text-align: left;
		}
	}
</style>
