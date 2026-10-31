<script>
	// Light grey box: text on the left, Community / Collaboration / Inclusion on the right.
	// Used on the Home page and the Members page.
	let { title, children } = $props();
</script>

<section class="values-box">
	<div>
		<h2>{title}</h2>
		{@render children()}
	</div>

	<div class="values">
		<a href="/about" class="button">Community</a>
		<a href="/about" class="button">Collaboration</a>
		<a href="/about" class="button">Inclusion</a>
	</div>
</section>

<style>
	.values-box {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 3rem;
		align-items: start;
		background: var(--light-grey);
		color: var(--black);
		padding: clamp(1.5rem, 5vw, 3.5rem);
	}

	.values-box :global(p:last-child) {
		margin-bottom: 0;
	}

	.values {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	/* Black outlined buttons, so they show on the light box */
	.values .button {
		text-align: center;
		background: transparent;
		color: var(--black);
		border-color: var(--black);
	}

	.values .button:hover {
		background: var(--black);
		color: var(--white);
	}

	.values .button:focus-visible {
		outline-color: var(--black);
	}

	@media (max-width: 700px) {
		.values-box {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>
