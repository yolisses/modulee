<script lang="ts">
	import Tab from './Tab.svelte';
</script>

<div class="flex flex-row overflow-auto border-b border-black">
	<Tab tab={'internalModule'}>InternalModule</Tab>
	<Tab tab={'internalModules'}>InternalModules</Tab>
	<Tab tab={'project'}>Project</Tab>
</div>
