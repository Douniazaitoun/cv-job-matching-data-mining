// ─────────────────────────────────────────────────────────────
//  frontend/src/services/api.js
//  Toutes les communications avec le backend Django REST
// ─────────────────────────────────────────────────────────────
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

// ── JWT : injection automatique du token ─────────────────────
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Redirection sur token expiré ─────────────────────────────
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────
export const authAPI = {
  login:    (email, password) => API.post("/auth/token/",         { email, password }),
  register: (data)            => API.post("/auth/register/",      data),
  refresh:  (refresh)         => API.post("/auth/token/refresh/", { refresh }),
  logout:   ()                => API.post("/auth/logout/"),
};

// ── Profil utilisateur ────────────────────────────────────────
export const profileAPI = {
  get:      ()     => API.get("/users/me/"),
  update:   (data) => API.put("/users/me/", data),
  uploadCV: (file) => {
    const form = new FormData();
    form.append("cv_file", file);
    return API.post("/users/me/cv/", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  history: () => API.get("/users/me/history/"),
};

// ── Offres d'emploi ───────────────────────────────────────────
export const offersAPI = {
  list:   (params) => API.get("/offers/",        { params }),
  detail: (id)     => API.get(`/offers/${id}/`),
  search: (q)      => API.get("/offers/search/", { params: { q } }),
};

// ── Matching ──────────────────────────────────────────────────
export const matchingAPI = {
  run:         ()   => API.post("/matching/run/"),
  results:     ()   => API.get("/matching/results/"),
  detail:      (id) => API.get(`/matching/results/${id}/`),
  clusters:    ()   => API.get("/matching/clusters/"),
  wordcloud:   ()   => API.get("/matching/wordcloud/"),
  distribute:  ()   => API.get("/matching/distribution/"),
};

// ── Scraping ──────────────────────────────────────────────────
export const scrapingAPI = {
  status:       ()           => API.get("/scraping/status/"),
  trigger:      (source)     => API.post("/scraping/trigger/", { source }),
  toggleSource: (id, active) => API.patch(`/scraping/sources/${id}/`, { active }),
};

export default API;