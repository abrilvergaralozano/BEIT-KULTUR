<script>
	let { form } = $props();
</script>

<svelte:head>
	<title>Contact us as an artist – Beit Kultur</title>
</svelte:head>

<section class="artist-contact">
	<h1>Show your work</h1>
	<p>
		Are you an artist from the global majority? Tell us about yourself and your work. We would love to
		hear why you are interested in Beit Kultur.
	</p>

	{#if form?.error}
		<p class="notice notice-error" role="alert">{form.error}</p>
	{/if}
	{#if form?.success}
		<p class="notice" role="status">
			Thank you for getting in touch. Your message has been sent to the Beit Kultur team.
		</p>
	{/if}

	<form method="POST">
		<label for="name">Your name (required)</label>
		<input
			id="name"
			name="name"
			type="text"
			autocomplete="name"
			maxlength="120"
			value={form?.values?.name ?? ''}
			required
		/>

		<label for="email">Email address (required)</label>
		<input
			id="email"
			name="email"
			type="email"
			autocomplete="email"
			maxlength="254"
			value={form?.values?.email ?? ''}
			required
		/>

		<label for="about">Who are you? (required)</label>
		<textarea id="about" name="about" maxlength="400" required>{form?.values?.about ?? ''}</textarea>

		<label for="motivation">Why are you interested in Beit Kultur? (required)</label>
		<textarea
			id="motivation"
			name="motivation"
			maxlength="500"
			required>{form?.values?.motivation ?? ''}</textarea>

		<label for="practice">What do you work with? (required)</label>
		<textarea
			id="practice"
			name="practice"
			maxlength="500"
			required>{form?.values?.practice ?? ''}</textarea>

		<label for="instagram">Instagram profile (optional)</label>
		<input
			id="instagram"
			name="instagram"
			type="url"
			placeholder="https://instagram.com/yourname"
			maxlength="200"
			value={form?.values?.instagram ?? ''}
		/>

		<label for="portfolio">Portfolio or website (optional)</label>
		<input
			id="portfolio"
			name="portfolio"
			type="url"
			placeholder="https://your-portfolio.com"
			maxlength="200"
			value={form?.values?.portfolio ?? ''}
		/>

		<button class="button" type="submit">Send artist message</button>
	</form>
</section>

<style>
	.artist-contact {
		max-width: 42rem;
		margin-inline: auto;
	}

	.artist-contact h1 {
		font-size: clamp(2.5rem, 8vw, 3.5rem);
	}

	form {
		display: grid;
		gap: 0.75rem;
		margin-top: 2rem;
	}

	label {
		margin-top: 0.75rem;
		font-weight: 700;
	}

	input,
	textarea {
		width: 100%;
		min-height: 3rem;
		padding: 0.75rem;
		border: 2px solid var(--input-border);
		border-radius: var(--radius-small);
		background: var(--card);
		color: var(--text);
		font: inherit;
	}

	textarea {
		min-height: 8rem;
		resize: vertical;
	}

	.button {
		justify-self: start;
		min-height: 44px;
		margin-top: 1rem;
	}
</style>
