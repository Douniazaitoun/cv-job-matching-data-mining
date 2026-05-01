// frontend/src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { matchingAPI } from "../services/api";
import RadarChart    from "../components/RadarChart";
import WordCloud     from "../components/WordCloud";
import MatchScoreCard from "../components/MatchScoreCard";
import ClusterMap    from "../components/ClusterMap";
import ScoreRing     from "../components/ScoreRing";
import "./Dashboard.css";

// ── Données démo (remplacer par appels API) ────────────────────
const DEMO = {
  offers: [
    { id:1, title:"Data Scientist",  company:"OCP Group",     location:"Casablanca", contract:"CDI",   score:92, color1:"#00e5a0", color2:"#3d7fff", icon:"🏭", skills:["Python","scikit-learn","NLP","SQL","Pandas"] },
    { id:2, title:"ML Engineer",     company:"Attijariwafa",  location:"Rabat",      contract:"CDI",   score:87, color1:"#3d7fff", color2:"#a855f7", icon:"🏦", skills:["TensorFlow","Python","Docker","MLOps"] },
    { id:3, title:"Data Analyst",    company:"Maroc Telecom", location:"Rabat",      contract:"CDD",   score:74, color1:"#f59e0b", color2:"#ef4444", icon:"📡", skills:["Power BI","SQL","Excel","Python"] },
    { id:4, title:"NLP Engineer",    company:"UM6P",          location:"Ben Guerir", contract:"Stage", score:68, color1:"#10b981", color2:"#06b6d4", icon:"🎓", skills:["spaCy","BERT","Python","HuggingFace"] },
    { id:5, title:"BI Developer",    company:"BMCE Bank",     location:"Casablanca", contract:"CDI",   score:61, color1:"#ec4899", color2:"#8b5cf6", icon:"💹", skills:["Tableau","SQL","Python","ETL"] },
  ],
  radar: [
    { subject:"Python", user:90, offer:95 }, { subject:"ML",     user:80, offer:85 },
    { subject:"NLP",    user:85, offer:90 }, { subject:"SQL",    user:70, offer:80 },
    { subject:"DevOps", user:40, offer:75 }, { subject:"Viz",    user:65, offer:70 },
  ],
  words: [
    { text:"Python",          size:36, color:"#00e5a0", opacity:1    },
    { text:"SQL",             size:28, color:"#3d7fff", opacity:0.9  },
    { text:"Machine Learning",size:24, color:"#a855f7", opacity:0.85 },
    { text:"NLP",             size:30, color:"#00e5a0", opacity:0.95 },
    { text:"Docker",          size:20, color:"#f59e0b", opacity:0.8  },
    { text:"TensorFlow",      size:22, color:"#ef4444", opacity:0.85 },
    { text:"scikit-learn",    size:26, color:"#3d7fff", opacity:0.9  },
    { text:"Pandas",          size:22, color:"#10b981", opacity:0.8  },
    { text:"spaCy",           size:20, color:"#06b6d4", opacity:0.8  },
    { text:"MLOps",           size:20, color:"#a855f7", opacity:0.8  },
  ],
  dist: [
    { range:"0–20", count:2 }, { range:"20–40", count:5 },
    { range:"40–60",count:12}, { range:"60–80", count:18}, { range:"80–100",count:8 },
  ],
  clusters: [
    { label:"Data Science & ML",  color:"#00e5a0", count:18 },
    { label:"BI & Analytics",     color:"#3d7fff", count:12 },
    { label:"NLP & AI",           color:"#a855f7", count:9  },
    { label:"Data Engineering",   color:"#f59e0b", count:14 },
    { label:"Développement",      color:"#ef4444", count:7  },
  ],
};

const USER_SKILLS = ["Python","NLP","scikit-learn","Pandas","SQL","spaCy","Machine Learning"];

export default function Dashboard() {
  const [offers,   setOffers]   = useState(DEMO.offers);
  const [selected, setSelected] = useState(DEMO.offers[0]);
  const [radar,    setRadar]    = useState(DEMO.radar);
  const [words,    setWords]    = useState(DEMO.words);
  const [dist,     setDist]     = useState(DEMO.dist);
  const [clusters, setClusters] = useState(DEMO.clusters);

  // TODO : brancher API Django
  // useEffect(() => {
  //   matchingAPI.results().then(r    => setOffers(r.data));
  //   matchingAPI.wordcloud().then(r  => setWords(r.data));
  //   matchingAPI.distribute().then(r => setDist(r.data));
  //   matchingAPI.clusters().then(r   => setClusters(r.data));
  // }, []);
  // useEffect(() => {
  //   if (selected) matchingAPI.detail(selected.id).then(r => setRadar(r.data.radar));
  // }, [selected]);

  const STATS = [
    { label:"Offres collectées",    value:"807", sub:"5 plateformes",     icon:"📋", color:"var(--accent)" },
    { label:"Score moyen",          value:"74%", sub:"Top match : 92%",   icon:"🎯", color:"#3d7fff"       },
    { label:"Compétences matchées", value:"5/7", sub:"Python, NLP, SQL…", icon:"✅", color:"#a855f7"       },
    { label:"Clusters identifiés",  value:"5",   sub:"K-Means optimal",   icon:"🗂️", color:"#f59e0b"       },
  ];

  return (
    <div className="content">

      {/* Stats */}
      <div className="grid-4 fade-in">
        {STATS.map((s, i) => (
          <div key={s.label} className={`stat-card fade-in fade-in-d${i+1}`}
            style={{ "--card-color": s.color }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Offres + Détail */}
      <div className="grid-3 fade-in fade-in-d2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Offres recommandées</span>
            <span className="card-badge">{offers.length} affichées</span>
          </div>
          <div className="offer-list">
            {offers.map((o) => (
              <MatchScoreCard key={o.id} offer={o}
                selected={selected?.id === o.id}
                onClick={() => setSelected(o)} />
            ))}
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div className="card">
            <div className="card-header">
              <span className="card-title">{selected?.title}</span>
              <span style={{ fontSize:12, color:"var(--muted)" }}>{selected?.company}</span>
            </div>
            <ScoreRing value={selected?.score ?? 0} />
            <div style={{ marginTop:18 }}>
              <div className="section-label">Compétences requises</div>
              <div className="chips">
                {selected?.skills?.map((s) => (
                  <span key={s} className={`chip ${USER_SKILLS.includes(s) ? "match" : "miss"}`}>
                    {USER_SKILLS.includes(s) ? "✓ " : ""}{s}
                  </span>
                ))}
              </div>
            </div>
            <button className="btn btn-primary" style={{ width:"100%", marginTop:16, fontSize:13 }}>
              Voir l'offre complète →
            </button>
          </div>

          <div className="card">
            <div className="card-header"><span className="card-title">Profil vs Offre</span></div>
            <RadarChart data={radar} />
          </div>
        </div>
      </div>

      {/* WordCloud + Distribution */}
      <div className="grid-2 fade-in fade-in-d3">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Compétences les + demandées</span>
            <span className="card-badge">807 offres</span>
          </div>
          <WordCloud words={words} />
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">Distribution des scores</span></div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dist} barSize={28}>
              <XAxis dataKey="range" tick={{ fill:"#6b7280", fontSize:11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:"#6b7280", fontSize:11 }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ background:"var(--surface2)", border:"1px solid var(--border)", borderRadius:8, fontSize:12 }} cursor={false}/>
              <Bar dataKey="count" radius={[4,4,0,0]}>
                {dist.map((_,i) => <Cell key={i} fill={i >= 3 ? "#00e5a0" : "#1e2430"}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Clusters */}
      <div className="card fade-in fade-in-d4">
        <div className="card-header">
          <span className="card-title">Clustering K-Means des offres</span>
          <span className="card-badge">k = 5 optimal</span>
        </div>
        <ClusterMap clusters={clusters} />
      </div>
    </div>
  );
}