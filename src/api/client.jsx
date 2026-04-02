const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const msg = data?.message || `Request failed: ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export const api = {
  // AUTH (ربطيها لاحقاً)
  signup: ({ name, email, password }) =>
    request("/auth/signup", { method: "POST", body: { name, email, password } }),

  login: ({ email, password }) =>
    request("/auth/login", { method: "POST", body: { email, password } }),

  // SUBJECTS
  getSubjects: ({ token }) => request("/subjects", { token }),

  createSubject: ({ token, name }) =>
    request("/subjects", { method: "POST", body: { name }, token }),

  // (Optional) لاحقاً:
  // getSubjectDetails: ({ token, subjectId }) => request(`/subjects/${subjectId}`, { token }),
};
