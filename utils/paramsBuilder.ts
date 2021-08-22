function generateParams(max = 20) {
  let res = "";
  for (let i = 1; i < max; i++) {
    res += `/:${i}?`;
  }
  return res;
}

// deno-lint-ignore no-explicit-any
function getRouteFromParams(params: any) {
  let res = "";
  const keys = Object.keys(params);
  for (const key of keys) {
    if (params[key] !== undefined && key !== "port") {
      res += `/${params[key]}`;
    }
  }
  return res;
}

function getParamsObject(searchParam: URLSearchParams) {
  // deno-lint-ignore no-explicit-any
  let res: any = {};
  for (const [key, value] of searchParam) {
    res[key] = value;
  }
  return res;
}

export { generateParams, getParamsObject, getRouteFromParams };
