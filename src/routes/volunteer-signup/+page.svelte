<script>
	let { form } = $props();
</script>

<svelte:head>
	<title>Sign up as a volunteer – Beit Kultur</title>
</svelte:head>

<section class="signup">
	<h1>Sign up as a volunteer</h1>
	<p>
		Tell us a little about yourself and how you would like to help. Our team will review your
		application.
	</p>
	<p class="note">
		This is a volunteer application, not a login account. If we approve your application, we will
		create a volunteer login for you.
	</p>

	{#if form?.error}
		<p class="notice notice-error" role="alert">{form.error}</p>
	{/if}
	{#if form?.success}
		<p class="notice" role="status">
			Thank you for signing up. Your application has been sent to the Beit Kultur team.
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

		<label for="about">Tell us who you are (required)</label>
		<textarea
			id="about"
			name="about"
			maxlength="400"
			required>{form?.values?.about ?? ''}</textarea>

		<label for="motivation">Why would you like to volunteer? (required)</label>
		<textarea
			id="motivation"
			name="motivation"
			maxlength="600"
			required>{form?.values?.motivation ?? ''}</textarea>

		<label for="skills">What are you good at? What skills can you bring? (required)</label>
		<textarea
			id="skills"
			name="skills"
			maxlength="600"
			required>{form?.values?.skills ?? ''}</textarea>

		<label for="involvement">How often would you like to help? (required)</label>
		<select id="involvement" name="involvement" value={form?.values?.involvement ?? ''} required>
			<option value="" disabled>Choose an option</option>
			<option value="a few hours a month">A few hours a month</option>
			<option value="one day a week">One day a week</option>
			<option value="several days a week">Several days a week</option>
			<option value="flexible, depending on events">Flexible, depending on events</option>
		</select>

		<button class="button" type="submit">Send volunteer application</button>
	</form>
</section>

<style>
	.signup {
		max-width: 42rem;
		margin-inline: auto;
	}

	.signup h1 {
		font-size: clamp(2.5rem, 8vw, 3.5rem);
	}

	.note {
		margin: 1.5rem 0;
		padding: 1rem;
		border: 2px solid var(--text);
		background: var(--box);
	}

	form {
		display: grid;
		gap: 0.75rem;
	}

	label {
		margin-top: 0.75rem;
		font-weight: 700;
	}

	input,
	select,
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
