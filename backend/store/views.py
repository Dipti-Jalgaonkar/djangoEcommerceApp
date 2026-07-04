from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def home(request):
    data = {
        'message': 'Welcome to the ecommerce home'
    }
    return JsonResponse(data);