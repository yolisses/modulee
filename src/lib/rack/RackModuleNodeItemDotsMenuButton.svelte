<script lang="ts">
	import type { ModuleNode } from '$lib/data/ModuleNode.svelte';
	import DotsMenuButton from '$lib/ui/DotsMenuButton.svelte';
	import RemoveEffectModuleNodeButton from './RemoveEffectModuleNodeButton.svelte';

	interface Props {
		moduleNode: ModuleNode;
	}

	const { moduleNode }: Props = $props();
</script>

<DotsMenuButton>
	<!-- TODO add move -->
	<RemoveEffectModuleNodeButton {moduleNode} />
</DotsMenuButton>
