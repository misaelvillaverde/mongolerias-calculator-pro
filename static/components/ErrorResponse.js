export const ErrorResponse = (app, error) => {
  const errorResponse = document.createElement("pre");
  errorResponse.innerHTML = error;
  app.appendChild(errorResponse);
};
