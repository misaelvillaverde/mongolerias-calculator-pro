export const Graph = (width, height, data) => {
  const graphDiv = document.querySelector("#graph");
  graphDiv.innerHTML = "";
  console.log(`graph width: ${width} | height: ${height}`);

  functionPlot({
    target: "#graph",
    width,
    height,
    yAxis: { domain: [-1, 20] },
    xAxis: { domain: [-1, 10] },
    grid: true,
    data,
  });
};
