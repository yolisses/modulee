<script lang="ts">
	import { page } from '$app/state';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { baseRouteContextKey } from '$lib/ui/baseRouteContext';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { useExternalModuleInContextKey } from './useExternalModuleInContext';

	interface Props {
		moduleNodeId?: string;
	}

	const { moduleNodeId }: Props = $props();

	const baseRouteContext = getRequiredContext(baseRouteContextKey);
	const useExternalModuleInContext = getRequiredContext(useExternalModuleInContextKey);

	function handleClick() {
		if (moduleNodeId) {
			useExternalModuleInContext.useExternalModuleIn = { type: 'moduleNode', moduleNodeId };
		}
	}
</script>

<a
	class="common-button center-content"
	href="{baseRouteContext.baseRoute}/externalModules?closePath={page.url}"
	onclick={handleClick}
>
	<Fa fw icon={faSearch} />
	Search for external module
</a>
