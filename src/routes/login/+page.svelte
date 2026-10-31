<script>
	let showPassword = $state(false);
	let error = $state(false);

	// No volunteer accounts yet, so every login shows the error for now.
	function handleSubmit(event) {
		event.preventDefault();
		error = true;
	}
</script>

<svelte:head>
	<title>Volunteer login – Beit Kultur</title>
</svelte:head>

<div class="card login">
	<h1>Volunteer login</h1>
	<p>Only volunteers can add news posts.</p>

	{#if error}
		<p class="error" role="alert">
			<span aria-hidden="true">⚠</span> The username or password is wrong. Please try again.
		</p>
	{/if}

	<form onsubmit={handleSubmit}>
		<label for="username">Username</label>
		<input id="username" name="username" type="text" autocomplete="username" required />

		<label for="password">Password</label>
		<div class="password-row">
			<input
				id="password"
				name="password"
				type={showPassword ? 'text' : 'password'}
				autocomplete="current-password"
				aria-describedby="password-note"
				required
			/>
			<button
				type="button"
				class="button button-second"
				aria-pressed={showPassword}
				onclick={() => (showPassword = !showPassword)}
			>
				{showPassword ? 'Hide' : 'Show'}
			</button>
		</div>
		<p id="password-note" class="muted">You can paste your password or use a password manager.</p>

		<button type="submit" class="button button-dark">Log in</button>
	</form>

	<a href="/" class="link">Back to the home page</a>
</div>

<style>
	.login {
		max-width: 30rem;
		margin: 0 auto;
		padding: clamp(1.5rem, 5vw, 2.5rem);
	}

	h1 {
		font-size: 2.25rem;
	}

	.error {
		border: 2px solid var(--text);
		border-radius: var(--radius-small);
		background: var(--box);
		padding: 0.75rem 1rem;
		font-weight: 600;
	}

	.password-row {
		display: flex;
		gap: 0.5rem;
	}

	.password-row input {
		margin: 0;
	}

	.password-row .button {
		padding: 8px 16px;
	}

	.muted {
		font-size: 1rem;
		margin: 0.5rem 0 1.5rem;
	}

	form .button-dark {
		width: 100%;
		margin-bottom: 1rem;
	}
</style>
