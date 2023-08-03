function make_list(container_id = "list_preview", height = null) {
	let container = document.getElementById(container_id);

	let image_height = height ? height : document.getElementById("list_image_height").value + "vh";

	container.innerHTML = "";

	images.forEach((image) => {
		container.innerHTML += `
          <div class="w-auto md:p-1 justify-center items-center m-1">
              <img alt="${image[1]}"
                  class="w-auto rounded-lg"
                  src="${image[0]}" alt="${image[1]}" loading="lazy" name="${image[1]}"
                  onclick="showModal('${image[0]}', '${image[1]}')"
				  style="height: ${image_height};"    
              />
          </div>
          `;
	});


	// save height 
	localStorage.setItem("list_image_height", height);
}

function use_list() {
	//get height
	let height = localStorage.getItem("list_image_height") ? localStorage.getItem("list_image_height") : `${document.getElementById("list_image_height").value}%`;

	gallery.innerHTML = `<div class="container mt-2"><div id="gallery_list" class="flex flex-col justify-center items-center  w-10/12 h-full mx-auto">
    </div></div>`;

	make_list("gallery_list", height);
}
