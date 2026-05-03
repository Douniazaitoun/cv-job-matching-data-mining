# Backend API (Sans Frontend)

## Base URL
- `http://127.0.0.1:8000/api/`

## Endpoints Matching
- `POST /api/match-cv/`
  - Form-data:
    - `cv`: fichier `.pdf` ou `.docx`
  - Retour:
    - `filename`
    - `total_results`
    - `clustering.optimal_k`
    - `results` (top 10)
      - `job_id`, `job`, `company`, `location`, `cluster_id`
      - `cosine_score`, `jaccard_score`, `experience_score`, `geo_score`, `final_score`

## Endpoints NLP
- `POST /api/nlp/upload-cv/` (auth requis)
- `GET /api/nlp/profile/<profile_id>/` (auth requis)
- `POST /api/nlp/vectorize/`
  - Body JSON: `{ "text": "...", "top_n": 30 }`
- `POST /api/nlp/extract-skills/`
  - Body JSON: `{ "text": "..." }`

## Commandes utiles
- Installer dépendances:
  - `pip install -r requirements.txt`
- Vérifier projet:
  - `python manage.py check`
- Lancer tests matching:
  - `python manage.py test apps.matching`
