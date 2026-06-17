const BASE_URL = "/applications";

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    ).toString();
    return fetch(`${BASE_URL}${query ? `?${query}` : ""}`).then(handleResponse);
  },

  getById: (id) => fetch(`${BASE_URL}/${id}`).then(handleResponse),

  create: (body) =>
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(handleResponse),

  update: (id, body) =>
    fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(handleResponse),

  delete: (id) =>
    fetch(`${BASE_URL}/${id}`, { method: "DELETE" }).then(handleResponse),
};
