<script>
	const plans = [
		{ name: 'One time', price: '[PRICE] kr' },
		{ name: 'Monthly', price: '[PRICE] kr a month' },
		{ name: 'Yearly', price: '[PRICE] kr a year' }
	];
</script>

<svelte:head>
	<title>Membership – Beit Kultur</title>
</svelte:head>

<h1>Membership</h1>
<p class="intro">Members support artists from the global majority.</p>
<p class="intro">All members get our newsletter.</p>

<ul class="grid plans">
	{#each plans as plan}
		<li class="card">
			<div class="card-body">
				<h2>{plan.name}</h2>
				<p class="price">{plan.price}</p>
				<p>[WHAT IS INCLUDED]</p>
				<a href="/about?topic=member#contact" class="button">
					Join<span class="visually-hidden"> – {plan.name}</span>
				</a>
			</div>
		</li>
	{/each}
</ul>

<p class="renew">
	Already a member and want to renew? <a href="/about?topic=member#contact" class="link">Contact us.</a>
</p>

<style>
	.plans {
		margin-top: 2rem;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		height: 100%;
		padding: 1.75rem;
	}

	.price {
		font-size: 1.5rem;
		font-weight: 800;
	}

	.card-body .button {
		margin-top: auto;
	}

	.renew {
		margin-top: 3rem;
	}
</style>
