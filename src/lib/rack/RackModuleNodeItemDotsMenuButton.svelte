<script lang="ts">
	import type { ModuleNode } from '$lib/data/ModuleNode.svelte';
	import DotsMenuButton from '$lib/ui/DotsMenuButton.svelte';
	import DeleteEffectModuleNodeButton from './DeleteEffectModuleNodeButton.svelte';

	interface Props {
		moduleNode: ModuleNode;
	}

	const { moduleNode }: Props = $props();
</script>

<DotsMenuButton>
	<!-- TODO add move -->
	<DeleteEffectModuleNodeButton {moduleNode} />
</DotsMenuButton>
