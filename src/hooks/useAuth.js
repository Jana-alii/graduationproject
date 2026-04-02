import { useState } from "react";
import { api } from "../api/client";

// ✅ خليها false دلوقتي (لأن مفيش backend)
// ولما backend يشتغل حطيها true
const USE_BACKEND = false;

export function useAuth() {
  const [user, setUser] = useState(null); // {id,name,email}
  const [token, setToken] = useState(null); // jwt token
  const [loading, setLoading] = useState(false);

  const signup = async ({ name, email, password }) => {
    setLoading(true);
    try {
      if (USE_BACKEND) {
        const res = await api.signup({ name, email, password });
        setUser(res.user);
        setToken(res.token);
        return res;
      }

      // ✅ Frontend-only مؤقت
      const fakeUser = { id: crypto.randomUUID(), name, email };
      setUser(fakeUser);
      setToken("demo-token");
      return { user: fakeUser, token: "demo-token" };
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      if (USE_BACKEND) {
        const res = await api.login({ email, password });
        setUser(res.user);
        setToken(res.token);
        return res;
      }

      // ✅ Frontend-only مؤقت
      const fakeUser = { id: crypto.randomUUID(), email };
      setUser(fakeUser);
      setToken("demo-token");
      return { user: fakeUser, token: "demo-token" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return { user, token, loading, signup, login, logout, setUser, setToken };
}
