<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import AboutText from './AboutText.svelte';
	import PrettyText from './PrettyText.svelte';
</script>

<ListPageLayout title="About">
	<PrettyText>
		<AboutText />
	</PrettyText>
</ListPageLayout>
