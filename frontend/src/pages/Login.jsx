// frontend/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/api";
import "./Auth.css";

export default function Login({ onLogin }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) { setError("Veuillez remplir tous les champs."); return; }
    setLoading(true); setError("");
    try {
      const res = await authAPI.login(email, password);
      onLogin(res.data.user);
      navigate("/dashboard");
    } catch {
      setError("Email ou mot de passe incorrect.");
    } finally { setLoading(false); }
  };

  // Mode démo sans API
  const devLogin = () => {
    onLogin({ name: "Ahmed Benali", email: "ahmed@test.ma" });
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-inner">
          <div className="auth-brand">◆ CV&Match Platform</div>
          <h1 className="auth-big-title">
            Trouvez l'offre<br />
            qui vous <span className="hl">correspond</span><br />
            vraiment.
          </h1>
          <p className="auth-desc">
            Intelligence artificielle et Data Mining pour matcher votre profil
            avec les meilleures offres du marché marocain et international.
          </p>
          <div className="feature-pills">
            {[
              ["🔍", "Web Scraping automatisé (Rekrute, Indeed…)"],
              ["🧠", "Analyse NLP de votre CV avec spaCy + TF-IDF"],
              ["📊", "Score pondéré : Cosinus + Jaccard + Exp + Géo"],
              ["🗂️", "Clustering K-Means des offres par domaine"],
            ].map(([icon, label]) => (
              <div key={label} className="feature-pill">
                <div className="fp-icon">{icon}</div>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-title">Connexion</div>
          <div className="auth-sub">Accédez à votre tableau de bord</div>

          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="vous@example.ma"
              value={email} onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
          </div>
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input className="form-input" type="password" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
          </div>

          <button className="btn btn-primary auth-submit"
            onClick={handleSubmit} disabled={loading}>
            {loading ? "Connexion…" : "Se connecter →"}
          </button>

          <button className="btn btn-ghost auth-submit" style={{ marginTop: 8 }}
            onClick={devLogin}>
            🛠 Mode démo (sans API)
          </button>

          <div className="auth-footer">
            Pas encore de compte ?{" "}
            <Link to="/register" className="auth-link">S'inscrire</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
