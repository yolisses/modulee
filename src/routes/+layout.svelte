<script lang="ts">
	import HomeSidebar from '$lib/home/HomeSidebar.svelte';
	import GlobalLayout from '$lib/project/GlobalLayout.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-row">
	<HomeSidebar />
	<div class="flex-1">
		<GlobalLayout>
			{@render children()}
		</GlobalLayout>
	</div>
</div>
