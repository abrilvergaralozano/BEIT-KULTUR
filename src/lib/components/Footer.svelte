<script>
	import { navLinks } from '#lib/nav.js';
</script>

<footer>
	<div class="inner">
		<a href="/" class="logo">BEIT KULTUR</a>

		<nav aria-label="Footer menu">
			<ul>
				{#each navLinks as link}
					<li><a href={link.href}>{link.label}</a></li>
				{/each}
			</ul>
		</nav>

		<a href="/donate" class="button">Donate</a>
	</div>
</footer>

<style>
	footer {
		border-top: 2px solid var(--white);
	}

	.inner {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 3rem var(--gutter);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 1.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul a {
		color: var(--white);
		font-weight: 700;
		text-decoration: none;
	}

	ul a:hover {
		color: var(--lime);
	}

	@media (max-width: 700px) {
		.inner {
			flex-direction: column;
			align-items: flex-start;
		}

		ul {
			flex-direction: column;
		}
	}
</style>
