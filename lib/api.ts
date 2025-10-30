export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";

async function request(path: string, opts: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: any = { "Content-Type": "application/json", ...(opts.headers || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers,
  });

  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null } catch (e) { data = text; }

  if (!res.ok) {
    const error: any = new Error(data?.message || res.statusText || "Request error");
    error.status = res.status;
    error.body = data;
    throw error;
  }
  return data;
}

export const api = {
  post: (path: string, body: any) =>
    request(path, { method: "POST", body: JSON.stringify(body) }),
  get: (path: string) => request(path, { method: "GET" }),
  put: (path: string, body: any) =>
    request(path, { method: "PUT", body: JSON.stringify(body) }),
  del: (path: string) => request(path, { method: "DELETE" }),
};
