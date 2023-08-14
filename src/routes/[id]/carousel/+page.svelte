<script lang="ts">
	import type { LayoutServerData } from './$types';
	import { browser } from '$app/environment';

	// access parent layout server data
	export let data: LayoutServerData;
	let { images_data } = data;

	import Image from '$lib/components/Image.svelte';

	// @ts-ignore
	import Carousel from 'svelte-carousel';
	let carousel;

	import carousel_particles from '$lib/stores/carousel_particles';
</script>

{#if browser}
	<Carousel bind:this={carousel} particlesToShow={$carousel_particles}>
		{#each images_data as image}
			<!-- Images should be completely visible within the screen without scrolling while mantaining aspect ratio -->
			<div class="container mx-auto w-auto max-h-[80vh]">
                <Image {image} style="max-height: 80vh; max-width: 100%; object-fit: contain;" />
            </div>
		{/each}
	</Carousel>
{/if}
