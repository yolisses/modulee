<script>
	import { page } from '$app/state';
	import { getBaseRouteContext } from '$lib/ui/baseRouteContext';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const baseRouteContext = getBaseRouteContext();
</script>

<a class="common-button" href="{baseRouteContext.baseRoute}/externalModules?closePath={page.url}">
	<Fa fw icon={faSearch} />
	Search for external module
</a>
