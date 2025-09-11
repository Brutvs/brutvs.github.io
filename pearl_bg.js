// Once page loads, display random Unsplash img from pearl server
window.onload = function () {
  // trailing slash = root
  fetch('http://localhost:3268/')
    .then(response => {
      // Check HTTP status
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json(); // Parse the JSON body
    })
    .then(data => {
      // -------------------------------------------------
      // DEBUG SHIT
      // -------------------------------------------------
      console.log('Fetched URL:', data.url);

      // -------------------------------------------------
      // APPLY IMG
      // -------------------------------------------------
      if (!data.url) {
        throw new Error('Response did not contain a "url" field');
      }

      const body = document.body;
      body.style.backgroundImage = `url('${data.url.trim()}')`;
      body.style.backgroundSize = 'cover';
      body.style.backgroundPosition = 'center';
      body.style.backgroundRepeat = 'no-repeat';
    })
    .catch(error => {
      // -------------------------------------------------
      // ERROR MESSAGE
      // -------------------------------------------------
      console.error('Error fetching image:', error);
      const body = document.body;
      body.style.backgroundColor = '#ffffff';
      body.textContent = 'It's fucked, mate. &#x1F49C;';
      body.style.color = '#333';
      body.style.fontFamily = 'sans-serif';
      body.style.display = 'flex';
      body.style.alignItems = 'center';
      body.style.justifyContent = 'center';
      body.style.height = '100vh';
    });
};
