<script>
	const amounts = [100, 200, 300, 400];

	let selectedAmount = $state(null);
	let otherAmount = $state('');

	function chooseAmount(amount) {
		selectedAmount = amount;
		otherAmount = '';
	}

	// Test mode: the forms do nothing yet. We will connect them to the database later.
	function handleSubmit(event) {
		event.preventDefault();
	}
</script>

<svelte:head>
	<title>Donate – Beit Kultur</title>
</svelte:head>

<h1>Donate to Beit Kultur</h1>

<!-- Placeholder until we have a real video -->
<div class="video-placeholder" role="img" aria-label="Video coming soon"></div>

<div class="columns">
	<div class="info">
		<h2>Challenge</h2>
		<p>
			Placeholder text. Here we will explain the challenge that artists from the global majority
			face.
		</p>

		<h2>Our work</h2>
		<p>Placeholder text. Here we will explain what Beit Kultur does and how donations help.</p>
	</div>

	<form class="contribute" onsubmit={handleSubmit}>
		<h2>Contribute</h2>

		<fieldset>
			<legend>Choose an amount</legend>
			<div class="amounts">
				{#each amounts as amount}
					<button
						type="button"
						class="amount"
						aria-pressed={selectedAmount === amount}
						onclick={() => chooseAmount(amount)}>{amount} kr</button
					>
				{/each}
			</div>
		</fieldset>

		<label for="other-amount">Other amount (kr)</label>
		<input
			id="other-amount"
			type="number"
			min="1"
			inputmode="numeric"
			bind:value={otherAmount}
			oninput={() => (selectedAmount = null)}
		/>

		<label for="donate-email">Email</label>
		<input id="donate-email" type="email" autocomplete="email" />

		<button type="submit" class="button">Donate (test mode)</button>
		<p class="note">Test mode: no money is taken.</p>
	</form>
</div>

<div class="get-involved">
	<a href="/get-involved" class="button button-outline">Get involved</a>
</div>

<section class="contact" id="contact">
	<form onsubmit={handleSubmit}>
		<h2>Contact us</h2>

		<label for="contact-email">Email</label>
		<input id="contact-email" type="email" autocomplete="email" />

		<label for="contact-message">Message</label>
		<textarea id="contact-message"></textarea>

		<button type="submit" class="button">Submit</button>
	</form>

	<div class="contact-images">
		<div class="image-placeholder" role="img" aria-label="Image coming soon"></div>
		<div class="image-placeholder" role="img" aria-label="Image coming soon"></div>
	</div>
</section>

<style>
	.video-placeholder {
		background: var(--grey);
		aspect-ratio: 16 / 9;
		width: 100%;
		margin-bottom: 4rem;
	}

	.columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: start;
	}

	fieldset {
		border: none;
		margin: 0 0 1.5rem;
		padding: 0;
	}

	legend {
		font-weight: 700;
		margin-bottom: 0.6rem;
	}

	.amounts {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.amount {
		font-family: inherit;
		font-size: 1.25rem;
		font-weight: 800;
		padding: 0.9rem;
		background: var(--black);
		color: var(--white);
		border: 2px solid var(--white);
		cursor: pointer;
	}

	.amount:hover,
	.amount[aria-pressed='true'] {
		background: var(--lime);
		color: var(--black);
		border-color: var(--lime);
	}

	.contribute .button {
		width: 100%;
	}

	.note {
		font-size: 1rem;
		margin-top: 0.6rem;
	}

	.get-involved {
		margin: 3rem 0 5rem;
		text-align: center;
	}

	.contact {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 3rem;
		align-items: start;
		border-top: 2px solid var(--white);
		padding-top: 3rem;
	}

	.contact-images {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.image-placeholder {
		background: var(--grey);
		aspect-ratio: 4 / 3;
		width: 100%;
	}

	/* Small screens: stack the columns */
	@media (max-width: 800px) {
		.columns,
		.contact {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}

		.contact-images {
			flex-direction: row;
		}
	}
</style>
