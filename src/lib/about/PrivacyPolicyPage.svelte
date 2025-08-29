<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import PrivacyPolicyText from './PrivacyPolicyText.svelte';
	import TermlyLogo from './TermlyLogo.svelte';
</script>

<ListPageLayout title="Privacy Policy" showCloseButton>
	<TermlyLogo />
	<div class="pretty">
		<PrivacyPolicyText />
	</div>
</ListPageLayout>
