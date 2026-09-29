const BASE_URL = "http://localhost:5001/api";

export async function uploadPhoto(file) {
  const formData = new FormData();
  formData.append("photo", file);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to upload photo: ${res.status}`);
  }

  const data = await res.json();
  return data.url;
}
