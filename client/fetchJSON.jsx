export async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    console.log(`Failed ${res.status}`);
    throw new Error(`Failed ${res.status}`);
  }
  return await res.json();
}
