import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import HomePage from "./Pages/HomePage.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Subjects from "./Pages/Subjects.jsx";
import Chat from "./Pages/Chat.jsx";

import { useAuth } from "./hooks/useAuth";

function RequireAuth({ user, children }) {
  const location = useLocation();
  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }
  return children;
}

function AppRoutes() {
  const nav = useNavigate();
  const auth = useAuth();

  // ✅ GLOBAL THEME
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("lb_theme");
    return saved ? saved === "dark" : false;
  });

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("lb_theme", dark ? "dark" : "light");
  }, [dark]);

  const onToggleTheme = () => setDark((v) => !v);

  const onGetStarted = () => {
    if (auth.user) nav("/subjects");
    else nav("/signup?next=/subjects");
  };

  const onNavigate = (to) => {
    if (typeof to === "string" && to.startsWith("/")) {
      nav(to);
      return;
    }

    if (to === "home") return nav("/");
    if (to === "login") return nav("/login");
    if (to === "signup") return nav("/signup");
    if (to === "subjects") return nav("/subjects");
    if (to === "chat") return nav("/chat");

    console.log("Unknown navigation target:", to);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            user={auth.user}
            onLogout={auth.logout}
            onNavigate={onNavigate}
            onGetStarted={onGetStarted}
            onToggleTheme={onToggleTheme}
            dark={dark}
          />
        }
      />

      <Route
        path="/login"
        element={
          <Login
            loading={auth.loading}
            onSubmit={auth.login}
            onToggleTheme={onToggleTheme}
            dark={dark}
          />
        }
      />

      <Route
        path="/signup"
        element={
          <Signup
            onSubmit={auth.signup}
            loading={auth.loading}
            onToggleTheme={onToggleTheme}
            dark={dark}
          />
        }
      />

      <Route
        path="/subjects"
        element={
          <RequireAuth user={auth.user}>
            <Subjects
              user={auth.user}
              subjects={[]} // خليها فاضية لحد ما تربطي backend
              token={auth.token}
              onLogout={auth.logout}
              onToggleTheme={onToggleTheme}
              dark={dark}
              onOpenSubject={(id) =>
                nav(`/chat?subject=${encodeURIComponent(id)}`)
              }
            />
          </RequireAuth>
        }
      />

      <Route
        path="/chat"
        element={
          <RequireAuth user={auth.user}>
            <Chat user={auth.user} onToggleTheme={onToggleTheme} dark={dark} />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}