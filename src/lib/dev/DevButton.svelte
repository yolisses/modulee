<script lang="ts">
	import { graphContextKey, setGraphContext } from '$lib/graph/graphContext';
	import { SelectedAllNodesActionCommand } from '$lib/node/actionCommands/SelectedAllNodesActionCommand';
	import { Contexts } from '$lib/shortcut/Contexts.svelte';

	interface Props {
		contexts: Contexts;
	}

	const { contexts }: Props = $props();

	setGraphContext({ graph: {} });

	contexts.get(graphContextKey)(graphContextKey);

	function handleClick() {
		const command = new SelectedAllNodesActionCommand();
		command.execute(contexts);
	}
</script>

<button onclick={handleClick}>click me</button>
