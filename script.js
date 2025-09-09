// Fetch the image URL from your backend
fetch("http://localhost:3268")
  .then(response => response.json())
  .then(data => {
    const img = document.getElementById("unsplash-image");
    img.src = data.url; // Set the image source
  })
  .catch(error => {
    console.error("Error fetching image:", error);
    // Optional: Set a fallback image
    document.getElementById("unsplash-image").src = "default.jpg";
  });

// Update the image every 5 seconds
setInterval(() => {
  fetch("http://localhost:3268")
    .then(response => response.json())
    .then(data => {
      document.getElementById("unsplash-image").src = data.url;
    });
}, 5000);