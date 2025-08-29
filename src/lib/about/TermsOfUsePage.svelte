<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import TermsOfUseText from './TermsOfUseText.svelte';
	import PrettyText from './PrettyText.svelte';
	import TermlyLogo from './TermlyLogo.svelte';
</script>

<ListPageLayout title="Privacy Policy" showCloseButton>
	<TermlyLogo />
	<PrettyText>
		<TermsOfUseText />
	</PrettyText>
</ListPageLayout>
