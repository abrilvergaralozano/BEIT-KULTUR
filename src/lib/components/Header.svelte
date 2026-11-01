<script>
	import { page } from '$app/state';
	import { navLinks } from '#lib/nav.js';

	let { isVolunteer = false } = $props();
	let menuOpen = $state(false);
	let easyRead = $state(false);

	// app.html may already have turned Easy read on
	$effect(() => {
		easyRead = document.documentElement.dataset.easyRead === 'on';
	});

	function toggleEasyRead() {
		easyRead = !easyRead;
		if (easyRead) {
			document.documentElement.dataset.easyRead = 'on';
		} else {
			delete document.documentElement.dataset.easyRead;
		}
		try {
			localStorage.setItem('easy-read', easyRead ? 'on' : 'off');
		} catch (e) {}
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header class:volunteer={isVolunteer}>
	<div class="inner">
		<a href="/" class="logo" onclick={closeMenu}><span>BEIT</span><span>KULTUR</span></a>

		<nav id="main-menu" aria-label="Main menu" class:open={menuOpen}>
			<ul>
				{#each navLinks as link}
					<li>
						<a
							href={link.href}
							aria-current={page.url.pathname.startsWith(link.href) ? 'page' : undefined}
							onclick={closeMenu}>{link.label}</a
						>
					</li>
				{/each}
				{#if isVolunteer}
					<li><a href="/news#add-post" onclick={closeMenu}>Add a post</a></li>
				{/if}
			</ul>
			<button type="button" class="button button-second" aria-pressed={easyRead} onclick={toggleEasyRead}>
				Easy read
			</button>
			{#if isVolunteer}
				<form method="POST" action="/logout" class="logout-form">
					<button type="submit" class="button button-second">Sign out</button>
				</form>
			{/if}
		</nav>

		<a href="/donate" class="button donate" onclick={closeMenu}>Donate</a>

		<!-- Only shown on phones -->
		<button
			type="button"
			class="button button-second menu-toggle"
			aria-expanded={menuOpen}
			aria-controls="main-menu"
			onclick={() => (menuOpen = !menuOpen)}
		>
			{menuOpen ? 'Close' : 'Menu'}
		</button>
	</div>
</header>

<style>
	header {
		background: var(--chrome);
		border-bottom: 1px solid var(--chrome);
		position: sticky;
		top: 0;
		z-index: 10;
		font-size: 0.9rem;
	}

	header .logo {
		font-size: 1.8rem;
	}

	ul a {
		color: var(--bg);
	}

	.inner {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 0.75rem var(--gutter);
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-left: auto;
	}

	.logout-form {
		margin: 0;
	}

	ul {
		display: flex;
		gap: 0.25rem 1.25rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		text-decoration: none;
	}

	ul a:hover,
	ul a[aria-current='page'] {
		text-decoration: underline;
		text-decoration-thickness: 2px;
	}

	/* Smaller buttons in the header */
	.button {
		padding: 8px 16px;
		font-size: 0.9rem;
	}

	.button[aria-pressed='true'] {
		background: var(--text);
		color: var(--bg);
	}

	.menu-toggle {
		display: none;
	}

	@media (max-width: 1450px) {
		header.volunteer .donate {
			margin-left: auto;
		}

		header.volunteer .menu-toggle {
			display: inline-flex;
		}

		header.volunteer nav {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
			margin: 0;
			padding: 1rem var(--gutter) 1.5rem;
			background: var(--chrome);
			border-bottom: 1px solid var(--chrome);
		}

		header.volunteer nav.open {
			display: flex;
		}

		header.volunteer ul {
			flex-direction: column;
		}

		header.volunteer ul a {
			font-size: 1.1rem;
		}
	}

	/* Phone: logo · Donate · Menu. The links open in a list below. */
	@media (max-width: 1100px) {
		.donate {
			margin-left: auto;
		}

		.menu-toggle {
			display: inline-flex;
		}

		nav {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
			margin: 0;
			padding: 1rem var(--gutter) 1.5rem;
			background: var(--chrome);
			border-bottom: 1px solid var(--chrome);
		}

		nav.open {
			display: flex;
		}

		ul {
			flex-direction: column;
		}

		ul a {
			font-size: 1.1rem;
		}
	}

	@media (max-width: 600px) {
		header .logo {
			font-size: 1.4rem;
		}
	}

	@media (max-width: 400px) {
		.inner {
			gap: 0.75rem;
		}

		header .logo {
			font-size: 1.2rem;
		}

		.donate,
		.menu-toggle {
			padding: 6px 10px;
			font-size: 0.8rem;
		}
	}

	@media (max-width: 320px) {
		.inner {
			gap: 0.25rem;
		}

		header .logo {
			font-size: 1rem;
		}

		.donate,
		.menu-toggle {
			padding: 4px 6px;
			font-size: 0.7rem;
		}
	}
</style>
