import { writable } from 'svelte/store';
import { browser } from '$app/environment';



const initial_value = browser ? localStorage.getItem('carousel_particles') || "1" : "1";
const carousel_particles = writable(initial_value);

carousel_particles.subscribe((value) => {
    if (browser) {
        localStorage.setItem('carousel_particles', value);
    }
});
    
export default carousel_particles;
