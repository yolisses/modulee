<script lang="ts">
	import GlobalLayout from '$lib/project/GlobalLayout.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<GlobalLayout>
	{@render children()}
</GlobalLayout>
