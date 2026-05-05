# backend/apps/scraping/spiders/rekrute_spider.py
import scrapy
from datetime import date


class RekruteSpider(scrapy.Spider):
    """Spider pour Rekrute.com — collecte les offres d'emploi."""
    name         = "rekrute"
    allowed_domains = ["rekrute.com"]
    start_urls   = ["https://www.rekrute.com/offres.html"]

    custom_settings = {
        "DOWNLOAD_DELAY": 2,           # délai poli entre requêtes
        "RANDOMIZE_DOWNLOAD_DELAY": True,
        "USER_AGENT": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0 Safari/537.36"
        ),
    }

    def parse(self, response):
        """Parse la liste des offres."""
        offers = response.css("li.post-id")

        for offer in offers:
            url = offer.css("a.titreJob::attr(href)").get()
            if url:
                yield response.follow(url, callback=self.parse_offer)

        # Pagination
        next_page = response.css("a.next::attr(href)").get()
        if next_page:
            yield response.follow(next_page, callback=self.parse)

    def parse_offer(self, response):
        """Parse le détail d'une offre."""
        yield {
            "title":       response.css("h1.titreJob::text").get("").strip(),
            "company":     response.css("a.company-name::text").get("").strip(),
            "location":    response.css("span.location::text").get("").strip(),
            "contract":    response.css("span.contract-type::text").get("Autre").strip(),
            "experience":  response.css("span.experience::text").get("").strip(),
            "description": " ".join(response.css("div.job-description *::text").getall()),
            "skills":      response.css("span.skill::text").getall(),
            "url":         response.url,
            "source":      "rekrute",
            "published_at": date.today().isoformat(),
        }
