export const post = async (expression) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      expression,
    }),
    redirect: "follow",
  };

  const response = await fetch("/symbo", requestOptions);
  // console.log(response.text());
  return response.json();
};
