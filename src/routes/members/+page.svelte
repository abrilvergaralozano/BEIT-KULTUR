<script>
	import ValuesBox from '#lib/components/ValuesBox.svelte';

	const plans = ['One time', 'Monthly', 'Yearly'];
</script>

<svelte:head>
	<title>Members – Beit Kultur</title>
</svelte:head>

<h1>Beit Kultur membership</h1>

<div class="plans">
	{#each plans as plan}
		<div class="plan">
			<h2>{plan}</h2>
			<p>Placeholder text. Here we will explain what a {plan.toLowerCase()} membership gives you.</p>
			<!-- Test mode: does nothing yet -->
			<button type="button" class="button">Start here</button>
		</div>
	{/each}
</div>

<div class="center">
	<a href="/donate" class="button button-grey">Donate</a>
</div>

<ValuesBox title="Our vision and mission">
	<p>Placeholder text. Here we will describe Beit Kultur's vision and mission.</p>
</ValuesBox>

<div class="center">
	<a href="/get-involved" class="button button-outline">Get involved</a>
</div>

<section class="our-values">
	<h2>Our values</h2>
	<p>Placeholder text. Here we will describe the values that guide Beit Kultur.</p>

	<div class="images">
		<div class="image-placeholder" role="img" aria-label="Image coming soon"></div>
		<div class="image-placeholder" role="img" aria-label="Image coming soon"></div>
		<div class="image-placeholder" role="img" aria-label="Image coming soon"></div>
	</div>

	<div class="center">
		<a href="/donate#contact" class="button button-outline">Contact us</a>
	</div>
</section>

<style>
	.plans {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.plan {
		display: flex;
		flex-direction: column;
		border: 2px solid var(--white);
		padding: 2rem 1.5rem;
	}

	/* Push the button to the bottom so all three line up */
	.plan .button {
		margin-top: auto;
	}

	.center {
		text-align: center;
		margin: 3rem 0;
	}

	.button-grey {
		background: var(--grey);
		color: var(--white);
		border-color: var(--grey);
	}

	.button-grey:hover {
		background: var(--white);
		color: var(--black);
		border-color: var(--white);
	}

	.our-values {
		border-top: 2px solid var(--white);
		padding-top: 3rem;
	}

	.images {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-top: 2rem;
	}

	.image-placeholder {
		background: var(--grey);
		aspect-ratio: 4 / 3;
	}

	/* Small screens: stack the columns */
	@media (max-width: 800px) {
		.plans,
		.images {
			grid-template-columns: 1fr;
		}
	}
</style>
