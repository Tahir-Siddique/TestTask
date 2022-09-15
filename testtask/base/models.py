from django.db import models

# Create your models here.


class Category(models.Model):
    text = models.CharField(max_length=50)

    def __str__(self):
        return self.text


class Car(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    color = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    make = models.CharField(max_length=50)
    registration_no = models.CharField(max_length=50)

    def __str__(self):
        return self.color+' '+self.model
