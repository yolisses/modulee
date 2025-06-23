<script lang="ts">
	import type { ModuleNode } from '$lib/data/ModuleNode.svelte';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		moduleNode: ModuleNode;
	}

	const { moduleNode }: Props = $props();
</script>

<button class="common-button">
	<Fa icon={faTrash} />
	Remove effect
</button>
