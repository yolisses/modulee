<script lang="ts">
	import HomeLayout from '$lib/home/HomeLayout.svelte';
	let { children } = $props();
</script>

<HomeLayout>
	{@render children()}
</HomeLayout>
