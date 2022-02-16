export class HttpError extends Error {
  constructor(status, statusText) {
    super("HttpError " + statusText);
    this.status = status;
  }
}

export async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (res.status === 200) {
    return await res.json();
  } else if (res.status === 204) {
    return undefined;
  } else {
    throw new HttpError(res.status, res.statusText, res.body);
  }
}

export async function postJSON(path, json) {
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(json),
  });
  if (!res.ok) {
    throw new HttpError(res.status, res.statusText);
  }
}
