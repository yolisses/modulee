<script lang="ts">
	import GlobalLayout from '$lib/project/GlobalLayout.svelte';
	import type { Snippet } from 'svelte';
	import '../app.css';
	import '../inputTypeRange.css';
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
