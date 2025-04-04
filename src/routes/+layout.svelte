<script lang="ts">
	import { setUserDataContext } from '$lib/account/userDataContext';
	import GlobalLayout from '$lib/project/GlobalLayout.svelte';
	import type { Snippet } from 'svelte';
	import '../app.css';
	import type { LayoutServerData } from './$types';

	interface Props {
		children: Snippet;
		data: LayoutServerData;
	}

	const { data, children }: Props = $props();
	const userDataContext = $state({ userData: data.userData });
	setUserDataContext(userDataContext);
</script>

<GlobalLayout>
	{@render children()}
</GlobalLayout>
