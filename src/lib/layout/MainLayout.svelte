<script lang="ts">
	import MainNavBar from './MainNavBar.svelte';

	const { children } = $props();
</script>

<div class="h-full flex-1 flex-row">
	<MainNavBar />
	<div class="flex-1">
		{@render children?.()}
	</div>
</div>
