<script lang="ts">
	import { page } from '$app/state';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

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
	class="common-button"
	onclick={handleClick}
	href="{baseRouteContext.baseRoute}/externalModules?closePath={page.url}"
>
	<Fa fw icon={faSearch} />
	Search for external module
</a>
