<script lang="ts">
	import GoogleLogo from './GoogleLogo.svelte';

	interface Props {
		loading: boolean;
	}

	let { loading = $bindable() }: Props = $props();
</script>

<div
	class="flex cursor-pointer flex-row items-center gap-2 rounded bg-blue-800 p-0.5 pr-4 transition-colors duration-100 hover:bg-blue-600"
>
	<div class="h-9 w-9 rounded-l bg-white p-2.5">
		<GoogleLogo />
	</div>
	<div>Sign in with Google</div>
</div>
