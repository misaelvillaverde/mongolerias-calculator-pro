export const ErrorResponse = (
  app,
  error = "Como siempre error en el backend🥵"
) => {
  const errorResponse = document.createElement("pre");
  errorResponse.innerHTML = error;
  app.appendChild(errorResponse);
};
