import re
import requests
import json

#-------------------------------------------------------
def evaluate(expression):
    expression = expression.replace("+", "%2b")
    session = requests.session()
    token = session.get("https://es.symbolab.com/solver/step-by-step/x%5E%7B2%7D?or=input").cookies.get_dict()["sy2.pub.token"]
    
    response = json.loads(session.get(f"https://es.symbolab.com/pub_api/steps?subscribed=true&origin=input&language=es&query={expression}", headers={
        "x-requested-with": "XMLHttpRequest",
        "authorization": f"Bearer {token}"
    }).content)
    return (response["solutions"][len(response["solutions"])-1]["entire_result"].replace("=", ""), response["solutions"][0])
#-------------------------------------------------------
def QuitarCeros(list):
    new = []
    for i in list:
        if i == "-0":
            next
        elif i == "0":
            next
        else:
            new.append(i)
            next
    return new

#-----------------------------------
def NoLess(fun):
    arraycov= []
    if fun["tipo"] == "par":
        for entity in fun["functions"]:
            if entity["r1"] == "-\\infty":
                next
            elif entity["r2"] == "-\\infty":
                next
            else:
                arraycov.append(entity.copy())
        for i in arraycov:
            x = re.findall("^-\d+",i["r1"])
            if len(x) > 0:
                i["r1"] = i["r1"].replace(x[0],"0")
    else:
        for entity in fun["functions"]:
            arraycov.append(entity)
    return arraycov     
#---------------------------------------------------------------
def IntegralTrigSC(text,r1,r2):
    t = f"\\int{{{f}\\cdot\\{text}(wx)dx}}"
    #OBTENER LA EXPRESION INTEGRAL
    intgr__,steps = evaluate(t)
    intgr__= intgr__.replace("C","0")
    steps["comment"] = "Entonces: $\\int_{-\\infty}^{+\\infty}{\\{text}\\tau\\cdot d\\tau} = 0$"
    steps["comment"] = "Obtenemos la expresión de la integral para obtener la forma trigonometrica"

    #obtener la integral definida
    a = intgr__.replace("x",f"({r2})")
    b = intgr__.replace("x",f"({r1})")
    intgr__defexpr = f"({a})-({b})"
    intgr__def,steps = evaluate(intgr__defexpr)
    steps["comment"] = "Obtenemos la integral definida para la forma Trigonometrica"

    return steps, intgr__def
#---------------------------------------------------------------
def NoImpNoPar(t,f,r1,r2):
    intgr__expr = f"\\int{{({f}){{\\{t}(wt)}}dt}}"
    __eval,steps = evaluate(intgr__expr)
    __eval= __eval.replace("C","0")
    steps["comment"] = "Obtenemos la expresión de la integral para obtener la forma trigonometrica"

    a = __eval.replace("t",f"({r2})")
    b = __eval.replace("t",f"({r1})")
    def_expr = f"{a}-({b})"
    def_,steps = evaluate(def_expr)
    steps["comment"] = "Obtenemos la integral definida para la forma Trigonometrica"
    
    return steps,def_
#---------------------------------------------------------------

