<script lang="ts">
	import type { LayoutServerData } from './$types';

	// access parent layout server data
	export let data: LayoutServerData;
	let { images_data } = data;

	import grid_columns from '$lib/stores/grid_columns';
	import Image from '$lib/components/Image.svelte';
</script>

<!-- Grid Display -->
<div
	class="grid gap-4 w-full h-full px-4 py-2"
	style="grid-template-columns: repeat({$grid_columns}, 1fr);"
>
	{#each images_data as image}
		<div class="container md:p-1 max-h-96 self-center mx-auto my-2">
			<Image {image} class_name="block h-full w-full rounded-lg object-cover object-center" />
		</div>
	{/each}
</div>
