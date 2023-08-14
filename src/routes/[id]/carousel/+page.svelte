<script lang="ts">
	// @ts-nocheck
	// Carousel library is not typed

	import type { LayoutServerData } from './$types';
	import { browser } from '$app/environment';

	// access parent layout server data
	export let data: LayoutServerData;
	let { images_data } = data;

	import Image from '$lib/components/Image.svelte';

	import Carousel from 'svelte-carousel';
	let carousel;

	import carousel_particles from '$lib/stores/carousel_particles';

	function on_key_down(event: KeyboardEvent) {
		console.log(event.key);
		if (event.key === 'ArrowRight') {
			carousel.goToNext({ animated: true });
		} else if (event.key === 'ArrowLeft') {
			carousel.goToPrev({ animated: true });
		}
	}
</script>

<svelte:window on:keydown={on_key_down} />
{#key $carousel_particles}
	{#if browser}
		<Carousel bind:this={carousel} particlesToShow={$carousel_particles}>
			{#each images_data as image}
				<div class="container mx-auto w-auto max-h-[80vh]">
					<Image {image} style="max-height: 80vh; max-width: 100%; object-fit: contain;" />
				</div>
			{/each}
		</Carousel>
	{/if}
{/key}
