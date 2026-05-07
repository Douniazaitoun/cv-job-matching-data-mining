import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.scraping.models import JobOffer

offers = [
    {"title": "Data Scientist", "company": "OCP Group", "location": "Casablanca", "contract": "CDI",
     "description": "Analyse données machine learning Python scikit-learn pandas NLP modélisation statistique TF-IDF clustering kmeans", "skills": ["Python", "Machine Learning", "NLP", "pandas", "scikit-learn"], "url": "https://rekrute.com/offre-1", "source": "rekrute", "experience": "2 ans"},
    {"title": "Data Analyst", "company": "Maroc Telecom", "location": "Rabat", "contract": "CDI",
     "description": "Analyse statistique SQL Python pandas visualisation données reporting Power BI Excel data warehouse ETL", "skills": ["SQL", "Python", "Pandas", "Power BI"], "url": "https://rekrute.com/offre-2", "source": "rekrute", "experience": "1 an"},
    {"title": "ML Engineer", "company": "InnoTech", "location": "Casablanca", "contract": "Stage",
     "description": "Développement modèles machine learning deep learning TensorFlow Python déploiement API REST scikit-learn neural networks", "skills": ["Python", "TensorFlow", "Machine Learning", "scikit-learn"], "url": "https://rekrute.com/offre-3", "source": "rekrute", "experience": "0 an"},
    {"title": "NLP Engineer", "company": "Datatech", "location": "Marrakech", "contract": "CDD",
     "description": "Traitement langage naturel spaCy transformers BERT Python NLP analyse texte classification sentiment named entity recognition", "skills": ["Python", "NLP", "spaCy", "transformers"], "url": "https://rekrute.com/offre-4", "source": "rekrute", "experience": "1 an"},
    {"title": "Business Intelligence", "company": "Attijariwafa Bank", "location": "Casablanca", "contract": "CDI",
     "description": "SQL Power BI analyse données financières reporting Python Excel data warehouse ETL tableau de bord KPI", "skills": ["SQL", "Power BI", "Python", "Excel"], "url": "https://rekrute.com/offre-5", "source": "rekrute", "experience": "3 ans"},
    {"title": "Data Engineer", "company": "CIH Bank", "location": "Casablanca", "contract": "CDI",
     "description": "Pipeline données Python Spark SQL PostgreSQL ETL ingestion traitement stockage cloud AWS data lake architecture", "skills": ["Python", "Spark", "SQL", "AWS"], "url": "https://rekrute.com/offre-6", "source": "rekrute", "experience": "2 ans"},
    {"title": "Stage Data Science", "company": "UM6P", "location": "Benguerir", "contract": "Stage",
     "description": "Stage data science Python machine learning pandas numpy scikit-learn analyse exploratoire visualisation matplotlib seaborn", "skills": ["Python", "pandas", "numpy", "scikit-learn"], "url": "https://rekrute.com/offre-7", "source": "rekrute", "experience": "0 an"},
    {"title": "AI Research Intern", "company": "Huawei Maroc", "location": "Casablanca", "contract": "Stage",
     "description": "Recherche intelligence artificielle deep learning NLP computer vision Python TensorFlow PyTorch modèles transformers BERT", "skills": ["Python", "PyTorch", "NLP", "Computer Vision"], "url": "https://rekrute.com/offre-8", "source": "rekrute", "experience": "0 an"},
    {"title": "Développeur Python", "company": "Sqli Maroc", "location": "Casablanca", "contract": "CDI",
     "description": "Développement backend Python Django REST API PostgreSQL Docker Git CI/CD microservices architecture logicielle", "skills": ["Python", "Django", "PostgreSQL", "Docker"], "url": "https://rekrute.com/offre-9", "source": "rekrute", "experience": "2 ans"},
    {"title": "Statisticien", "company": "HCP Maroc", "location": "Rabat", "contract": "CDI",
     "description": "Analyse statistique R Python SPSS modélisation régression classification données enquêtes sondages reporting", "skills": ["R", "Python", "SPSS", "statistiques"], "url": "https://rekrute.com/offre-10", "source": "rekrute", "experience": "3 ans"},
]

JobOffer.objects.all().delete()
created = 0
for o in offers:
    JobOffer.objects.create(**o)
    created += 1

print(f"OK — {created} offres créées, total: {JobOffer.objects.count()}")