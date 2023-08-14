import { writable } from 'svelte/store';
import { browser } from '$app/environment';



const initial_value = browser ? localStorage.getItem('grid_columns') || "5" : "5";
const grid_columns = writable(initial_value);

grid_columns.subscribe((value) => {
    if (browser) {
        localStorage.setItem('grid_columns', value);
    }
});
    
export default grid_columns;
