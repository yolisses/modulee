<script>
	import { faWarning } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import GoogleSignInButton from './GoogleSignInButton.svelte';
</script>

<div class="flex flex-col items-center gap-2 rounded border border-yellow-500 p-2">
	<div class="text-lg font-bold">
		<Fa icon={faWarning} class="inline text-yellow-500" />
		You risk losing access!
	</div>
	<div>This is a guest account. Sign in to keep your projects safe and unlock features.</div>
	<GoogleSignInButton loading={false} />
</div>
