import React, { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Brain, Eye, EyeOff } from "lucide-react";
import "./Auth.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checks(pw) {
  return {
    length: pw.length >= 8,
    lower: /[a-z]/.test(pw),
    upper: /[A-Z]/.test(pw),
    number: /\d/.test(pw),
    special: /[^A-Za-z0-9]/.test(pw),
  };
}

function firstPasswordError(pw) {
  const c = checks(pw);
  if (!c.length) return "Password must be at least 8 characters";
  if (!c.lower) return "Add at least 1 lowercase letter";
  if (!c.upper) return "Add at least 1 uppercase letter";
  if (!c.number) return "Add at least 1 number";
  if (!c.special) return "Add at least 1 special character (e.g. !@#$)";
  return "";
}

export default function Signup({ onSubmit, loading }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [agree, setAgree] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({}); // per-field errors
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const pwChecks = useMemo(() => checks(pass), [pass]);
  const passErrLive = useMemo(() => (pass ? firstPasswordError(pass) : ""), [pass]);
  const confirmErrLive = useMemo(() => {
    if (!confirmPass) return "";
    if (confirmPass !== pass) return "Passwords do not match";
    return "";
  }, [confirmPass, pass]);

  const validateAll = () => {
    const e = {};
    const nm = name.trim();
    const em = email.trim().toLowerCase();

    if (!nm) e.name = "Full name is required";

    if (!em) e.email = "Email is required";
    else if (!emailRegex.test(em)) e.email = "Enter a valid email (example@domain.com)";

    if (!pass) e.pass = "Password is required";
    else if (passErrLive) e.pass = passErrLive;

    if (!confirmPass) e.confirmPass = "Please confirm your password";
    else if (confirmPass !== pass) e.confirmPass = "Passwords do not match";

    if (!agree) e.agree = "You must agree to the Terms & Privacy Policy";
    return e;
  };

  const canSubmit =
    name.trim() &&
    email.trim() &&
    pass &&
    confirmPass &&
    agree &&
    !passErrLive &&
    !confirmErrLive &&
    !loading;

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validateAll();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      // Frontend-only: you can keep onSubmit dummy now, later connect backend
      await onSubmit?.({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: pass,
      });

      const next = params.get("next") || "/subjects";
      navigate(next);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        form: err?.message || "Signup failed. Please try again.",
      }));
    }
  };

  const clearField = (key) => {
    if (!errors[key]) return;
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  return (
    <div className="auth-bg">
      <div className="auth-wrap">
        <div className="auth-brand">
          <span className="auth-logo"><Brain size={18} color="#fff" /></span>
          <span>Lecture Brain</span>
        </div>
        <p className="auth-sub">Create your account to get started</p>

        <form className="auth-card" onSubmit={submit}>
          {/* Full Name */}
          <label className="auth-label" htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            className={`auth-input ${errors.name ? "auth-input--error" : ""}`}
            value={name}
            onChange={(e) => { setName(e.target.value); clearField("name"); }}
            placeholder="John Doe"
          />
          {errors.name && <div className="auth-error-inline">{errors.name}</div>}

          {/* Email */}
          <label className="auth-label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            className={`auth-input ${errors.email ? "auth-input--error" : ""}`}
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearField("email"); }}
            placeholder="you@example.com"
          />
          {errors.email && <div className="auth-error-inline">{errors.email}</div>}

          {/* Password */}
          <label className="auth-label" htmlFor="password">Password</label>
          <div className="auth-passwrap">
            <input
              id="password"
              name="password"
              className={`auth-input ${errors.pass ? "auth-input--error" : ""}`}
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={(e) => { setPass(e.target.value); clearField("pass"); }}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="auth-eye"
              onClick={() => setShowPass((v) => !v)}
              aria-label={showPass ? "Hide password" : "Show password"}
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.pass && <div className="auth-error-inline">{errors.pass}</div>}

          {/* Password rules - live */}
          <div className="pw-rules">
            <div className={pwChecks.length ? "ok" : ""}>• 8+ characters</div>
            <div className={pwChecks.upper ? "ok" : ""}>• 1 uppercase</div>
            <div className={pwChecks.lower ? "ok" : ""}>• 1 lowercase</div>
            <div className={pwChecks.number ? "ok" : ""}>• 1 number</div>
            <div className={pwChecks.special ? "ok" : ""}>• 1 special (!@#$)</div>
          </div>

          {/* Confirm Password */}
          <label className="auth-label" htmlFor="confirmPass">Confirm Password</label>
          <div className="auth-passwrap">
            <input
              id="confirmPass"
              name="confirmPass"
              className={`auth-input ${errors.confirmPass || confirmErrLive ? "auth-input--error" : ""}`}
              type={showConfirm ? "text" : "password"}
              value={confirmPass}
              onChange={(e) => { setConfirmPass(e.target.value); clearField("confirmPass"); }}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="auth-eye"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {(errors.confirmPass || confirmErrLive) && (
            <div className="auth-error-inline">{errors.confirmPass || confirmErrLive}</div>
          )}

          {/* Agree */}
          <label className="auth-check">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => { setAgree(e.target.checked); clearField("agree"); }}
            />
            <span>
              I agree to the <a href="#" onClick={(e)=>e.preventDefault()}>Terms of Service</a> and{" "}
              <a href="#" onClick={(e)=>e.preventDefault()}>Privacy Policy</a>
            </span>
          </label>
          {errors.agree && <div className="auth-error-inline">{errors.agree}</div>}

          {errors.form && <div className="auth-error">{errors.form}</div>}

          <button className="auth-btn" type="submit" disabled={!canSubmit}>
            {loading ? "Creating..." : "Create Account"}
          </button>

          <div className="auth-footer">
            Already have an account?{" "}
            <Link to={`/login?next=${encodeURIComponent(params.get("next") || "/subjects")}`}>Login</Link>
          </div>
        </form>

        <Link className="auth-back" to="/">← Back to home</Link>
      </div>
    </div>
  );
}