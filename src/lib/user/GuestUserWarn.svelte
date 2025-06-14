<script>
	import { faWarning } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import WebGoogleSignInButton from './WebGoogleSignInButton.svelte';
</script>

<div class="flex flex-col gap-2 rounded border border-yellow-500 p-2">
	<div class="text-center text-lg font-bold">
		<Fa icon={faWarning} class="inline text-yellow-500" />
		You risk losing access!
	</div>
	<div class="flex flex-row">
		<div>This is a guest account. Sign in to keep your projects safe and unlock features.</div>
		<WebGoogleSignInButton loading={false} />
	</div>
</div>
