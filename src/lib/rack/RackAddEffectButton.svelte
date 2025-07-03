<script lang="ts">
	import { page } from '$app/state';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		internalModuleId: string;
	}

	const { internalModuleId }: Props = $props();
	const baseRouteContext = getRequiredContext(baseRouteContextKey);
	const useExternalModuleInContext = getRequiredContext(useExternalModuleInContextKey);

	function handleClick() {
		useExternalModuleInContext.useExternalModuleIn = { type: 'rack', internalModuleId };
	}
</script>

<a
	onclick={handleClick}
	class="common-button"
	href="{baseRouteContext.baseRoute}/externalModules/effects?closePath={page.url}"
>
	<Fa fw icon={faPlus} />
	Add effect
</a>
