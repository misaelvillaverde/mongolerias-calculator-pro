import katex from "https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.mjs";

const imgURL = "https://es.symbolab.com";

let count = 0;
// traverse n-ary tree of step nodes in pre-order fashion
const traverse = (node, unorderedList) => {
  const li = document.createElement("li");

  // katex title
  if (node.title?.text?.createdText != null) {
    const katexTitle = document.createElement("div");
    katex.render(
      node.title.text.createdText.replace(/\s/g, "\\enspace "),
      katexTitle
    );
    li.appendChild(katexTitle);
  }

  // katex result
  if (node.entire_result != null) {
    const katexResult = document.createElement("div");
    katex.render(node.entire_result, katexResult);
    li.appendChild(katexResult);
  }

  // step image
  if (node.image != null) {
    const stepImage = document.createElement("img");
    stepImage.src =
      imgURL + node.image + "&width=551.6999853849411&ratio=0.8999999761581421";
    li.appendChild(stepImage);
  }

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
};

export const renderSolution = (root) => {
  // ul
  const resultList = document.createElement("ul");
  resultList.setAttribute("id", "PapaUl");

  traverse(root, resultList);

  return resultList;
};
