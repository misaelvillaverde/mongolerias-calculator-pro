from flask import Flask
from flask import render_template, request 
from flask import jsonify
import requests
import json
app = Flask(__name__)


@app.route("/symbo",methods=['POST'])
def symbo():
    #import pdb; pdb.set_trace()
    session = requests.session()
    token = session.get("https://es.symbolab.com/solver/step-by-step/x%5E%7B2%7D?or=input").cookies.get_dict()["sy2.pub.token"]
    query = request.json["expression"]
    #response = json.loads(session.get(f"https://es.symbolab.com/pub_api/steps?subscribed=true&origin=input&language=es&query=%5Cint+tcos%5Cleft(nt%5Cright)dt+&referer=https%3A%2F%2Fes.symbolab.com%2Fsolver%2Fstep-by-step%2F%255Cint_%257B%2520%257Dtcos%255Cleft(nt%255Cright)dt%2520%3For%3Dinput&plotRequest=PlotOptional&page=step-by-step",headers={
    response = json.loads(session.get(f"https://es.symbolab.com/pub_api/steps?subscribed=true&origin=input&language=es&query={query}",headers={
        "x-requested-with":"XMLHttpRequest",
        "authorization":f"Bearer {token}"
    }).content)
    return {
        "dym":response["dym"],
        "solutions":response["solutions"]
    }

@app.route('/')
def hello():
    return render_template('index.html')

app.run(debug=True)