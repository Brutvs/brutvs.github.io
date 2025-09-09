// Fetch a new image from the backend when the page loads
window.onload = function() {
    fetch("http://localhost:3268")
      .then(response => response.json())
      .then(data => {
        const body = document.body;
        // Make sure to add quotes around the URL
        body.style.backgroundImage = `url('${data.url}')`;
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';
      })
      .catch(error => {
        console.error("Error fetching image:", error);
        // Optional: Set a fallback background image in case of error
      });
};