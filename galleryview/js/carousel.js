let currentIndex = 0;

function showImage(index) {
    let carouselElement = document.getElementById('carousel_items');
    currentIndex = index;
    carouselElement.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function createImageElement(imageData) {
    const [url, name] = imageData;
    const imgElement = document.createElement('img');
    imgElement.src = url;
    imgElement.alt = name;
    imgElement.className = 'w-full h-full object-contain';
    return imgElement;
}

function createCarouselItem(imageData) {
    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item w-full h-full sm:h-48 lg:h-64';
    carouselItem.appendChild(createImageElement(imageData));
    return carouselItem;
}

function populateCarousel(imagesData) {
    let carouselElement = document.getElementById('carousel_items');
    carouselElement.innerHTML = '';
    imagesData.forEach(imageData => {
        const carouselItem = createCarouselItem(imageData);
        carouselElement.appendChild(carouselItem);
    });
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}


function make_carousel(container_id = "carousel_preview") {
    let container = document.getElementById(container_id);

    // create and insert buttons (prev, next)
    container.innerHTML += `
<style>
    .carousel-item {
      flex: 0 0 100%;
      transition: transform 0.3s ease;
    }
</style>

<div class="max-w-xl mx-auto mt-8 relative overflow-hidden">
        <div id="carousel_items" class="flex transition-transform duration-300 ease-in-out overflow-hidden">
        <!-- Carousel items will be dynamically added here -->
        </div>
        <button onclick="prevSlide()" class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full text-white">
        &lt;
        </button>
        <button onclick="nextSlide()" class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full text-white">
        &gt;
        </button>
  </div>
    `;

    populateCarousel(images);

}


function use_carousel() {
    //get height
    gallery.innerHTML = `<div id="gallery_carousel" class="w-full h-full"></div>
    `;

    make_carousel("gallery_carousel");
}
