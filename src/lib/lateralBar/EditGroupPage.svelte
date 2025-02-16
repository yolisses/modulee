<script lang="ts">
	import { getGraphContext } from '$lib/data/graphContext';
	import { getGroupIdContext } from '$lib/group/groupIdContext';

	const graphContext = getGraphContext();
	const groupContext = getGroupIdContext();

	const group = $derived(graphContext.graph.groups.get(groupContext.groupId));
</script>

<div class="flex flex-col items-stretch gap-2 p-2">
	<label class="flex flex-col">
		Name
		<input
			type="text"
			value={group.name}
			class="rounded border border-white/10 bg-transparent p-2"
		/>
	</label>
</div>
