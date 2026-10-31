<svelte:head>
	<title>Beit Kultur</title>
</svelte:head>

<section class="hero">
	<h1><span>BEIT</span> <span class="kultur">KULTUR</span></h1>
	<div class="hero-buttons">
		<a href="/donate" class="button">Donate</a>
		<a href="/get-involved" class="button button-outline">Join us</a>
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

	/* Stacked logo: BEIT on top, KULTUR in italics below */
	h1 {
		font-size: clamp(3.5rem, 14vw, 9rem);
		font-weight: 900;
		line-height: 0.9;
		letter-spacing: -0.02em;
		margin-bottom: 2.5rem;
	}

	h1 span {
		display: block;
	}

	.kultur {
		font-style: italic;
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

	/* About us sits in its own box, like the wireframe */
	.about {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 3rem;
		align-items: start;
		background: var(--grey);
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

	.values .button {
		text-align: center;
	}

	/* Small screens: stack text and buttons */
	@media (max-width: 700px) {
		.about {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>
