<script>
	import ValuesBox from '#lib/components/ValuesBox.svelte';
</script>

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

<ValuesBox title="About us">
	<p>
		Beit Kultur is a non-profit cultural association that gives artists from the global majority
		(BIPOC) a platform to show their work in music, poetry and film. We are volunteer-run.
	</p>
</ValuesBox>

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

	/* Small screens: everything in one column */
	@media (max-width: 700px) {
		.hero-buttons {
			flex-direction: column;
		}
	}
</style>
