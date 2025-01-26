<script lang="ts">
	interface Props {
		instrumentsData: InsturmentData[];
	}

	const { instrumentsData }: Props = $props();
</script>

{#each instrumentsData as instrumentData (instrumentData.id)}{/each}
