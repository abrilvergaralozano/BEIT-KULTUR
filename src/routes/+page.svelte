<svelte:head>
	<title>Beit Kultur</title>
</svelte:head>

<section class="hero">
	<h1>BEIT KULTUR</h1>
	<div class="hero-buttons">
		<a href="/donate" class="button">Donate</a>
		<a href="/members" class="button button-outline">Join us</a>
	</div>
</section>

<!-- Placeholder until we have a real image -->
<div class="image-placeholder" role="img" aria-label="Image coming soon"></div>

<section class="about">
	<div class="about-text">
		<h2>About us</h2>
		<p>
			Beit Kultur is a non-profit cultural association that gives artists from the global majority
			(BIPOC) a platform to show their work in music, poetry and film. We are volunteer-run.
		</p>
	</div>

	<div class="values">
		<a href="/about" class="button button-outline">Community</a>
		<a href="/about" class="button button-outline">Collaboration</a>
		<a href="/about" class="button button-outline">Inclusion</a>
	</div>
</section>

<style>
	.hero {
		text-align: center;
		padding: 2rem 0 3rem;
	}

	h1 {
		font-size: clamp(3rem, 12vw, 8rem);
		font-weight: 900;
		line-height: 1;
		margin-bottom: 2rem;
	}

	.hero-buttons {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}

	.image-placeholder {
		background: var(--grey);
		aspect-ratio: 16 / 9;
		width: 100%;
		margin-bottom: 4rem;
	}

	/* About us sits in a light grey box, with black text */
	.about {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 3rem;
		align-items: start;
		background: var(--light-grey);
		color: var(--black);
		padding: clamp(1.5rem, 5vw, 3.5rem);
	}

	.about p {
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

	/* Small screens: everything in one column */
	@media (max-width: 700px) {
		.hero-buttons {
			flex-direction: column;
		}

		.about {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>
