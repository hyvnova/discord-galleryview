<script lang="ts">
	import type { LayoutServerData } from './$types';

	// access parent layout server data
	export let data: LayoutServerData;
	let { images_data } = data;

	// get image heigh from store
	import image_height from '$lib/stores/image_height';
	import Image from '$lib/components/Image.svelte';
</script>

<!-- Gallery Display -->
<div class="container mt-2">
	<div class="flex flex-col justify-center items-center w-10/12 h-full mx-auto">
		{#each images_data as image}
			<div class="container md:p-1 max-h-96 self-center mx-auto my-8">
				<Image {image} style="max-height: {$image_height}vh; max-width: 100%; mx-auto" />
			</div>
		{/each}
	</div>
</div>
