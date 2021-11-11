export const evil = (exp) => {
  return new Function(`return ${exp}`)();
};

export const evalFSymbols = (expression) => {
  let result = expression.replaceAll(/\*\\pi/g, " * Math.PI");

  if (result.includes("infty")) {
    result = result.replaceAll(/\\infty/g, "Infinity");
    return result;
  }

  result = result.replaceAll(/\\pi\*/g, "Math.PI * ");

  result = result.replaceAll(/\*\\e/g, " * Math.E");
  result = result.replaceAll(/\\e\*/g, "Math.E * ");

  result = result.replaceAll(/{/g, "(");
  result = result.replaceAll(/}/g, ")");

  console.log(result);

  return evil(result);
};

export const parseISymbols = (expression) => {
  let result = expression.replaceAll(/t/g, "x");
  result = result.replaceAll(/\\pi/g, "PI");
  console.log(result);
  return result;
};
