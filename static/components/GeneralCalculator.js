import katex from "https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.mjs";

import { post } from "../utils/requests.js";
import { renderSolution } from "../utils/solution.js";
import { ErrorResponse } from "./ErrorResponse.js";

export const GeneralCalculator = (app) => {
  const functionInput = document.querySelector("#function");
  const output = document.querySelector("#output");
  const submitButton = document.querySelector("#submit");

  functionInput.value = "\\int\\cos(x)\\sin(x)dx";
  katex.render(functionInput.value, output);

  functionInput.addEventListener("input", (e) => {
    if (e.target.value === "") {
      katex.render("\\int\\cos(x)\\sin(x)dx", output);
    } else {
      katex.render(e.target.value, output);
    }
  });

  const renderResults = async () => {
    const functionV =
      functionInput && functionInput.value
        ? encodeURI(functionInput.value).replace(/\+/g, "%2B")
        : null;

    const bodyExpression = {
      expression: functionV,
    };

    console.log(bodyExpression);

    app.innerHTML = "";

    try {
      const response = await post("/symbo", bodyExpression);
      console.log(response);
      app.appendChild(renderSolution(response.solutions[0]));
    } catch {
      ErrorResponse(app);
    }
  };

  submitButton.addEventListener("click", renderResults);

  functionInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      renderResults();
    }
  });
};
