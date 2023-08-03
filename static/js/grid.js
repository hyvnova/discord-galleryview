function make_grid(grid_id = "grid_preview") {
	let grid = document.getElementById(grid_id);

	// set grid columns
	let grid_columns = document.getElementById("grid_columns").value;

	grid.style.gridTemplateColumns = `repeat(${grid_columns}, 1fr)`;

	grid.innerHTML = "";
	images.forEach((image) => {
		grid.innerHTML += `
        <div class="w-full md:p-1">
            <img alt="${image[1]}"
                class="block h-full w-full rounded-lg object-cover object-center"
                src="${image[0]}" alt="${image[1]}" loading="lazy" name="${image[1]}"
                onclick="showModal('${image[0]}', '${image[1]}')"    
            />
        </div>
        `;
	});

	// save grid columns to local storage
	localStorage.setItem("grid_columns", grid_columns);
}

// Create and set grid
function use_grid() {
	// Get grid columns
	let grid_columns = localStorage.getItem("grid_columns") ? localStorage.getItem("grid_columns") : document.getElementById("grid_columns").value;

	// Create grid
	gallery.innerHTML = `
  <div id="gallery_grid" class="grid grid-cols-${grid_columns} gap-1 w-full h-auto px-8 py-6">
  </div>
  `;

	// Fill grid
	make_grid("gallery_grid");
}
