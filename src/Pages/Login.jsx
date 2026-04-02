import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Brain } from "lucide-react";
import "./Auth.css";

export default function Login({ onSubmit, loading }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  const [params] = useSearchParams();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!email.trim()) return setErr("Enter your email");
    if (!pass.trim()) return setErr("Enter your password");

    try {
      await onSubmit({ email: email.trim(), password: pass });
      const next = params.get("next") || "/subjects";
      navigate(next);
    } catch (e2) {
      setErr(e2?.message || "Login failed");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-wrap">
        <div className="auth-brand">
          <span className="auth-logo"><Brain size={18} color="#fff" /></span>
          <span>Lecture Brain</span>
        </div>
        <p className="auth-sub">Welcome back. Sign in to continue</p>

        <form className="auth-card" onSubmit={submit}>
          <label className="auth-label" htmlFor="email">Email</label>
          <input id="email" className="auth-input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />

          <label className="auth-label" htmlFor="password">Password</label>
          <input id="password" className="auth-input" type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="••••••••" />

          {err && <div className="auth-error">{err}</div>}
          <button className="auth-btn" type="submit" disabled={!!loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="auth-footer">
            Don't have an account?{" "}
            <Link to={`/signup?next=${encodeURIComponent(params.get("next") || "/subjects")}`}>
              Sign up
            </Link>
          </div>
        </form>

        <Link className="auth-back" to="/">← Back to home</Link>
      </div>
    </div>
  );
}
