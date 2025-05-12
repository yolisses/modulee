<script lang="ts">
	import { Vector } from 'nodes-editor';
	import type { Node } from './DevNode.svelte';
	import { nodeSize } from './devNodeSize';

	interface Props {
		node: Node;
		minPosition: Vector;
	}

	const { node, minPosition }: Props = $props();

	let initialNodePosition: Vector;
	let initialMousePosition: Vector;
	let isMoving = $state(false);
	let pointerId: number;
	let element: HTMLElement;

	function handlePointerDown(e: PointerEvent) {
		pointerId = e.pointerId;
		element.setPointerCapture(pointerId);

		initialNodePosition = node.position.clone();
		initialMousePosition = new Vector(e.clientX, e.clientY);
		isMoving = true;
	}

	function handlePointerUp(e: PointerEvent) {
		isMoving = false;
		element.releasePointerCapture(pointerId);
	}

	function handlePointerMove(e: PointerEvent) {
		const step = 10;
		const mousePosition = new Vector(e.clientX, e.clientY);
		node.position = mousePosition
			.subtract(initialMousePosition)
			.add(initialNodePosition)
			.divideByNumber(step)
			.floor()
			.multiplyByNumber(step);
	}
</script>

<div
	onpointerdown={handlePointerDown}
	onpointerup={isMoving ? handlePointerUp : undefined}
	onpointermove={isMoving ? handlePointerMove : undefined}
	style:top={node.position.y - minPosition.y + 'px'}
	style:left={node.position.x - minPosition.x + 'px'}
	style:width={nodeSize + 'px'}
	style:height={nodeSize + 'px'}
	class="absolute bg-amber-500 select-none"
	bind:this={element}
>
	Node
</div>
