<script>
	import { faWarning } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import GoogleSignInButton from './google/GoogleSignInButton.svelte';
</script>

<div class="flex flex-col gap-2 rounded border-2 border-yellow-500/50 p-2">
	<div class="text-center text-lg font-bold">
		<Fa icon={faWarning} class="inline text-yellow-500" />
		You risk losing access!
	</div>
	<div class="flex flex-col gap-2 sm:flex-row">
		<p>This is a guest account. Sign in for free to keep your projects safe and unlock features.</p>
		<GoogleSignInButton />
	</div>
</div>
