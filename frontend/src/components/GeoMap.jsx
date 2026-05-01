// frontend/src/components/GeoMap.jsx
import "./GeoMap.css";

// offers = [{ title, company, location }, ...]
export default function GeoMap({ offers = [] }) {
  // TODO : brancher Plotly.js en production
  // import Plot from "react-plotly.js";
  // <Plot data={[{ type:"scattergeo", lat, lon, text }]} layout={...} />

  return (
    <div className="geomap">
      <div className="geomap-icon">🗺️</div>
      <div className="geomap-title">Carte géographique des offres</div>
      <div className="geomap-sub">{offers.length} offre(s) géolocalisée(s) · Plotly.js</div>
      <div className="geomap-pins">
        {offers.map((o, i) => (
          <div key={i} className="geomap-pin-item">
            <div className="geomap-pin" />
            <span>{o.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
