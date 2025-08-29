<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import TermlyLogo from './TermlyLogo.svelte';
	import TermsOfUseText from './TermsOfUseText.svelte';
</script>

<ListPageLayout title="Privacy Policy" showCloseButton>
	<TermlyLogo />
	<div class="pretty">
		<TermsOfUseText />
	</div>
</ListPageLayout>
