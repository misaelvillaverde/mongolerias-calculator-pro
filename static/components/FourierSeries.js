import { post } from "../utils/requests.js";
import { renderSolution } from "../utils/solution.js";
import { ErrorResponse } from "./ErrorResponse.js";
import { Graph } from "./Graph.js";
import { parseISymbols, evalFSymbols } from "../utils/algorithms.js";
import katex from "https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.mjs";

export const FourierSeries = (app) => {
  const submitButton = document.querySelector("#submit");
  const addFuncButton = document.querySelector("#add_function");
  const functionsDiv = document.querySelector("#functions");
  const periodInput = document.querySelector("#T");
  const complexInput = document.querySelector("#complex");
  const latexOutput = document.querySelector("#output");
  const parityDiv = document.querySelector("#parity");
  const transformInput = document.querySelector("#transform");
  periodInput.setAttribute("value", "2\\pi");

  let complexChecked = false;
  let transformChecked = false;

  const functions = {
    functions: [
      {
        f: "t",
        d: "0",
        d_plus_T: "2*\\pi",
        removeHandler: (e) => {
          removeButton(e.target.parentElement.dataset.index, e.target);
        },
      },
    ],
    tipo: "",
    T: periodInput.value,
  };

  const encodeFunctions = (func) => {
    // copy the functions object into new object
    const encodeResult = JSON.parse(JSON.stringify(func));
    encodeResult.functions.forEach((f, i) => {
      f.f = encodeURI(f.f).replace(/\+/g, "%2B");
      f.d = encodeURI(f.d).replace(/\+/g, "%2B");
      f.d_plus_T = encodeURI(f.d_plus_T).replace(/\+/g, "%2B");
    });
    return encodeResult;
  };

  const updateGraph = () => {
    const graphdata = [];
    try {
      functions.functions.forEach((f, i) => {
        let fun, d, d_plus_T;

        // parse string to int and \\pi to Math.PI
        fun = parseISymbols(f.f);
        d = evalFSymbols(f.d);
        d_plus_T = evalFSymbols(f.d_plus_T);

        const func = {
          fn: fun,
          range: [d, d_plus_T],
        };
        graphdata.push(func);
      });

      console.log("graph data", graphdata);
      Graph(800, 500, graphdata);
    } catch (e) {
      console.log("Graph:", e);
    }
  };
  updateGraph();

  const renderLatex = () => {
    let cases = "f(t) = \\begin{cases}";
    functions.functions.forEach((f, i) => {
      if (i < functions.functions.length - 1) {
        cases += `${f.f} &\\text{if } ${f.d} < t < ${f.d_plus_T} \\\\`;
      } else {
        cases += `${f.f} &\\text{if } ${f.d} < t < ${f.d_plus_T}`;
      }
    });
    cases += "\\end{cases}";
    console.log("latex: ", cases);
    katex.render(cases, latexOutput);
  };
  renderLatex();

  const updateFunctions = () => {
    const funcs = document.querySelectorAll(".function");

    funcs.forEach((func, i) => {
      const inputs = func.querySelectorAll("input");
      functions.functions[i].f = inputs[0].value;
      functions.functions[i].d = inputs[1].value;
      functions.functions[i].d_plus_T = inputs[2].value;
    });

    console.log("updated:", functions);

    updateGraph();
    renderLatex();
  };

  const removeButton = (index, button) => {
    button.removeEventListener(
      "click",
      functions.functions[index].removeHandler
    );
    functions.functions.splice(index, 1);
    updateGraph();
    renderLatex();
    renderFunctions();
  };

  const renderFunctions = () => {
    functionsDiv.innerHTML = "";
    functions.functions.forEach((function_, i) => {
      const functionDiv = document.createElement("div");
      functionDiv.classList.add("function");
      functionDiv.classList.add("flex");
      functionDiv.setAttribute("data-index", i);

      const fDiv = document.createElement("div");
      const dDiv = document.createElement("div");
      const d_plus_TDiv = document.createElement("div");

      const functionInput = document.createElement("input");
      const dInput = document.createElement("input");
      const d_plus_TInput = document.createElement("input");

      const functionLabel = document.createElement("label");
      const dLabel = document.createElement("label");
      const d_plus_TLabel = document.createElement("label");

      functionLabel.innerHTML = "f(t):";
      dLabel.innerHTML = "d:";
      d_plus_TLabel.innerHTML = "d+T:";

      functionInput.classList.add("small-input");
      dInput.classList.add("small-input");
      d_plus_TInput.classList.add("small-input");

      functionInput.setAttribute("value", function_.f);
      dInput.setAttribute("value", function_.d);
      d_plus_TInput.setAttribute("value", function_.d_plus_T);

      fDiv.appendChild(functionLabel);
      fDiv.appendChild(functionInput);

      dDiv.appendChild(dLabel);
      dDiv.appendChild(dInput);

      d_plus_TDiv.appendChild(d_plus_TLabel);
      d_plus_TDiv.appendChild(d_plus_TInput);

      functionDiv.appendChild(fDiv);
      functionDiv.appendChild(dDiv);
      functionDiv.appendChild(d_plus_TDiv);

      const rButton = document.createElement("button");
      rButton.classList.add("remove-button");
      rButton.innerHTML = "&#10006;";

      rButton.addEventListener("click", function_.removeHandler);

      fDiv.addEventListener("input", updateFunctions);
      dDiv.addEventListener("input", updateFunctions);
      d_plus_TDiv.addEventListener("input", updateFunctions);

      functionDiv.appendChild(rButton);

      functionsDiv.appendChild(functionDiv);
    });
  };

  renderFunctions();

  const renderResults = async () => {
    const encodedFunctions = encodeFunctions(functions);
    console.log("encoded functions: ", encodedFunctions);

    app.innerHTML = "";

    let response;
    try {
      if (complexChecked) {
        response = await post("/complex-fourier-series", encodedFunctions);
      } else if (transformChecked) {
        response = await post("/fourier-transform", encodedFunctions);
      } else {
        response = await post("/fourier-series", encodedFunctions);
      }
      console.log(response);
    } catch (err) {
      ErrorResponse(app, "Back error 🥵:" + err);
    }

    try {
      app.appendChild(renderSolution(response));
    } catch (err) {
      ErrorResponse(app, "Front error 👽:" + err);
    }
  };

  const addButton = () => {
    updateFunctions();
    functions.functions.push({
      f: "t",
      d: "0",
      d_plus_T: "2*\\pi",
      removeHandler: (e) => {
        removeButton(e.target.parentElement.dataset.index, e.target);
      },
    });
    renderFunctions();
    renderLatex();
  };

  const toggleComplex = () => {
    complexChecked = !complexChecked;
    parityDiv.innerHTML = "";
    functions.tipo = "";
    if (complexChecked) {
      const evenDiv = document.createElement("div");
      evenDiv.classList.add("flex");
      evenDiv.classList.add("gap");

      const evenLabel = document.createElement("label");
      evenLabel.innerHTML = "Par";

      const evenInput = document.createElement("input");
      evenInput.setAttribute("type", "radio");
      evenInput.setAttribute("name", "parity");

      evenDiv.appendChild(evenLabel);
      evenDiv.appendChild(evenInput);

      const oddDiv = document.createElement("div");
      oddDiv.classList.add("flex");
      oddDiv.classList.add("gap");

      const oddLabel = document.createElement("label");
      oddLabel.innerHTML = "Impar";

      const oddInput = document.createElement("input");
      oddInput.setAttribute("type", "radio");
      oddInput.setAttribute("name", "parity");

      oddDiv.appendChild(oddLabel);
      oddDiv.appendChild(oddInput);

      evenInput.addEventListener("change", () => {
        functions.tipo = "par";
        console.log("par");
      });

      oddInput.addEventListener("change", () => {
        functions.tipo = "impar";
        console.log("impar");
      });

      parityDiv.appendChild(evenDiv);
      parityDiv.appendChild(oddDiv);
    }
  };

  const toggleTransform = () => {
    transformChecked = !transformChecked;
  };

  complexInput.addEventListener("click", toggleComplex);
  transformInput.addEventListener("click", toggleTransform);
  periodInput.addEventListener("input", () => {
    functions.T = periodInput.value;
  });
  submitButton.addEventListener("click", renderResults);
  addFuncButton.addEventListener("click", addButton);
};
