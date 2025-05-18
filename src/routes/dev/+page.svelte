<script lang="ts">
	import DevPage from '$lib/dev/DevPage.svelte';

	const { data } = $props();
</script>

<pre>{JSON.stringify(data.users, null, 2)}</pre>
<DevPage />
