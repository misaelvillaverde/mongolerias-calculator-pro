import { FourierSeries } from "./components/FourierSeries.js";
import { GeneralCalculator } from "./components/GeneralCalculator.js";

(function () {
  "use strict";

  const app = document.getElementById("app");

  switch (window.location.pathname) {
    case "/fourier-series":
      FourierSeries(app);
      break;
    case "/":
      GeneralCalculator(app);
      break;
    default:
      break;
  }
})();
