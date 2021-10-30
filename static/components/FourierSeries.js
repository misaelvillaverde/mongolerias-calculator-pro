import { post } from "../utils/requests.js";
import { renderSolution } from "../utils/solution.js";
import { ErrorResponse } from "./ErrorResponse.js";

export const FourierSeries = (app) => {
  const functionInput = document.querySelector("#function");
  const range1Input = document.querySelector("#range1");
  const range2Input = document.querySelector("#range2");
  const periodInput = document.querySelector("#T");
  const submitButton = document.querySelector("#submit");

  // fourier series
  functionInput.value = "t";
  range1Input.value = "0";
  range2Input.value = "2\\pi";
  periodInput.value = "2\\pi";

  const renderResults = async () => {
    const functionV =
      functionInput && functionInput.value
        ? encodeURI(functionInput.value).replace(/\+/g, "%2B")
        : null;
    const range1 =
      range1Input && range1Input.value
        ? encodeURI(range1Input.value).replace(/\+/g, "%2B")
        : null;
    const range2 =
      range2Input && range2Input.value
        ? encodeURI(range2Input.value).replace(/\+/g, "%2B")
        : null;
    const period =
      periodInput && periodInput.value
        ? encodeURI(periodInput.value).replace(/\+/g, "%2B")
        : null;

    const bodyExpression = {
      f: functionV,
      d: range1,
      d_plus_T: range2,
      T: period,
    };

    console.log(bodyExpression);

    app.innerHTML = "";

    try {
      const response = await post("/fourier-series", bodyExpression);
      console.log(response);
      app.appendChild(renderSolution(response));
    } catch (error) {
      ErrorResponse(app, error);
    }
  };

  submitButton.addEventListener("click", renderResults);
};
