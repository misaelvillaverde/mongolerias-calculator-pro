export const ErrorResponse = (
  app,
  error = "O tas improvisando paja🤔 o error en el backend🥵"
) => {
  const errorResponse = document.createElement("pre");
  errorResponse.innerHTML = error;
  app.appendChild(errorResponse);
};
