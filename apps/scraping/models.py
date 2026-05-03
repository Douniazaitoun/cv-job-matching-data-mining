from django.db import models

class JobOffer(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True, null=True)
    sector = models.CharField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    skills_required = models.TextField(blank=True, null=True)
    experience_required = models.CharField(max_length=100, blank=True, null=True)
    contract_type = models.CharField(max_length=100, blank=True, null=True)
    published_date = models.DateField(blank=True, null=True)
    source_url = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title