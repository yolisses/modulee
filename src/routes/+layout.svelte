<script lang="ts">
	import GlobalLayout from '$lib/global/GlobalLayout.svelte';
	import type { Snippet } from 'svelte';
	import type { LayoutServerData } from './$types';

	interface Props {
		children: Snippet;
		data: LayoutServerData;
	}

	const { data, children }: Props = $props();
</script>

{#if data.userData}
	<GlobalLayout userData={data.userData}>
		{@render children()}
	</GlobalLayout>
{:else}
	{@render children()}
{/if}
