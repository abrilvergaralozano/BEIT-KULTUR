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

<header>
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
		background: var(--bg);
		border-bottom: 1px solid var(--card-border);
		position: sticky;
		top: 0;
		z-index: 10;
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
	}

	.button[aria-pressed='true'] {
		background: var(--text);
		color: var(--bg);
	}

	.menu-toggle {
		display: none;
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
			background: var(--bg);
			border-bottom: 1px solid var(--card-border);
		}

		nav.open {
			display: flex;
		}

		ul {
			flex-direction: column;
		}

		ul a {
			font-size: 1.375rem;
		}
	}
</style>
