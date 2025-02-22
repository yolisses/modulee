<script lang="ts">
	import { getGroupIdContext } from '$lib/group/groupIdContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';

	const groupIdContext = getGroupIdContext();
	const projectDataContext = getProjectDataContext();

	$effect(() => {
		const { projectData } = projectDataContext;
		if (!projectData) return;
		groupIdContext.groupId = projectData.mainGroup.id;
	});
</script>
