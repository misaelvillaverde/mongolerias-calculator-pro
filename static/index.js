import katex from "https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.mjs";
import { post } from "./utils/requests.js";
import { renderSolution } from "./utils/solution.js";

(function () {
  "use strict";

  const app = document.getElementById("app");

  // user expression input
  const input = document.querySelector("#input");

  // user expression output
  const output = document.querySelector("#output");

  // submit button
  const submit = document.querySelector("#submit");

  input.value = "\\int_0^{\\infin}\\int_0^{\\infin}({x^2+423z})dxdz";
  katex.render(input.value, output);

  // user expression output
  input.addEventListener("input", (e) => {
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

  submit.addEventListener("click", async () => {
    // get the input value
    const value = encodeURI(input.value).replace(/\+/g, "%2B");
    console.log(value);
    const response = await post(value);
    console.log(response);

    app.appendChild(renderSolution(response.solutions[0]));
  });
})();
