<script>
	// Prices are decided by the annual meeting, so they stay placeholders.
	const types = [
		{
			value: 'member',
			name: 'Member',
			price: '[PRICE] kr a year',
			who: 'For anyone who supports Beit Kultur.',
			vote: 'Vote at the annual meeting.'
		},
		{
			value: 'reduced',
			name: 'Member, reduced',
			price: '[LOWER PRICE] kr a year',
			who: 'For students, people without a job or with low income.',
			vote: 'Same vote as all members.'
		},
		{
			value: 'organisation',
			name: 'Organisation partner',
			price: '[PRICE] kr a year',
			who: 'For associations, galleries and businesses.',
			vote: '[VOTE: BOARD DECIDES]'
		}
	];

	let chosen = $state('member');
	let sent = $state(false);

	let chosenType = $derived(types.find((type) => type.value === chosen));

	// Test mode: later this saves name, email, type and date to Neon.
	function handleSubmit(event) {
		event.preventDefault();
		sent = true;
	}
</script>

<svelte:head>
	<title>Become a member – Beit Kultur</title>
</svelte:head>

<h1>Become a member</h1>
<p class="intro">Members support artists from the global majority.</p>
<p class="intro">As a member you get our newsletter and a vote at our annual meeting.</p>
<p>
	Membership is for one calendar year. If you join in November or December, it also covers the
	whole next year.
</p>

{#if sent}
	<p class="notice section" role="status">
		Thank you for joining as {chosenType.name}! Test mode: your details are not saved yet.
	</p>
{:else}
	<form onsubmit={handleSubmit}>
		<fieldset class="section">
			<legend><h2>Step 1: Choose your membership</h2></legend>

			<div class="grid">
				{#each types as type}
					<label class="card type" class:chosen={chosen === type.value}>
						<span class="radio-row">
							<input type="radio" name="type" value={type.value} bind:group={chosen} />
							<span class="type-name">{type.name}</span>
						</span>
						<span class="price">{type.price}</span>
						<span>{type.who}</span>
						<span class="vote"><strong>Vote:</strong> {type.vote}</span>
					</label>
				{/each}
			</div>

			<p class="no-proof">You decide which price fits you. We don't ask for proof.</p>
		</fieldset>

		<fieldset class="section details">
			<legend><h2>Step 2: Your details</h2></legend>

			<p class="box you-chose" aria-live="polite">
				You chose: <strong>{chosenType.name}, {chosenType.price}</strong>
			</p>

			<label for="name">
				{chosen === 'organisation' ? 'Organisation name and contact person' : 'Name'} (required)
			</label>
			<input id="name" name="name" type="text" autocomplete="name" required />

			<label for="email">Email (required)</label>
			<input id="email" name="email" type="email" autocomplete="email" required />

			<div class="consent">
				<input id="consent" name="consent" type="checkbox" required />
				<label for="consent">
					I agree that Beit Kultur saves my name and email in the member register. (required)
				</label>
			</div>
			<p class="privacy-link"><a href="/privacy" class="link">Read about privacy</a></p>

			<button type="submit" class="button">Join (test mode)</button>
		</fieldset>
	</form>
{/if}

<section class="section box pay">
	<h2>Step 3: Pay</h2>
	<p>After you join, you get an email with how to pay.</p>
	<dl>
		<dt>Swish</dt>
		<dd>[SWISH NUMBER]</dd>
		<dt>Bankgiro</dt>
		<dd>[BANKGIRO NUMBER]</dd>
	</dl>
	<p>Write your name as the message.</p>
	<p>When the board sees your payment, you are a member.</p>
</section>

<div class="section end">
	<p>Want to give every month instead? <a href="/donate" class="link">Give monthly on the Donate page.</a></p>
	<p>
		Already a member and want to renew?
		<a href="/about?topic=member#contact" class="link">Contact us.</a>
	</p>
</div>

<style>
	fieldset {
		border: 0;
		margin-left: 0;
		margin-right: 0;
		padding: 0;
	}

	legend {
		padding: 0;
	}

	legend h2 {
		margin-bottom: 1.5rem;
	}

	/* Each card is a big label, so the whole card can be clicked */
	.type {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 0;
		padding: 1.5rem;
		font-weight: 400;
		cursor: pointer;
		border-width: 2px;
	}

	.type.chosen {
		border-color: var(--text);
		background: var(--box);
	}

	.type:has(input:focus-visible) {
		outline: 3px solid var(--text);
		outline-offset: 3px;
	}

	.radio-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.type-name {
		font-family: var(--font-heading);
		font-weight: 800;
		font-size: 1.375rem;
	}

	.price {
		font-size: 1.25rem;
		font-weight: 700;
	}

	.no-proof {
		margin-top: 1.5rem;
		font-weight: 700;
	}

	.details {
		max-width: 40rem;
		margin-inline: auto;
	}

	.you-chose {
		padding: 1rem 1.25rem;
	}

	.consent {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.consent input {
		margin-top: 0.15rem;
	}

	.consent label {
		margin: 0;
	}

	.privacy-link {
		margin: 0.25rem 0 1.5rem 2.25rem;
	}

	.pay {
		max-width: 40rem;
		margin-inline: auto;
	}

	.pay dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.25rem 1.5rem;
		margin: 0 0 1.25rem;
	}

	dt {
		font-weight: 700;
	}

	dd {
		margin: 0;
	}

	.pay p:last-child,
	.end p:last-child {
		margin-bottom: 0;
	}
</style>
