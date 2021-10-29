import katex from "https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.mjs";
import { post } from "./utils/requests.js";
import { renderSolution } from "./utils/solution.js";

(function () {
  "use strict";

  const app = document.getElementById("app");

  // function expression input
  const functionInput = document.querySelector("#function");

  // range1 expression input
  const range1Input = document.querySelector("#range1");

  // range2 expression input
  const range2Input = document.querySelector("#range2");

  // Period input
  const periodInput = document.querySelector("#T");

  // user expression output
  const output = document.querySelector("#output");

  // submit button
  const submit = document.querySelector("#submit");

  if (functionInput) {
    functionInput.value = "\\int_0^{\\infin}\\int_0^{\\infin}({x^2+423z})dxdz";
    katex.render(functionInput.value, output);

    // user expression output
    functionInput.addEventListener("input", (e) => {
      // get the input value
      const value = e.target.value;

      // if the input is empty, render the default expression
      if (value === "") {
        katex.render(
          "\\int_0^{\\infin}\\int_0^{\\infin}({x^2+423z})dxdz",
          output
        );
      } else {
        katex.render(value, output);
      }
    });
  }

  const renderResults = async () => {
    // get the input value
    const functionVal =
      functionInput && functionInput.value
        ? encodeURI(functionInput.value).replace(/\+/g, "%2B")
        : null;
    const range1Val =
      range1Input && range1Input.value
        ? encodeURI(range1Input.value).replace(/\+/g, "%2B")
        : null;
    const range2Val =
      range2Input && range2Input.value
        ? encodeURI(range2Input.value).replace(/\+/g, "%2B")
        : null;
    const periodVal =
      periodInput && periodInput.value
        ? encodeURI(periodInput.value).replace(/\+/g, "%2B")
        : null;

    let bodyExpression = {};
    let route = "/symbo";
    let response;
    switch (window.location.pathname) {
      case "/":
        bodyExpression = {
          expression: functionVal,
        };
        console.log(bodyExpression);
        console.log(route);

        response = await post(route, bodyExpression);
        console.log(response);

        app.innerHTML = "";
        app.appendChild(renderSolution(response.solutions[0]));
        break;
      case "/fourier-series":
        route = "/fourier-series";
        bodyExpression = {
          f: functionVal,
          d: range1Val,
          d_plus_T: range2Val,
          T: periodVal,
        };
        console.log(bodyExpression);
        console.log(route);

        response = await post(route, bodyExpression);
        console.log(response);

        app.innerHTML = "";
        app.appendChild(renderSolution(response));
        break;
    }
  };

  submit.addEventListener("click", renderResults);
  functionInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      renderResults();
    }
  });

  periodInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      renderResults();
    }
  });
})();
