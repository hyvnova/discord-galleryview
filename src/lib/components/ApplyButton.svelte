<script lang="ts">
    export let on_click: () => void;
</script>

<!-- Apply button -->
<div class="flex flex-row justify-center items-center w-1/4 self-center">
    <button
        id="list_apply_button"
        class="rounded-lg shadow-md bg-gray-800 text-white max-w-md max-h-28 select-none"
        on:click={on_click}
    >
        <i class="fas fa-list ml-2" />
        Apply
    </button>
</div>