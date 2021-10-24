export const evaluate = async (route, expression) => {
  const response = await post(route, expression);
  return response.solutions[response.solutions.length - 1].entire_result;
};

export const post = async (route, expression) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(expression),
    redirect: "follow",
  };

  if (route == "/") {
    route = "/symbo";
  }

  const response = await fetch(route, requestOptions);
  return response.json();
};
