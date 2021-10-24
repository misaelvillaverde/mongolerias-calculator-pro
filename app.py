from flask import Flask
from flask import render_template, request
from flask import jsonify
import requests
import json
app = Flask(__name__)


def evaluate(expression):
    expression = expression.replace("+", "%2b")
    session = requests.session()
    token = session.get(
        "https://es.symbolab.com/solver/step-by-step/x%5E%7B2%7D?or=input").cookies.get_dict()["sy2.pub.token"]
    response = json.loads(session.get(f"https://es.symbolab.com/pub_api/steps?subscribed=true&origin=input&language=es&query={expression}", headers={
        "x-requested-with": "XMLHttpRequest",
        "authorization": f"Bearer {token}"
    }).content)
    return (response["solutions"][len(response["solutions"])-1]["entire_result"].replace("=", ""), response["solutions"][0])


@app.route("/fourier-series", methods=["POST"])
def fourier_series_symbo():
    #f = "t"
    #d = "-\\pi"
    #d_plus_T ="\\pi"
    #T ="2\\pi"
    f = request.json["f"]
    d = request.json["d"]
    d_plus_T = request.json["d_plus_T"]
    T = request.json["T"]

    omega, steps = evaluate(f"\\frac{{ 2\\pi }}{{ {T} }}")

    global_steps = []

    a0_integral_expr, steps = evaluate("\\int{t}dt")
    a0_integral_expr = a0_integral_expr.replace("+C", "")
    steps["comment"] = "Obtenemos la integral de $$a_0$$"
    global_steps.append(steps)

    a = a0_integral_expr.replace("t", f"({d_plus_T})")
    b = a0_integral_expr.replace("t", f"({d})")
    a0_dintegral_expr = f"{a} - {b}"
    a0_dintegral, steps = evaluate(a0_dintegral_expr)
    steps["comment"] = f"Obtenemos la integral definida de $$a_0$$ en el intervalo $${d} \\rightarrow {d_plus_T}$$"
    global_steps.append(steps)

    a0, steps = evaluate(f"\\frac{{ 2 }}{{ {T} }} \cdot {a0_dintegral}")
    steps["comment"] = f"Obtenemos $$a_0$$ final"
    global_steps.append(steps)

    an_integral_expr, steps = evaluate(
        f"\\int{{{f} \\cdot cos(n \\cdot {omega} t) }}dt")
    an_integral_expr = an_integral_expr.replace("+C", "")
    steps["comment"] = "Obtenemos la integral de $$a_n$$"
    global_steps.append(steps)

    a = an_integral_expr.replace("t", f"({d_plus_T})")
    b = an_integral_expr.replace("t", f"({d})")
    an_dintegral_expr = f"{a} - {b}"
    an_dintegral, steps = evaluate(a0_dintegral_expr)
    steps["comment"] = f"Obtenemos la integral definida de $$a_n$$ en el intervalo $${d} \\rightarrow {d_plus_T}$$"
    global_steps.append(steps)

    an, steps = evaluate(f"\\frac{{ 2 }}{{ {T} }} \cdot {an_dintegral}")
    steps["comment"] = "Obtenemos $$a_n$$ final"
    global_steps.append(steps)

    bn_integral_expr, steps = evaluate(
        f"\\int{{{f} \\cdot sin(n \\cdot {omega} t) }}dt")
    bn_integral_expr = bn_integral_expr.replace("+C", "")
    steps["comment"] = "Obtenemos la integral de $$b_n$$"
    global_steps.append(steps)

    a = bn_integral_expr.replace("t", f"({d_plus_T})")
    b = bn_integral_expr.replace("t", f"({d})")
    bn_dintegral_expr = f"{a} - ({b})"
    bn_dintegral, steps = evaluate(bn_dintegral_expr)
    steps["comment"] = f"Obtenemos la integral definida de $$b_n$$ en el intervalo $${d} \\rightarrow {d_plus_T}$$"
    global_steps.append(steps)

    bn, steps = evaluate(f"\\frac{{ 2 }}{{ {T} }} \cdot {bn_dintegral}")
    steps["comment"] = "Obtenemos $$b_n$$ final"
    global_steps.append(steps)

    termino1_expr = f"\\frac{{1}}{{2}}\cdot {a0}"
    termino1, steps = evaluate(termino1_expr)

    steps["comment"] = "Simplificamos"
    global_steps.append(steps)

    termino2_expr = f" {an} \\cdot cos(n\\omega t)"
    termino2, steps = evaluate(termino2_expr)
    steps["comment"] = "Simplificamos"
    global_steps.append(steps)
    termino3_expr = f" {bn} sin(n \\omega t)"
    termino3, steps = evaluate(termino3_expr)
    steps["comment"] = "Simplificamos"
    global_steps.append(steps)

    # construct fourier response
    fourier_response = {
        "comment": "Resultado: ",
        "entire_result": f"\\displaystyle{termino1}+\\sum_{{n=1}}^{{N}}\\left({termino2}+{termino3}\\right)",
    }
    global_steps.append(fourier_response)

    return jsonify(global_steps)


@app.route("/symbo", methods=['POST'])
def symbo():
    #import pdb; pdb.set_trace()
    session = requests.session()
    token = session.get(
        "https://es.symbolab.com/solver/step-by-step/x%5E%7B2%7D?or=input").cookies.get_dict()["sy2.pub.token"]
    query = request.json["expression"]
    # response = json.loads(session.get(f"https://es.symbolab.com/pub_api/steps?subscribed=true&origin=input&language=es&query=%5Cint+tcos%5Cleft(nt%5Cright)dt+&referer=https%3A%2F%2Fes.symbolab.com%2Fsolver%2Fstep-by-step%2F%255Cint_%257B%2520%257Dtcos%255Cleft(nt%255Cright)dt%2520%3For%3Dinput&plotRequest=PlotOptional&page=step-by-step",headers={
    response = json.loads(session.get(f"https://es.symbolab.com/pub_api/steps?subscribed=true&origin=input&language=es&query={query}", headers={
        "x-requested-with": "XMLHttpRequest",
        "authorization": f"Bearer {token}"
    }).content)
    return {
        "dym": response["dym"],
        "solutions": response["solutions"]
    }


@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/fourier-series')
def fourier_series():
    return render_template('/matsup/fourier_series.html')


app.run(debug=True)
