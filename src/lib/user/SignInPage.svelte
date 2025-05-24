<script lang="ts">
	import { getHaveJuceSupport } from '$lib/engine/getHaveJuceSupport';
	import Spinner from '$lib/ui/Spinner.svelte';
	import GoogleSignInButton from './GoogleSignInButton.svelte';
	import JuceGoogleSignInButton from './JuceGoogleSignInButton.svelte';

	let loading = $state(false);
</script>

<div class="flex min-h-[100dvh] flex-col items-center">
	<div class="flex w-full max-w-xl flex-1 flex-col gap-4 p-4">
		<div class="flex h-10 flex-row items-center justify-between gap-2">
			<h1 class="pl-2 text-xl font-medium">Sign in</h1>
		</div>
		<div class="flex flex-1 items-center justify-center">
			{#if loading}
				<Spinner size={36} />
			{:else if getHaveJuceSupport()}
				<JuceGoogleSignInButton bind:loading />
			{:else}
				<GoogleSignInButton bind:loading />
			{/if}
		</div>
		<div class="h-10"></div>
	</div>
</div>
