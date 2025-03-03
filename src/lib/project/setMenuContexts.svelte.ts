import { setIsLateralBarVisibleContext } from '$lib/lateralBar/isLateralBarVisibleContext';
import { setSelectedTabContext } from '$lib/lateralBar/selectedTabContext';

export function setMenuContexts() {
	const isLateralBarVisibleContext = $state({ isLateralBarVisible: false });
	setIsLateralBarVisibleContext(isLateralBarVisibleContext);

	const selectedTabContext = $state({ selectedTab: 'group' });
	setSelectedTabContext(selectedTabContext);
}
