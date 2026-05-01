// frontend/src/pages/Results.jsx
import { useState } from "react";
import ScoreRing  from "../components/ScoreRing";
import RadarChart from "../components/RadarChart";
import GeoMap     from "../components/GeoMap";
import "./Results.css";

const OFFERS = [
  { id:1, title:"Data Scientist",  company:"OCP Group",     location:"Casablanca", contract:"CDI",   score:92,
    cosine:0.88, jaccard:0.71, expMatch:1,    geoMatch:0.5,  color1:"#00e5a0", color2:"#3d7fff", icon:"🏭",
    skills:["Python","scikit-learn","NLP","SQL","Pandas"],
    radar:[{subject:"Python",user:90,offer:95},{subject:"ML",user:80,offer:85},{subject:"NLP",user:85,offer:90},{subject:"SQL",user:70,offer:80},{subject:"DevOps",user:40,offer:60},{subject:"Viz",user:65,offer:70}] },
  { id:2, title:"ML Engineer",     company:"Attijariwafa",  location:"Rabat",      contract:"CDI",   score:87,
    cosine:0.82, jaccard:0.65, expMatch:1,    geoMatch:1,    color1:"#3d7fff", color2:"#a855f7", icon:"🏦",
    skills:["TensorFlow","Python","Docker","MLOps"],
    radar:[{subject:"Python",user:90,offer:90},{subject:"ML",user:80,offer:90},{subject:"NLP",user:85,offer:50},{subject:"SQL",user:70,offer:65},{subject:"DevOps",user:40,offer:85},{subject:"Viz",user:65,offer:60}] },
  { id:3, title:"Data Analyst",    company:"Maroc Telecom", location:"Rabat",      contract:"CDD",   score:74,
    cosine:0.70, jaccard:0.55, expMatch:0.75, geoMatch:1,    color1:"#f59e0b", color2:"#ef4444", icon:"📡",
    skills:["Power BI","SQL","Excel","Python"],
    radar:[{subject:"Python",user:90,offer:75},{subject:"ML",user:80,offer:50},{subject:"NLP",user:85,offer:40},{subject:"SQL",user:70,offer:90},{subject:"DevOps",user:40,offer:30},{subject:"Viz",user:65,offer:85}] },
  { id:4, title:"NLP Engineer",    company:"UM6P",          location:"Ben Guerir", contract:"Stage", score:68,
    cosine:0.65, jaccard:0.60, expMatch:0.5,  geoMatch:0.5,  color1:"#10b981", color2:"#06b6d4", icon:"🎓",
    skills:["spaCy","BERT","Python","HuggingFace"],
    radar:[{subject:"Python",user:90,offer:85},{subject:"ML",user:80,offer:75},{subject:"NLP",user:85,offer:95},{subject:"SQL",user:70,offer:40},{subject:"DevOps",user:40,offer:50},{subject:"Viz",user:65,offer:45}] },
  { id:5, title:"BI Developer",    company:"BMCE Bank",     location:"Casablanca", contract:"CDI",   score:61,
    cosine:0.58, jaccard:0.45, expMatch:0.75, geoMatch:0.5,  color1:"#ec4899", color2:"#8b5cf6", icon:"💹",
    skills:["Tableau","SQL","Python","ETL"],
    radar:[{subject:"Python",user:90,offer:70},{subject:"ML",user:80,offer:35},{subject:"NLP",user:85,offer:30},{subject:"SQL",user:70,offer:95},{subject:"DevOps",user:40,offer:55},{subject:"Viz",user:65,offer:90}] },
];

const USER_SKILLS = ["Python","NLP","scikit-learn","Pandas","SQL","spaCy","Machine Learning"];
const CONTRACTS   = ["Tous","CDI","CDD","Stage","Freelance"];
const SC = (s) => s>=80?"#00e5a0":s>=60?"#f59e0b":"#ff6b6b";

export default function Results() {
  const [selected, setSelected] = useState(OFFERS[0]);
  const [filter,   setFilter]   = useState("Tous");

  const filtered = filter==="Tous" ? OFFERS : OFFERS.filter((o) => o.contract===filter);

  return (
    <div className="content">
      {/* Filtres */}
      <div className="results-filters fade-in">
        <span className="filter-label">Contrat :</span>
        {CONTRACTS.map((c) => (
          <button key={c} className={`filter-btn${filter===c?" active":""}`}
            onClick={() => setFilter(c)}>{c}</button>
        ))}
        <span className="filter-count">{filtered.length} offres</span>
      </div>

      <div className="results-layout fade-in fade-in-d1">
        {/* Liste */}
        <div className="results-list">
          {filtered.map((o) => (
            <div key={o.id} className={`result-row${selected?.id===o.id?" selected":""}`}
              onClick={() => setSelected(o)}>
              <div className="result-logo"
                style={{ background:`linear-gradient(135deg,${o.color1},${o.color2})` }}>{o.icon}</div>
              <div className="result-info">
                <div className="result-title">{o.title}</div>
                <div className="result-meta">
                  <span>{o.company}</span><span>📍 {o.location}</span>
                  <span className="tag">{o.contract}</span>
                </div>
                <div className="score-bar-wrap">
                  <div className="score-bar-fill" style={{ width:`${o.score}%`, background:SC(o.score) }}/>
                </div>
              </div>
              <div className="result-score" style={{ color:SC(o.score) }}>{o.score}%</div>
            </div>
          ))}
        </div>

        {/* Détail */}
        {selected && (
          <div className="results-detail">
            <div className="card" style={{ marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
                <div className="detail-logo"
                  style={{ background:`linear-gradient(135deg,${selected.color1},${selected.color2})` }}>
                  {selected.icon}
                </div>
                <div>
                  <div className="detail-title">{selected.title}</div>
                  <div className="detail-sub">{selected.company} · 📍 {selected.location}</div>
                </div>
              </div>
              <ScoreRing value={selected.score} />
              {/* Formule */}
              <div className="formula-grid" style={{ marginTop:18 }}>
                {[
                  { label:"Cosinus TF-IDF", val:(selected.cosine*100).toFixed(0)+"%",  w:"×0.50", c:"var(--accent)" },
                  { label:"Jaccard Skills", val:(selected.jaccard*100).toFixed(0)+"%", w:"×0.25", c:"#3d7fff" },
                  { label:"Exp. Match",     val:(selected.expMatch*100).toFixed(0)+"%",w:"×0.15", c:"#a855f7" },
                  { label:"Geo Match",      val:(selected.geoMatch*100).toFixed(0)+"%",w:"×0.10", c:"#f59e0b" },
                ].map((m) => (
                  <div key={m.label} className="formula-item">
                    <div className="formula-label">{m.label}</div>
                    <div className="formula-value" style={{ color:m.c }}>{m.val}</div>
                    <div className="formula-weight">{m.w}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ marginBottom:16 }}>
              <div className="card-header"><span className="card-title">Profil vs Offre</span></div>
              <RadarChart data={selected.radar} />
            </div>

            <div className="card" style={{ marginBottom:16 }}>
              <div className="card-header"><span className="card-title">Analyse des compétences</span></div>
              <div className="sk-label">✅ Matchées</div>
              <div className="chips" style={{ marginBottom:12 }}>
                {selected.skills.filter((s)=>USER_SKILLS.includes(s)).map((s)=>(
                  <span key={s} className="chip match">✓ {s}</span>
                ))}
              </div>
              <div className="sk-label">❌ Manquantes</div>
              <div className="chips">
                {selected.skills.filter((s)=>!USER_SKILLS.includes(s)).map((s)=>(
                  <span key={s} className="chip miss">{s}</span>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header"><span className="card-title">Localisation</span></div>
              <GeoMap offers={[selected]} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}