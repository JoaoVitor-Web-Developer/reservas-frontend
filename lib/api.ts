export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";

async function request(path: string, opts: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers || {}),
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers,
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const error: any = new Error(data?.message || res.statusText || "Erro na requisição");
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
