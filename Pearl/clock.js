function updateTime() {
  const now = new Date();
  const options = {
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'America/Los_Angeles'
  };
  const formatted = now.toLocaleString(undefined, options);
  const el = document.querySelector('#time');
  if (el) el.textContent = formatted;
}

updateTime(); // initial run
setInterval(updateTime, 1000); // update every second

