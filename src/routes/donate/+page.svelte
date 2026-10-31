<script>
	const amounts = [100, 200, 300, 400];

	let monthly = $state(false);
	let selectedAmount = $state(null);
	let otherAmount = $state('');
	let sent = $state(false);

	let amount = $derived(otherAmount ? Number(otherAmount) : selectedAmount);
	let giveText = $derived(`Give ${amount} kr${monthly ? ' every month' : ''}`);

	function chooseAmount(value) {
		selectedAmount = value;
		otherAmount = '';
	}

	// Test mode: later this saves the amount, once or monthly, and the date to Neon.
	function handleSubmit(event) {
		event.preventDefault();
		if (amount) sent = true;
	}
</script>

<svelte:head>
	<title>Donate – Beit Kultur</title>
</svelte:head>

<h1>Donate</h1>
<p class="intro">
	Your gift helps artists from the global majority show their work. <a href="/about">Why we exist</a>
</p>

<section class="section">
	<!-- Placeholder until we have the video -->
	<div class="video" role="img" aria-label="Video about Beit Kultur, coming soon">
		<span aria-hidden="true">[VIDEO ABOUT BEIT KULTUR]</span>
	</div>
	<p class="muted">The video does not play by itself. It has captions and a text version.</p>
</section>

<section class="section gift" aria-labelledby="gift-title">
	<h2 id="gift-title">Give a gift</h2>
	<p>Want a vote at our annual meeting? <a href="/members" class="link">Become a member instead.</a></p>
	<p class="notice">Test mode: no real money is taken.</p>

	{#if sent}
		<p class="notice" role="status">
			Thank you for your gift of {amount} kr{monthly ? ' every month' : ''}!
		</p>
	{:else}
		<form onsubmit={handleSubmit}>
			<fieldset>
				<legend>Step 1: How often?</legend>
				<div class="choices">
					<button
						type="button"
						class="button button-second"
						aria-pressed={!monthly}
						onclick={() => (monthly = false)}>Once</button
					>
					<button
						type="button"
						class="button button-second"
						aria-pressed={monthly}
						onclick={() => (monthly = true)}>Every month</button
					>
				</div>
			</fieldset>

			<fieldset>
				<legend>Step 2: Choose an amount</legend>
				<div class="choices">
					{#each amounts as value}
						<button
							type="button"
							class="button button-second"
							aria-pressed={selectedAmount === value && !otherAmount}
							onclick={() => chooseAmount(value)}>{value} kr</button
						>
					{/each}
				</div>

				<label for="other-amount">Or type another amount in kr</label>
				<input
					id="other-amount"
					type="number"
					min="1"
					inputmode="numeric"
					bind:value={otherAmount}
				/>
			</fieldset>

			<fieldset>
				<legend>Step 3: Your email (optional, for a thank-you)</legend>
				<label for="donate-email">Email</label>
				<input id="donate-email" type="email" autocomplete="email" />
			</fieldset>

			<fieldset>
				<legend>Step 4: Give</legend>
				<button type="submit" class="button" disabled={!amount}>
					{amount ? giveText : 'Choose an amount first'}
				</button>
			</fieldset>

			<p class="muted">
				We only save the amount, how often and the date. You can stop monthly giving any time.
				<a href="/privacy">Privacy</a>
			</p>
		</form>
	{/if}
</section>

<section class="section">
	<h2>Where the money goes</h2>
	<ul class="grid">
		{#each [1, 2, 3] as _}
			<li class="box share">
				<p class="percent">[XX] %</p>
				<p>[PURPOSE]</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.video {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		aspect-ratio: 16 / 9;
		background: var(--text);
		color: var(--bg);
		border-radius: var(--radius);
		font-weight: 800;
		text-align: left;
		padding: 1rem;
	}

	.video + .muted {
		margin-top: 0.75rem;
	}

	.gift {
		max-width: 40rem;
		margin-inline: auto;
	}

	fieldset {
		border: 0;
		margin: 0 0 1.5rem;
		padding: 0;
	}

	legend {
		font-weight: 800;
		font-size: 1.25rem;
		margin-bottom: 0.75rem;
	}

	.choices {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
	}

	.choices .button[aria-pressed='true'] {
		background: var(--text);
		color: var(--bg);
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.share p {
		margin: 0;
	}

	.percent {
		font-size: 2.5rem;
		font-weight: 900;
	}
</style>
