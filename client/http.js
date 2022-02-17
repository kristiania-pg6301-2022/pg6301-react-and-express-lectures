class HttpError extends Error {
  constructor(status, statusText) {
    super(statusText);
  }
}

export async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new HttpError(res.status, res.statusText);
  }
  return await res.json();
}

export async function postJSON(url, json) {
  const res = await fetch(url, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(json),
  });
  if (!res.ok) {
    throw new HttpError(res.status, res.statusText);
  }
}
