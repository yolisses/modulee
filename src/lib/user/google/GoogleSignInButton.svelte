<script lang="ts">
	import { getHasJuceSupport } from '$lib/audio/getHasJuceSupport';
	import { onMount } from 'svelte';
	import JuceGoogleSignInButton from './JuceGoogleSignInButton.svelte';
	import WebGoogleSignInButton from './WebGoogleSignInButton.svelte';

	let loading = $state(false);
	let haveJuceSuport = $state<boolean>();

	onMount(() => {
		haveJuceSuport = getHasJuceSupport();
	});
</script>

<div class="flex min-w-56 shrink-0 flex-col items-center">
	{#if loading || haveJuceSuport === undefined}
		<div
			class="flex h-10 w-52 cursor-pointer flex-row items-center justify-center gap-2 rounded bg-blue-600 p-0.5 pr-4 transition-colors duration-100 hover:bg-blue-500"
		></div>
	{:else if haveJuceSuport}
		<JuceGoogleSignInButton bind:loading />
	{:else}
		<WebGoogleSignInButton bind:loading />
	{/if}
</div>
