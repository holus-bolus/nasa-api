document.addEventListener('DOMContentLoaded', function() {
	const photosContainer = document.getElementById('photos');
	const prevButton = document.getElementById('prev-button');
	const nextButton = document.getElementById('next-button');
	let currentIndex = 0;
	let roverPhotos = [];

	// Fetch photos from the NASA Mars Rover API
	const apiKey = 'XVyuXuPmbuR9od918DbjlrRSFgGZzbWw9EDqGjRe';
	const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=${apiKey}`;

	// Fetch the photos and store them in an array
	fetch(apiUrl)
		.then(response => response.json())
		.then(data => {
			roverPhotos = data.photos;
			displayPhoto(currentIndex);
		})
		.catch(error => console.error(error));

	function displayPhoto(index) {
		// Clear previous photo
		photosContainer.innerHTML = '';

		const photo = roverPhotos[index];
		const img = document.createElement('img');
		img.src = photo.img_src;
		img.alt = 'Mars Rover Photo';
		img.classList.add('rover-photo');
		photosContainer.appendChild(img);
	}

	function showPreviousPhoto() {
		if (currentIndex === 0) {
			currentIndex = roverPhotos.length - 1;
		} else {
			currentIndex--;
		}
		displayPhoto(currentIndex);
	}

	function showNextPhoto() {
		if (currentIndex === roverPhotos.length - 1) {
			currentIndex = 0;
		} else {
			currentIndex++;
		}
		displayPhoto(currentIndex);
	}

	prevButton.addEventListener('click', showPreviousPhoto);
	nextButton.addEventListener('click', showNextPhoto);
});
