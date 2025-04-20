// Initialize map
const map = L.map("map").setView([20.5937, 78.9629], 5); // India center

// Add tile layer
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Add listing function with geocoding
async function addListing() {
  const place = document.getElementById("placeInput").value.trim();

  if (!place) {
    alert("Please enter a place name!");
    return;
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        place
      )}`
    );
    const data = await res.json();

    if (data.length === 0) {
      alert("Place not found!");
      return;
    }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    // Add marker
    L.marker([lat, lon])
      .addTo(map)
      .bindPopup(`<strong>${place}</strong>`)
      .openPopup();

    // Zoom into location
    map.setView([lat, lon], 8);
  } catch (error) {
    console.error("Error fetching location:", error);
    alert("Something went wrong. Try again later.");
  }
}
