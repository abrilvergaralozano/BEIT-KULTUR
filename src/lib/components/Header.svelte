<script>
	import { page } from '$app/state';
	import { navLinks } from '#lib/nav.js';

	let menuOpen = $state(false);

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header>
	<div class="inner">
		<a href="/" class="logo" onclick={closeMenu}>BEIT KULTUR</a>

		<button
			class="menu-toggle"
			aria-expanded={menuOpen}
			aria-controls="main-menu"
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span class="bars" aria-hidden="true"></span>
			<span class="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
		</button>

		<nav id="main-menu" aria-label="Main menu" class:open={menuOpen}>
			<ul>
				{#each navLinks as link}
					<li>
						<a
							href={link.href}
							aria-current={page.url.pathname === link.href ? 'page' : undefined}
							onclick={closeMenu}>{link.label}</a
						>
					</li>
				{/each}
			</ul>
			<a href="/donate" class="button" onclick={closeMenu}>Donate</a>
		</nav>
	</div>
</header>

<style>
	header {
		background: var(--black);
		border-bottom: 2px solid var(--white);
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.inner {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 1rem var(--gutter);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	ul {
		display: flex;
		gap: 1.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul a {
		color: var(--white);
		font-weight: 700;
		text-decoration: none;
	}

	ul a:hover,
	ul a[aria-current='page'] {
		color: var(--lime);
	}

	/* Hamburger button: hidden on big screens */
	.menu-toggle {
		display: none;
		width: 48px;
		height: 48px;
		background: none;
		border: 2px solid var(--white);
		cursor: pointer;
		position: relative;
	}

	.bars,
	.bars::before,
	.bars::after {
		position: absolute;
		left: 11px;
		width: 22px;
		height: 3px;
		background: var(--white);
		transition: transform 0.2s;
	}

	.bars {
		top: 50%;
		margin-top: -1.5px;
	}

	.bars::before,
	.bars::after {
		content: '';
		left: 0;
	}

	.bars::before {
		top: -7px;
	}

	.bars::after {
		top: 7px;
	}

	/* Turn the bars into an X when open */
	[aria-expanded='true'] .bars {
		background: transparent;
	}

	[aria-expanded='true'] .bars::before {
		transform: translateY(7px) rotate(45deg);
	}

	[aria-expanded='true'] .bars::after {
		transform: translateY(-7px) rotate(-45deg);
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}

	/* Small screens */
	@media (max-width: 1100px) {
		.menu-toggle {
			display: block;
		}

		nav {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			flex-direction: column;
			align-items: flex-start;
			gap: 1.5rem;
			padding: 1.5rem var(--gutter) 2rem;
			background: var(--black);
			border-bottom: 2px solid var(--white);
		}

		nav.open {
			display: flex;
		}

		ul {
			flex-direction: column;
			gap: 1rem;
		}

		ul a {
			font-size: 1.5rem;
		}
	}
</style>
