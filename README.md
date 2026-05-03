# CV Matching Project (Backend + Frontend)

## 1) Lancer le backend (Django)
- Ouvrir un terminal dans `backend`
- Installer les dépendances: `pip install -r requirements.txt`
- Appliquer migrations: `python manage.py migrate`
- Lancer serveur: `python manage.py runserver`

Backend API disponible sur: `http://127.0.0.1:8000/api/`

## 2) Lancer le frontend (React)
- Ouvrir un second terminal dans `backend/frontend`
- Installer dépendances: `npm install`
- Lancer frontend: `npm start`

Frontend disponible sur: `http://localhost:3000`

## 3) Parcours complet pour voir les résultats
1. Aller sur `Register` et créer un compte.
2. Aller sur `Profile` et sauvegarder le profil.
3. Aller sur `Results`, uploader un CV (`pdf/docx`).
4. Les offres matchées s'affichent avec:
   - score final,
   - sous-scores (cosine, jaccard, expérience, géo),
   - carte géographique.
5. Aller sur `Dashboard` pour voir le résumé global:
   - stats,
   - distribution des scores,
   - clusters K-Means,
   - carte des offres géolocalisées.

## 4) Endpoints principaux
- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `GET /api/users/<id>/`
- `PUT /api/users/<id>/`
- `POST /api/match-cv/`
- `GET /api/map-offers/`

## 5) Vérifications
- Check Django: `python manage.py check`
- Tests backend: `python manage.py test`
