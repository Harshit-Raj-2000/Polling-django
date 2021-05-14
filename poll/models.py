from django.db import models

# Create your models here.

class Poll(models.Model):
    title = models.CharField(max_length=1000)
    description = models.CharField(max_length=5000)
    options = models.CharField(max_length=10000)
    answers = models.CharField(max_length=10000)

    def __str__(self):
        return f"{self.id}: {self.title}"

