<script lang="ts">
	import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let name: string;
	export let icon: IconDefinition;
	export let on_click: () => void;
</script>

<div class="flex flex-row justify-center items-center m-2 w-full">
	<button class="rounded-lg shadow-md bg-gray-800 text-white" on:click={on_click}>
		<Fa {icon} class="ml-2 inline" />
		{name}
	</button>
</div>
