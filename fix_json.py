with open('apps/scraping/spiders/offers_rekrute.json', encoding='utf-8') as f:
    content = f.read()

last_brace = content.rfind('}')
fixed = content[:last_brace+1] + ']'

if not fixed.strip().startswith('['):
    fixed = '[' + fixed

with open('apps/scraping/spiders/offers_rekrute.json', 'w', encoding='utf-8') as f:
    f.write(fixed)

print("JSON réparé !")