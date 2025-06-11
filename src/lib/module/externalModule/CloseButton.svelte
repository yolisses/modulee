<script lang="ts">
	import { page } from '$app/state';
	import { faTimes } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const closePath = $derived(page.url.searchParams.get('closePath'));
</script>

{#if closePath}
	<a href={closePath} class="common-button">
		<Fa icon={faTimes} />
		Close
	</a>
{/if}
