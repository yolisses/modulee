<script lang="ts">
	import { getHaveJuceSupport } from '$lib/engine/getHaveJuceSupport';
	import Spinner from '$lib/ui/Spinner.svelte';
	import { onMount } from 'svelte';
	import JuceGoogleSignInButton from './JuceGoogleSignInButton.svelte';
	import WebGoogleSignInButton from './WebGoogleSignInButton.svelte';

	let loading = $state(false);
	let haveJuceSuport = $state<boolean>();

	onMount(() => {
		haveJuceSuport = getHaveJuceSupport();
	});
</script>

<div class="flex w-56 shrink-0 flex-col items-center">
	{#if loading || haveJuceSuport === undefined}
		<Spinner size={36} />
	{:else if haveJuceSuport}
		<JuceGoogleSignInButton bind:loading />
	{:else}
		<WebGoogleSignInButton bind:loading />
	{/if}
</div>
