// Function to preload an image
function preload(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = (e) => reject(e);
    img.src = url.trim();
  });
}
// Function to apply the background image with a transition and a callback
function applyBackground(url) {
  return new Promise(resolve => {
    const cur = document.getElementById('bgcurrent');
    const next = document.getElementById('bgnext');
    // Set the next background image's URL
    next.style.backgroundImage = `url('${url.trim()}')`;
    // Start the fade-in transition
    next.classList.add('visible');
    cur.classList.remove('visible');
    // After the transition, swap the IDs for the next cycle
    setTimeout(() => {
      // Swap IDs
      cur.id = 'bgnext';
      next.id = 'bgcurrent';
      // The new 'bgnext' should be hidden for the next transition
      document.getElementById('bgnext').classList.remove('visible');
      resolve();
    }, 500); // Must match your CSS transition duration (0.5s)
  });
}
// A single function that handles the entire cycle
function startImageCycle() {
  fetch('http://localhost:3268/')
    .then(resp => {
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return resp.json();
    })
    .then(data => {
      if (!data.urls || data.urls.length < 2) {
        throw new Error('Missing or incomplete "urls" field');
      }
      const [firstUrl, secondUrl] = data.urls;
      // Preload both images
      return Promise.all([preload(firstUrl), preload(secondUrl)]).then(() => {
        // Apply the first image
        document.getElementById('bgcurrent').style.backgroundImage = `url('${firstUrl.trim()}')`;
        document.getElementById('bgcurrent').classList.add('visible');
        // Wait 5 seconds, then perform the transition to the second image
        return new Promise(resolve => setTimeout(() => {
          applyBackground(secondUrl).then(() => {
            // Fetch new images and start the cycle again
            fetch('http://localhost:3268/')
              .then(resp => {
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                return resp.json();
              })
              .then(data => {
                if (!data.urls || data.urls.length < 2) {
                  throw new Error('Missing or incomplete "urls" field');
                }
                const [newFirstUrl, newSecondUrl] = data.urls;
                // Preload both new images
                return Promise.all([preload(newFirstUrl), preload(newSecondUrl)]).then(() => {
                  // Apply the new first image
                  document.getElementById('bgcurrent').style.backgroundImage = `url('${newFirstUrl.trim()}')`;
                  document.getElementById('bgcurrent').classList.add('visible');
                  // Wait 5 seconds, then perform the transition to the new second image
                  setTimeout(() => {
                    applyBackground(newSecondUrl);
                  }, 5000);
                });
              })
              .catch(err => {
                console.error('It fucked, mate :/', err);
              });
            resolve();
          });
        }, 5000));
      });
    })
    .catch(err => {
      console.error('It fucked, mate :/', err);
    });
}
// When the page is loaded, begin the process
window.onload = function() {
  startImageCycle();
};
