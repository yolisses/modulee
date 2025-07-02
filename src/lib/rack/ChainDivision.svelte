<script lang="ts">
	interface Props {
		id: string;
	}

	const { id }: Props = $props();
</script>

<div title="Chain division" class="w-1 rounded bg-white/10" data-sortable-id={id}></div>
