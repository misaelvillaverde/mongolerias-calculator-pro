import { post } from "../utils/requests.js";
import { renderSolution } from "../utils/solution.js";
import { ErrorResponse } from "./ErrorResponse.js";

export const FourierSeries = (app) => {
  const submitButton = document.querySelector("#submit");
  const addFuncButton = document.querySelector("#add_function");
  const functionsDiv = document.querySelector("#functions");
  const periodInput = document.querySelector("#T");
  const complexInput = document.querySelector("#complex");
  periodInput.setAttribute("value", "2\\pi");

  const functions = {
    functions: [
      {
        f: "t",
        d: "0",
        d_plus_T: "2\\pi",
        removeHandler: (e) => {
          removeButton(e.target.parentElement.dataset.index, e.target);
        },
      },
    ],
    T: periodInput.value,
  };

  let complexChecked = false;

  const encodeFunctions = (func) => {
    func.functions.forEach((f, i) => {
      f.f = encodeURI(f.f).replace(/\+/g, "%2B");
    });
  };

  const removeButton = (index, button) => {
    console.log(`eliminar ${index}`);
    button.removeEventListener(
      "click",
      functions.functions[index].removeHandler
    );
    functions.functions.splice(index, 1);
    renderFunctions();
  };

  const renderFunctions = () => {
    console.log(functions);
    encodeFunctions(functions);
    console.log(functions);

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

      functionDiv.appendChild(rButton);

      functionsDiv.appendChild(functionDiv);
    });
  };

  renderFunctions();

  const renderResults = async () => {
    console.log(functions);

    app.innerHTML = "";

    try {
      let response;
      if (complexChecked) {
        response = await post("/susana-mueve-haz-el-web-service", functions);
      } else {
        response = await post("/fourier-series", functions);
      }
      console.log(response);
      app.appendChild(renderSolution(response));
    } catch {
      ErrorResponse(app);
    }
  };

  const addButton = () => {
    const funcs = document.querySelectorAll(".function");

    funcs.forEach((func, i) => {
      const inputs = func.querySelectorAll("input");
      functions.functions[i].f = inputs[0].value;
      functions.functions[i].d = inputs[1].value;
      functions.functions[i].d_plus_T = inputs[2].value;
    });

    functions.functions.push({
      f: "t",
      d: "0",
      d_plus_T: "2\\pi",
      removeHandler: (e) => {
        removeButton(e.target.parentElement.dataset.index, e.target);
      },
    });
    renderFunctions();
  };

  const toggleComplex = () => {
    complexChecked = !complexChecked;
    console.log(complexChecked);
  };

  complexInput.addEventListener("click", toggleComplex);
  periodInput.addEventListener("change", () => {
    functions.T = periodInput.value;
  });
  submitButton.addEventListener("click", renderResults);
  addFuncButton.addEventListener("click", addButton);
};
