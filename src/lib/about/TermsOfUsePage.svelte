<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import TermsOfUseText from './TermsOfUseText.svelte';
</script>

<ListPageLayout title="Terms of Use" showCloseButton>
	<div class="pretty">
		<TermsOfUseText />
	</div>
</ListPageLayout>
