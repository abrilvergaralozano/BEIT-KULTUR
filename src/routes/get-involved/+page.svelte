<script>
	import Photo from '#lib/components/Photo.svelte';

	const ways = [
		{
			title: 'Volunteer',
			text: ['Give your time to help make events and projects happen.', '[WHAT VOLUNTEERS DO]'],
			link: { href: '/about?topic=volunteer#contact', label: 'Contact us to volunteer' }
		},
		{
			title: 'Show your work',
			text: [
				'Are you an artist from the global majority?',
				'We want to give your music, poetry or film a stage.'
			],
			link: { href: '/about?topic=artist#contact', label: 'Contact us as an artist' }
		},
		{
			title: 'Become a member',
			text: ['Support us every month or year.', 'Members get our newsletter.'],
			link: { href: '/members', label: 'See membership' }
		},
		{
			title: 'Donate',
			text: ['Give once.', 'We show you where the money goes.'],
			link: { href: '/donate', label: 'Donate', lime: true }
		}
	];
</script>

<svelte:head>
	<title>Get involved – Beit Kultur</title>
</svelte:head>

<div class="top">
	<div>
		<h1>Get involved</h1>
		<p class="intro">Beit Kultur is run by volunteers.</p>
		<p class="intro">There are four ways you can take part.</p>
	</div>
	<div class="photo"><Photo file="event-crowd.jpg" /></div>
</div>

<ol class="ways">
	{#each ways as way, i}
		<li class="card">
			<div class="card-body">
				<span class="number" aria-hidden="true">{i + 1}</span>
				<h2>{way.title}</h2>
				{#each way.text as line}
					<p>{line}</p>
				{/each}
				<a
					href={way.link.href}
					class="button"
					class:button-second={!way.link.lime}>{way.link.label}</a
				>
			</div>
		</li>
	{/each}
</ol>

<style>
	.top {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		align-items: center;
		margin-bottom: 3rem;
	}

	.photo {
		min-width: 0;
	}

	.intro {
		margin-bottom: 0.5rem;
	}

	.ways {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		height: 100%;
		padding: 1.75rem;
	}

	.number {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background: var(--text);
		color: var(--bg);
		font-weight: 900;
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	h2 {
		font-size: 1.75rem;
	}

	.card-body p {
		margin-bottom: 0.5rem;
	}

	.card-body .button {
		margin-top: auto;
	}

	.card-body p:last-of-type {
		margin-bottom: 1.5rem;
	}

	@media (max-width: 800px) {
		.top,
		.ways {
			grid-template-columns: 1fr;
		}
	}
</style>
