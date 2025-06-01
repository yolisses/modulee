<script lang="ts">
	import EditUserPage from '$lib/user/EditUserPage.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
</script>

<EditUserPage userData={data.userData} />
