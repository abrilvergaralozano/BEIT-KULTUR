<script>
	import { navLinks } from '#lib/nav.js';
</script>

<footer>
	<div class="inner">
		<div class="top">
			<a href="/" class="logo"><span>BEIT</span><span>KULTUR</span></a>

			<nav aria-label="Footer menu">
				<ul>
					{#each navLinks as link}
						<li><a href={link.href}>{link.label}</a></li>
					{/each}
				</ul>
			</nav>

			<a href="/donate" class="button donate">Donate</a>
		</div>

		<div class="bottom">
			<p>Beit Kultur · non-profit cultural association · Stockholm</p>
			<ul>
				<li><a href="/privacy">Privacy</a></li>
				<li><a href="/about#contact">Contact us</a></li>
				<li><a href="/login">Volunteer login</a></li>
			</ul>
		</div>
	</div>
</footer>

<style>
	footer {
		background: var(--chrome);
		color: var(--bg);
		font-size: 0.9rem;
	}

	footer .logo {
		font-size: 1.8rem;
	}

	footer .button {
		font-size: 0.9rem;
	}

	.inner {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 3rem var(--gutter) 2rem;
	}

	.top,
	.bottom {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem 2rem;
	}

	.bottom {
		border-top: 1px solid var(--muted);
		margin-top: 2.5rem;
		padding-top: 1.5rem;
	}

	.bottom p {
		margin: 0;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0 1.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		color: var(--bg);
	}

	nav ul a {
		text-decoration: none;
	}

	nav ul a:hover {
		text-decoration: underline;
	}

	/* A dark outline would not show on the dark footer */
	footer a:focus-visible {
		outline-color: var(--lime);
	}

	@media (max-width: 700px) {
		.top,
		.bottom {
			flex-direction: column;
			align-items: flex-start;
		}

		nav ul {
			flex-direction: column;
		}
	}

	@media (max-width: 600px) {
		footer .logo {
			font-size: 1.4rem;
		}
	}
</style>
