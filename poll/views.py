from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
import json

from .models import Poll

# Create your views here.

# def login_view(request):
#     if request.method == "POST":
#         username = request.POST["username"]
#         password = request.POST["password"]

#         user = authenticate(request, username=username, password=password)
#         if user:
#             login(request, user)
#             return HttpResponseRedirect(reverse("index"))
#         else:
#             return render(request, "poll/login.html", {
#                 "message": "User doesn't exist!"
#             })
#     return render(request, "poll/login.html")

# def signup_view(request):
#     if request.method == "POST":
#         username = request.POST["username"]
#         email = request.POST["email_id"]
#         password = request.POST["password"]
#         if username == "" or email == "" or password == "":
#             return render(request, "poll/signup.html", {
#                 "message": "Something went wrong. Please try again!!" 
#             })
#         User.objects.create_user(username, email, password)
#         return render(request, "poll/login.html", {
#             "message": "Sign up successful!!" 
#         })    
#     return render(request, "poll/signup.html")

def create(request):
    if request.method == "POST":
        try:
            create_form_data = json.loads(request.body)
            p = Poll(title = create_form_data['title'],
                    description = create_form_data['description'],
                    options = json.dumps(create_form_data['options']),
                    answers = json.dumps([0]*len(create_form_data['options']))
            )
            p.save()
            print('poll saved')
            return JsonResponse({'id': p.id}, status=200)
        except:
            return HttpResponse(status=500)
    return render(request, "poll/create.html")

def view_poll(request, poll_id):
    if request.method == "POST":
        try:
            form_data = json.loads(request.body)
            index = form_data['chosenIndex']
            p = Poll.objects.get(id=poll_id)
            answers = json.loads(p.answers)
            answers[index] += 1
            p.answers = json.dumps(answers)
            p.save()
            return HttpResponse(status = 200)
        except:
            return HttpResponse(status=500)

    poll = Poll.objects.get(id=poll_id)
    context = {
        "title": poll.title,
        "description": poll.description,
        "opts": list(enumerate(json.loads(poll.options))),
        "poll_id": poll_id
    }
    return render(request, "poll/viewpoll.html", context)

def results_view(request, poll_id):
    percentages= []
    colors = ['blue', 'orange', 'green', 'pink', 'brown', 'purple', 'yellow', 'grey', 'red', 'black']
    optionanswers = dict()
    poll = Poll.objects.get(id=poll_id)
    answers = json.loads(poll.answers)
    options = json.loads(poll.options)
    total = sum(answers)
    
    if total != 0:
        for each in answers:
            percentages.append(float("{:.2f}".format((each/total)*100)))
    else:
        percentages = [0]*len(answers)
    for i,j in zip(options,answers):
        optionanswers[i] = j
    
    context = {
        "title": poll.title,
        "description": poll.description,
        "total": total,
        "option_object": list(zip(options, answers, percentages, colors)),
        "optionanswers": json.dumps(optionanswers),
        "poll_id": poll_id
    }
    return render(request, "poll/results.html", context)


