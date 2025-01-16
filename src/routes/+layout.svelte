<script lang="ts">
	import MainLayout from '$lib/layout/MainLayout.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<MainLayout>
	{@render children()}
</MainLayout>
