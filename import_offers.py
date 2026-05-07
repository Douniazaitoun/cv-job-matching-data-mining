import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

import json
from apps.scraping.models import JobOffer

with open('apps/scraping/spiders/offers_rekrute.json', encoding='utf-8') as f:    data = json.load(f)

created = 0
for item in data:
    if not item.get('url') or not item.get('description','').strip():
        continue
    _, c = JobOffer.objects.get_or_create(
        url=item['url'],
        defaults={
            'title':      item.get('title','')[:255],
            'company':    item.get('company','')[:255],
            'location':   item.get('location','')[:150],
            'contract':   item.get('contract','Autre')[:20],
            'experience': item.get('experience','')[:50],
            'description':item.get('description',''),
            'skills':     item.get('skills',[]),
            'source':     'rekrute',
        }
    )
    if c: created += 1

print(f'OK — {created} offres importées, total: {JobOffer.objects.count()}')