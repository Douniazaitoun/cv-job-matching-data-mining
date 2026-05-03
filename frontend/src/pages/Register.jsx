// frontend/src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/api";
import "./Auth.css";

export default function Register({ onLogin }) {
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const navigate = useNavigate();

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Veuillez remplir tous les champs."); return;
    }
    if (form.password !== form.confirm) {
      setError("Les mots de passe ne correspondent pas."); return;
    }
    setLoading(true); setError("");
    try {
      const res = await authAPI.register({
        name: form.name, email: form.email, password: form.password,
      });
      onLogin(res.data.user);
      navigate("/profile");   // → compléter le profil après inscription
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Erreur lors de l'inscription."
      );
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-inner">
          <div className="auth-brand">◆ CV&Match Platform</div>
          <h1 className="auth-big-title">
            Créez votre<br />
            profil <span className="hl">intelligent</span><br />
            en 2 minutes.
          </h1>
          <p className="auth-desc">
            Uploadez votre CV, renseignez vos compétences et laissez
            notre moteur NLP trouver les offres les mieux adaptées.
          </p>
          <div className="feature-pills">
            {[
              ["📄", "Upload PDF ou DOCX"],
              ["✏️", "Saisie manuelle des compétences"],
              ["🎯", "Matching instantané après inscription"],
              ["📊", "Dashboard personnalisé"],
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
          <div className="auth-title">Créer un compte</div>
          <div className="auth-sub">Rejoignez CV&Match Platform</div>

          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label className="form-label">Nom complet</label>
            <input className="form-input" placeholder="Ahmed Benali"
              value={form.name} onChange={update("name")} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="vous@example.ma"
              value={form.email} onChange={update("email")} />
          </div>
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input className="form-input" type="password" placeholder="Min. 8 caractères"
              value={form.password} onChange={update("password")} />
          </div>
          <div className="form-group">
            <label className="form-label">Confirmer le mot de passe</label>
            <input className="form-input" type="password" placeholder="••••••••"
              value={form.confirm} onChange={update("confirm")} />
          </div>

          <button className="btn btn-primary auth-submit"
            onClick={handleSubmit} disabled={loading}>
            {loading ? "Création…" : "Créer mon compte →"}
          </button>

          <div className="auth-footer">
            Déjà un compte ?{" "}
            <Link to="/login" className="auth-link">Se connecter</Link>
          </div>
        </div>
      </div>
    </div>
  );
}