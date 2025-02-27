<script lang="ts">
	import { getGroupIdContext } from '$lib/group/groupIdContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';

	const groupIdContext = getGroupIdContext();
	const projectDataContext = getProjectDataContext();

	$effect(() => {
		groupIdContext.groupId = projectDataContext.projectData.mainGroup.id;
	});
</script>
