from flask import Flask
from flask import render_template, request
from flask import jsonify
import requests
import json
app = Flask(__name__)
from utiles import NoImpNoPar
from utiles import NoLess
from utiles import evaluate
from utiles import IntegralTrigSC
from utiles import QuitarCeros


@app.route("/fourier-series", methods=["POST"])
def fourier_series_symbo():
    T = request.json["T"]

    omega, steps = evaluate(f"\\frac{{ 2\\pi }}{{ {T} }}")

    global_steps = []

    """a0_integral_expr, steps = evaluate(f"\\int{{ {f} }}dt")
    a0_integral_expr = a0_integral_expr.replace("+C", "")
    steps["comment"] = "Obtenemos la integral de $$a_0$$"
    global_steps.append(steps)

    a = a0_integral_expr.replace("t", f"({d_plus_T})")
    b = a0_integral_expr.replace("t", f"({d})")
    a0_dintegral_expr = f"{a} - ({b})"
    a0_dintegral, steps = evaluate(a0_dintegral_expr)
    steps["comment"] = f"Obtenemos la integral definida de $$a_0$$ en el intervalo $${d} \\rightarrow {d_plus_T}$$"
    global_steps.append(steps)

    a0, steps = evaluate(f"\\frac{{ 2 }}{{ {T} }} \cdot {a0_dintegral}")
    steps["comment"] = f"Obtenemos $$a_0$$ final"
    global_steps.append(steps)
    """
    a0_terms = []
    for function in request["functions"]:
        f = function["f"]
        d = function["d"]
        d_plus_T = function["d_plus_T"]
        # OBTENER EXPRESION INTEGRAL 
        integral__ =f"\\int{{ {f} }}dt"
        a0_integral_expr, steps = evaluate(integral__)
        a0_integral_expr = a0_integral_expr.replace("+C", "")
        steps["comment"] = "Obtenemos la integral de $$a_0$$"
        global_steps.append(steps)

        # OBTENER INTEGRAL DEFINIDA DEL RANGO
        a = a0_integral_expr.replace("t", f"({d_plus_T})")
        b = a0_integral_expr.replace("t", f"({d})")
        a0_dintegral_expr = f"{a} - ({b})"
        a0_dintegral, steps = evaluate(a0_dintegral_expr)
        steps["comment"] = f"Obtenemos la integral definida de $$a_0$$ en el intervalo $${d} \\rightarrow {d_plus_T}$$"
        global_steps.append(steps)
        a0_terms.append(a0_dintegral)
    
    a0, steps = evaluate(f"\\frac{{ 2 }}{{ {T} }} \cdot ({ '+'.join(a0_terms) })")
    steps["comment"] = f"Obtenemos $$a_0$$ final"
    global_steps.append(steps)

    """an_integral_expr, steps = evaluate(f"\\int{{({f}) \\cdot cos(n \\cdot {omega} t) }}dt")
    an_integral_expr = an_integral_expr.replace("+C", "")
    steps["comment"] = "Obtenemos la integral de $$a_n$$"
    global_steps.append(steps)

    a = an_integral_expr.replace("t", f"({d_plus_T})")
    b = an_integral_expr.replace("t", f"({d})")
    an_dintegral_expr = f"{a} - ({b})"
    an_dintegral, steps = evaluate(an_dintegral_expr)
    steps["comment"] = f"Obtenemos la integral definida de $$a_n$$ en el intervalo $${d} \\rightarrow {d_plus_T}$$"
    global_steps.append(steps)

    an, steps = evaluate(f"\\frac{{ 2 }}{{ {T} }} \cdot {an_dintegral}")
    steps["comment"] = "Obtenemos $$a_n$$ final"
    global_steps.append(steps)"""

    an_terms = []
    for function in request["functions"]:
        f = function["f"]
        d = function["d"]
        d_plus_T = function["d_plus_T"]
        integral__ = f"\\int{{({f}) \\cdot cos(n \\cdot {omega} t) }}dt"
        # OBTENER EXPRESION INTEGRAL 
        an_integral_expr, steps = evaluate(integral__)
        an_integral_expr = an_integral_expr.replace("+C", "")
        steps["comment"] = "Obtenemos la integral de $$a_n$$"
        global_steps.append(steps)

        # OBTENER INTEGRAL DEFINIDA DEL RANGO
        a = an_integral_expr.replace("t", f"({d_plus_T})")
        b = an_integral_expr.replace("t", f"({d})")
        an_dintegral_expr = f"{a} - ({b})"
        an_dintegral, steps = evaluate(an_dintegral_expr)
        
        steps["comment"] = f"Obtenemos la integral definida de $$a_n$$ en el intervalo $${d} \\rightarrow {d_plus_T}$$"
        global_steps.append(steps)
        an_terms.append(an_dintegral)

    
    an, steps = evaluate(f"\\frac{{ 2 }}{{ {T} }} \cdot ({ '+'.join(an_terms) })")
    steps["comment"] = "Obtenemos $$a_n$$ final"
    global_steps.append(steps)
    
    """bn_integral_expr, steps = evaluate(f"\\int{{({f}) \\cdot sin(n \\cdot {omega} t) }}dt")
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
    global_steps.append(steps)"""

    bn_terms = []
    for function in request["functions"]:
        f = function["f"]
        d = function["d"]
        d_plus_T = function["d_plus_T"]
        integral__ = f"\\int{{({f}) \\cdot sin(n \\cdot {omega} t) }}dt"
        # OBTENER EXPRESION INTEGRAL 
        bn_integral_expr, steps = evaluate(integral__)
        bn_integral_expr = bn_integral_expr.replace("+C", "")
        steps["comment"] = "Obtenemos la integral de $$b_n$$"
        global_steps.append(steps)

        # OBTENER INTEGRAL DEFINIDA DEL RbnGO
        a = bn_integral_expr.replace("t", f"({d_plus_T})")
        b = bn_integral_expr.replace("t", f"({d})")
        bn_dintegral_expr = f"{a} - ({b})"
        bn_dintegral, steps = evaluate(bn_dintegral_expr)
        
        steps["comment"] = f"Obtenemos la integral definida de $$b_n$$ en el intervalo $${d} \\rightarrow {d_plus_T}$$"
        global_steps.append(steps)
        bn_terms.append(bn_dintegral)
    bn, steps = evaluate(f"\\frac{{ 2 }}{{ {T} }} \cdot ({ '+'.join(bn_terms) })")
    steps["comment"] = "Obtenemos $$a_n$$ final"
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
        "entire_result": f"\\displaystyle{termino1}+\\sum_{{n=1}}^{{\\infty}}\\left({termino2}+{termino3}\\right)",
    }
    global_steps.append(fourier_response)

    return jsonify(global_steps)

@app.route("/complex-fourier-serie", methods=['POST'])
def compleja():
    global_steps = []

    #si converge
    converge_terms = []
    functions = NoLess(request)
    for function in functions:
        f = function["f"]
        ran1 = function["r1"]
        ran2 = function["r2"]
        integral_ = "\\int{{"+f+"}}dt"
        converge_expr,steps = evaluate(integral_)
        converge_expr = converge_expr.replace("+C","")
        converge_expr = converge_expr.replace("C","0")
        steps["comment"] = "Obtenemos la integral para cada función"
        global_steps.append(steps)

        #el rango
        a = converge_expr.replace("t",f"("+ran2+")")
        b = converge_expr.replace("t",f"("+ran1+")")
        converge_definidaexpr = f"("+a+")-("+b+")"
        converge_definida,steps = evaluate(converge_definidaexpr)
        steps["comment"] = "Obtenemos la integral definida para cada función"
        global_steps.append(steps)
        converge_terms.append(converge_definida)

    if request["tipo"] == "par":
        conv,steps = evaluate("2\cdot({"+'+'.join(converge_terms)+"})")
        steps["comment"] = "Sumamos los terminos obtenidos"
    else:
        conv,steps = evaluate("\cdot({"+'+'.join(converge_terms)+"})")
        steps["comment"] = "Sumamos los terminos obtenidos"
        
    match = re.search("(\\\\frac\{(\d*)\}\{(\d*)})", conv) or re.search("^-?\d+(\.\d+)?$", conv)
    if match: 
        print("si converge")
        steps["comment"] = "La función si converge"
        global_steps.append(steps)
    else:
        steps["comment"] = "La función NO converge"
        global_steps.append(steps)
        return jsonify(global_steps)
        #response

    #Forma compleja de la integral de FOURIER
    compleja_terms = []
    steps["comment"] = "Integral compleja de fourier de $f(t)$"
    steps["comment"] = "$\\frac{1}{2\\pi}\\int_{-\\infty}^{+\\infty}[\\int_{-\\infty}^{+\\infty}{f(\\tau)}e^{-jw\\tau}{d\\tau}]dw$"
    for function in request["functions"]:
        f= function["f"]
        ran1 = function["r1"]
        ran2 = function["r2"]
        #OBTENER LA EXPRESION INTEGRAL CON TAO
        integral2__ = f"\\int(({f})\\cdot e^{{-jwt}}{{dt}})"
        compleja2,steps = evaluate(integral2__)
        compleja2= compleja2.replace("+C","")
        compleja2 = compleja2.replace("C","0")
        steps["comment"] = "Obtenemos la primera integral para la forma compleja"

        #Obtener la expresión definida de la integral TAO
        a = compleja2.replace("t",f"("+ran2+")")
        b = compleja2.replace("t",f"("+ran1+")")

        compleja2_defexpr = f"("+a+")-("+b+")"
        compleja_def,steps = evaluate(compleja2_defexpr)
        steps["comment"] = "Obtenemos la integral definida para la forma compleja"
        global_steps.append(steps)
        compleja_terms.append(compleja_def)

    compleja_terms = QuitarCeros(compleja_terms)
    compleja,steps = evaluate("{"+'+'.join(compleja_terms)+"}")
    steps["comment"] = "Suma de los terminos finales"
    compleja_final= "\\frac{1}{2\\pi}\\int_{-\\infty}^{+\\infty}"+compleja+"dw"
    global_steps.append(steps)
    
    compleja01_response = {
            "comment": "Representación de la integral compleja de fourier de la función f(t)",
            "entire_result": compleja_final,
        }
    global_steps.append(compleja01_response)

    #FORMA TRIGONOMETRICA DE LA INTEGRAL DE FOURIER
    intgr_trig = []
    if request["tipo"] == "par":
        for function  in request["functions"]:
            f= function["f"]
            ran1 = function["r1"]
            ran2 = function["r2"]
            c = 'cos'
            stp, int_f = IntegralTrigSC(c,ran1,ran2)
            global_steps.append(stp)
            intgr_trig.append(int_f)
    elif request["tipo"] =="impar":
        for function  in request["functions"]:
            f= function["f"]
            ran1 = function["r1"]
            ran2 = function["r2"]
            s = 'sin'
            stp, int_f = IntegralTrigSC(s,ran1,ran2)
            global_steps.append(stp)
            intgr_trig.append(int_f)
    else: 
        for function in request["functions"]:
            f= function["f"]
            ran1 = function["r1"]
            ran2 = function["r2"]

            c = "cos"
            stpc, int_fc = NoImpNoPar(c,f,ran1,ran2)
            global_steps.append(stpc)
            intgr_trig.append(int_fc)

            s = "sin"
            stps, int_fs = NoImpNoPar(s,f,ran1,ran2)
            global_steps.append(stps)
            intgr_trig.append(int_fs) 
    
    if request["tipo"] == "par":
        forma_trig,steps = evaluate("{"+'+'.join(intgr_trig)+"}")
        formatrig_final= f"\\frac{{ 2 }}{{\\pi}}\\int_{0}^{{+\\infty}}{{{forma_trig}}}{{\\cos(tw)}}dw"
        steps["comment"] = "Suma de integrales"
        global_steps.append(steps)

    elif request["tipo"] == "impar":
        forma_trig,steps = evaluate("{"+'+'.join(intgr_trig)+"}")
        formatrig_final= f"\\frac{{ 2 }}{{\\pi}}\\int_{0}^{{+\\infty}}{{{forma_trig}}}{{\\sin(tw)}}dw"
        steps["comment"] = "Forma trigonometrica de la integral de Fourier"
        global_steps.append(steps)

    else:
        intgr_trig = QuitarCeros(intgr_trig)
        formatrig_final= f"\\frac{{ 2 }}{{\\pi}}[\\int_{0}^{{+\\infty}}{{{intgr_trig[0]}}}{{\\cos(tw)}}dw+\\int_{0}^{{+\\infty}}{{{intgr_trig[1]}}}{{\\sin(tw)}}dw]"
        
    compleja_response = {
            "comment": "Forma trigonometrica de la integral de Fourier",
            "entire_result": formatrig_final,
        }

    global_steps.append(compleja_response)
    return jsonify(global_steps)

@app.route("/fourier-transform", methods=['POST'])
def fourier_trans():
    T = request.json["T"]

    omega, steps = evaluate(f"\\frac{{ 2\\pi }}{{ {T} }}")

    global_steps = []
    transform_terms = []

    for function in request["functions"]:
        f = function["f"]
        d = function["d"]
        d_plus_T = function["d_plus_T"]
        integral_transform, steps = evaluate(f"\\int{{ {f}\\cdot e^{{-j \\cdot \\omega \\cdot t}} }}dt")
        integral_transform = integral_transform.replace("C", "(0)")
        a = integral_transform.replace("t", f"({d_plus_T})")
        b = integral_transform.replace("t", f"({d})")
        dintegral_transform = f"{a} - ({b})"
        dintegral_transform_solution, steps = evaluate(dintegral_transform)
        global_steps.append(steps)
        transform_terms.append(dintegral_transform_solution)
    transform_terms
    transformada,steps = evaluate("{"+'+'.join(transform_terms)+"}")
    steps['comment'] = 'Resultado de la tranformada'
    global_steps.append(steps)
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

@app.route('/fourier-transform')
def fourier_transform():
    return render_template('/matsup/fourier_transform.html')

app.run(debug=True)
