import katex from "https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.mjs";

let count = 0;
// traverse n-ary tree of step nodes in pre-order fashion
const traverse = (node, unorderedList) => {
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
  if (node.entire_result != null) katex.render(node.entire_result, katexResult);

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
};

export const renderSolution = (root) => {
  // ul
  const resultList = document.createElement("ul");
  resultList.setAttribute("id", "PapaUl");

  traverse(root, resultList);

  return resultList;
};
