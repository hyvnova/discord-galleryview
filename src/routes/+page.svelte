<script lang="ts">
	import type { ActionData } from './$types';

	import { toast } from '@zerodevx/svelte-toast';

	export let form: ActionData;

	$: if (form) {
		// if form exists, it means that it failed to join a gallery
		toast.push(form.error as string, {
			theme: {
				toast: 'bg-red-100 text-white',
				'--toastBackground': '#EF4444',
				'--toastProgressBackground': 'white'
			},
			dismissable: false,
			duration: 3000
		});
	}
</script>

<div class="container px-8">
	<!-- Discord Bot invite -->
	<div
		class="container mx-auto py-2 my-2 items-center justify-center self-center text-center"
		title="Invite GalleryView bot"
	>
		<a
			href="https://discord.com/api/oauth2/authorize?client_id=1136039549894676490&permissions=124928&scope=bot"
			class=" rounded-lg shadow-md text-white"
		>
			<img src="src\lib\icons\discord.png" alt="Discord logo" class="inline-block h-10 w-10 mr-2" />
		</a>
	</div>

	<!-- Join a gallery -->
	<div class="container mx-auto py-4">
		<h2 class="text-2xl font-bold text-white m-1">Join a gallery</h2>

		<form method="post" action="?/join">
			<div class="flex flex-row">
				<input
					type="text"
					class="w-10/12 rounded-lg shadow-md bg-gray-800 text-white p-2 mt-3 mr-2"
					placeholder="Enter a Discord channel ID"
					name="channel_id"
					required
				/>

				<button
					class="w-1/6 rounded-lg shadow-md bg-gray-800 text-white mt-3 ml-2"
					type="submit"
					name="join_btn">Enter</button
				>
			</div>
		</form>
	</div>

	<!-- Create gallery -->
	<div class="container mx-auto py-4">
		<h2 class="text-2xl font-bold text-white m-1">Create a gallery</h2>

		<!-- Warning about using Discord token to scrap messages-->
		<div
			class="flex flex-row bg-gray-800 text-white p-2 my-3 mr-x justify-center items-center border-red-500 border-2 rounded-lg text-center"
			title="This method to create a gallery uses your Discord token to scrap messages in the specified channel, which is against Discord TOS, the scrapper is tested and as long as you use realtively small number as 100 you should be fine. Use at your own risk."
		>
			<i class="fas fa-exclamation-triangle text-red-500 m-2" />
			<p class="text-sm">
				Warning: Using a Discord token to scrap messages is against the Discord ToS. Use at your own
				risk.
			</p>
		</div>

		<form method="post" action="?/create">
			<input
				type="text"
				class="w-full rounded-lg shadow-md bg-gray-800 text-white p-2 mt-3 mr-2"
				placeholder="Enter authorization (Ex. Discord token, Bot token)"
				name="token"
				required
			/>

			<div class="flex flex-row">
				<input
					type="text"
					class="w-full rounded-lg shadow-md bg-gray-800 text-white p-2 mt-3 mr-2"
					placeholder="Enter a Discord channel ID"
					name="channel_id"
					required
				/>

				<input
					type="number"
					class="w-full rounded-lg shadow-md bg-gray-800 text-white p-2 mt-3 mr-2"
					placeholder="Number of images"
					name="amount"
					value="100"
					required
				/>
			</div>

			<button
				class="w-full rounded-lg shadow-md bg-gray-800 text-white p-2 mt-3"
				id="create-gallery">Create</button
			>
		</form>
	</div>
</div>
