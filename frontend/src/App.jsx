// ─────────────────────────────────────────────────────────────
//  frontend/src/App.jsx  —  Routing principal
// ─────────────────────────────────────────────────────────────
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login     from "./pages/Login";
import Register  from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile   from "./pages/Profile";
import Results   from "./pages/Results";

import Sidebar from "./components/Sidebar";
import Topbar  from "./components/Topbar";
import "./styles/global.css";

// ── Layout protégé (sidebar + topbar) ────────────────────────
function ProtectedLayout({ user, setUser, children }) {
  const [page, setPage] = useState(
    window.location.pathname.replace("/", "") || "dashboard"
  );

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} user={user} />
      <div className="main">
        <Topbar page={page} setPage={setPage}
          onLogout={() => { localStorage.clear(); setUser(null); }} />
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const handleLogin = (u) => {
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login"    element={<Login    onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />

        {/* Protégé */}
        <Route path="/dashboard" element={
          <ProtectedLayout user={user} setUser={setUser}>
            <Dashboard />
          </ProtectedLayout>
        }/>
        <Route path="/profile" element={
          <ProtectedLayout user={user} setUser={setUser}>
            <Profile user={user} />
          </ProtectedLayout>
        }/>
        <Route path="/results" element={
          <ProtectedLayout user={user} setUser={setUser}>
            <Results />
          </ProtectedLayout>
        }/>

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}