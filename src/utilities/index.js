export const parseParams = params => {
  Object.keys(params).forEach(key =>
    typeof params[key] === "string"
      ? params[key].trim() === "" && delete params[key]
      : params[key] === undefined && delete params[key]
  );
  return params;
};
