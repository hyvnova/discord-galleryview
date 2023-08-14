import { writable } from 'svelte/store';
import { browser } from '$app/environment';



const initial_value = browser ? localStorage.getItem('image_height') || "100" : "100";
const image_height = writable(initial_value);

image_height.subscribe((value) => {
    if (browser) {
        localStorage.setItem('image_height', value);
    }
});
    
export default image_height;
