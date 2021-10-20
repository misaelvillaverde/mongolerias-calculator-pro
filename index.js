import katex from "https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.mjs";
(function () {
  "use strict";

  const app = document.getElementById("app");

  const response = {
    solutions: [
      {
        step_input: "\\int _{0}^{π}\\sin(x)\\cos(x)dx",
        entire_result: "\u003d0",
        solvingClass: "Integrals",
        isInterimStep: true,
        isOpen: false,
        isShowSolutionAfterStep: false,
        title: {
          text: {
            createdText: "\\int _{0}^{π}\\sin(x)\\cos(x)dx\u003d0",
          },
        },
        steps: [
          {
            step_output: "\\int _{0}^{π}\\frac{\\sin(2x)}{2}dx",
            entire_result: "\u003d\\int _{0}^{π}\\frac{\\sin(2x)}{2}dx",
            interimType:
              "VTin66VggxEGnKIhwBEGtxj6vC/BjRxYUJ1roYUUh9t8E5yu9wvIiyUMwoa0tCSm",
            isInterimStep: true,
            isOpen: false,
            isShowSolutionAfterStep: true,
            isLocked: true,
            title: {
              text: {
                createdText:
                  "\\mathrm{Re-escribir usando identidades trigonométricas}",
              },
            },
            explanation: [
              {
                createdText: "\\mathrm{Locked\\:Content}",
              },
            ],
          },
          {
            step_input: "\\int _{0}^{π}\\frac{\\sin(2x)}{2}dx",
            step_output: "\\frac{1}{2}\\int _{0}^{π}\\sin(2x)dx",
            entire_result: "\u003d\\frac{1}{2}\\cdot \\int _{0}^{π}\\sin(2x)dx",
            isInterimStep: false,
            isOpen: false,
            isShowSolutionAfterStep: false,
            title: {
              text: {
                createdText: "\\mathrm{Sacar la constante}",
              },
            },
            general_rule: {
              text: {
                createdText: "\\int{a\\cdot{f(x)}dx}\u003da\\cdot\\int{f(x)dx}",
              },
            },
          },
          {
            step_input: "\\int _{0}^{π}\\sin(2x)dx",
            step_output: "\\int _{0}^{2π}\\sin(u)\\frac{1}{2}du",
            entire_result:
              "\u003d\\frac{1}{2}\\cdot \\int _{0}^{2π}\\sin(u)\\frac{1}{2}du",
            isInterimStep: false,
            isOpen: false,
            isShowSolutionAfterStep: false,
            steps: [
              {
                interimType:
                  "4OvFE//4flVAvx3ig0bUGNY5l+baRh9Fz7PKe618YX0\u003d",
                isInterimStep: true,
                isOpen: false,
                isShowSolutionAfterStep: false,
                isLocked: true,
                title: {
                  text: {
                    createdText:
                      "\\mathrm{Aplicar integración por sustitución:} u\u003d2x",
                  },
                },
                explanation: [
                  {
                    createdText: "\\mathrm{Locked\\:Content}",
                  },
                ],
                practiceLink:
                  "/practice/integration-practice#area\u003dmain\u0026subtopic\u003dSubstitution",
                practiceTopic: "Integral Substitution",
              },
            ],
          },
          {
            step_input: "\\int _{0}^{2π}\\sin(u)\\frac{1}{2}du",
            step_output: "\\frac{1}{2}\\int _{0}^{2π}\\sin(u)du",
            entire_result:
              "\u003d\\frac{1}{2}\\cdot \\frac{1}{2}\\cdot \\int _{0}^{2π}\\sin(u)du",
            isInterimStep: false,
            isOpen: false,
            isShowSolutionAfterStep: false,
            title: {
              text: {
                createdText: "\\mathrm{Sacar la constante}",
              },
            },
            general_rule: {
              text: {
                createdText: "\\int{a\\cdot{f(x)}dx}\u003da\\cdot\\int{f(x)dx}",
              },
            },
          },
          {
            step_input: "\\int _{0}^{2π}\\sin(u)du",
            step_output: "[-\\cos(u)]^{2π}_{0}",
            entire_result:
              "\u003d\\frac{1}{2}\\cdot \\frac{1}{2}[-\\cos(u)]^{2π}_{0}",
            isInterimStep: false,
            isOpen: false,
            isShowSolutionAfterStep: false,
            title: {
              text: {
                createdText: "\\mathrm{Aplicar la regla de integración}",
              },
            },
            general_rule: {
              text: {
                createdText: "\\int \\sin(u)du\u003d-\\cos(u)",
              },
            },
          },
          {
            step_output: "\\frac{1}{4}[-\\cos(u)]^{2π}_{0}",
            entire_result: "\u003d\\frac{1}{4}[-\\cos(u)]^{2π}_{0}",
            solvingClass: "Solver",
            interimType: "oVnQ2HJJrq339e3qxfd+vwmuvJSk6ynYh0thqa1eKF4\u003d",
            isInterimStep: true,
            isOpen: false,
            isShowSolutionAfterStep: true,
            isLocked: true,
            title: {
              text: {
                createdText:
                  "\\mathrm{Simplificar }\\frac{1}{2}\\cdot \\frac{1}{2}[-\\cos(u)]^{2π}_{0}:{\\quad}\\frac{1}{4}[-\\cos(u)]^{2π}_{0}",
              },
            },
            explanation: [
              {
                createdText: "\\mathrm{Locked\\:Content}",
              },
            ],
          },
          {
            entire_result: "\u003d\\frac{1}{4}\\cdot 0",
            isInterimStep: false,
            isOpen: false,
            isShowSolutionAfterStep: false,
            steps: [
              {
                interimType:
                  "T974QvEfw1/EXK87mom1f6MfUz+/wFdgvByPur1mGXR8E5yu9wvIiyUMwoa0tCSm",
                isInterimStep: true,
                isOpen: false,
                isShowSolutionAfterStep: false,
                isLocked: true,
                title: {
                  text: {
                    createdText: "\\mathrm{Calcular los limites}:{\\quad}0",
                  },
                },
                explanation: [
                  {
                    createdText: "\\mathrm{Locked\\:Content}",
                  },
                ],
              },
            ],
          },
          {
            entire_result: "\u003d0",
            isInterimStep: false,
            isOpen: false,
            isShowSolutionAfterStep: false,
            title: {
              text: {
                createdText: "\\mathrm{Simplificar}",
              },
            },
          },
        ],
      },
    ],
  };

  // ul
  const ul = document.createElement("ul");
  ul.setAttribute("id", "PapaUl");

  let count = 0;
  // traverse n-ary tree of step nodes in pre-order fashion
  function traverse(node, unorderedList) {
    if (node.title?.text?.createdText != null) {
      console.log(node.title.text.createdText);
    }
    const li = document.createElement("li");

    // katex title
    const katexTitle = document.createElement("div");
    if (node.title?.text?.createdText != null)
      katex.render(
        node.title.text.createdText.replace(/\s/g, "\\enspace "),
        katexTitle
      );

    // katex result
    const katexResult = document.createElement("div");
    if (node.entire_result != null)
      katex.render(node.entire_result, katexResult);

    li.appendChild(katexTitle);
    li.appendChild(katexResult);

    unorderedList?.appendChild(li);

    if (!node.steps) return;
    count++;
    const littleul = document.createElement("ul");
    littleul.setAttribute("id", `ul-${count}`);
    li.appendChild(littleul);
    // traverse n children nodes passing an unordered list by reference
    node.steps.forEach((n) => {
      traverse(n, littleul);
    });
  }

  traverse(response.solutions[0], ul);
  app.appendChild(ul);
})();
