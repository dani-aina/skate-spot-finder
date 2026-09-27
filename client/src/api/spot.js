const BASE_URL = "http://localhost:5001/api";

export async function getSpots() {
  const res = await fetch(`${BASE_URL}/spots`);

  if (!res.ok) {
    throw new Error(`Failed to fetch spots: ${res.status}`);
  }

  return res.json();
}

export async function createSpot(spotData) {
  const res = await fetch(`${BASE_URL}/spots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spotData),
  });

  if (!res.ok) {
    throw new Error(`Failed to create spot: ${res.status}`);
  }

  return res.json();
}
