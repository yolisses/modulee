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

<GlobalLayout userData={data.userData}>
	{@render children()}
</GlobalLayout>
