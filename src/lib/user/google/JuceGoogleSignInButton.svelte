<script lang="ts">
	import { getGoogleAuthUrl } from './getGoogleAuthUrl';
	import GoogleLogo from './GoogleLogo.svelte';

	interface Props {
		loading: boolean;
	}

	let { loading = $bindable() }: Props = $props();

	function handleClick() {
		const googleAuthUrl = getGoogleAuthUrl();
		window.__JUCE__?.backend.emitEvent('openUrl', { url: googleAuthUrl });
	}
</script>

<button
	onclick={handleClick}
	class="flex cursor-pointer flex-row items-center gap-2 rounded bg-blue-800 p-0.5 pr-4 transition-colors duration-100 hover:bg-blue-600"
>
	<div class="h-9 w-9 rounded-l bg-white p-2.5">
		<GoogleLogo />
	</div>
	<div>Sign in with Google</div>
</button>
