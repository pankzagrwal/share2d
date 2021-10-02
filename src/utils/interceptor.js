const apiTokens = {
  // apiName: lastUuid
};
const cancelTokens = {
  // apiName: [uuidToCancel]
};

const baseUrl = "http://3.20.116.189";

let authToken = "";

if (window.localStorage) {
  authToken = localStorage.getItem("authToken");
}

export function cancel(apiName) {
  const token = apiTokens[apiName];
  const cancelToken = cancelTokens[apiName] || [];
  if (token) {
    cancelTokens[apiName] = cancelToken;
    cancelToken.push(token);
  }
}

const interceptor = (config) => {
  const {
    cancelPrevious = false,
    redirect = "follow",
    contentType = "application/json; charset=UTF-8",
    // query = {},
    defaultResponse,
    url,
    method = "get",
    body,
    headers = {},
    parser = "json",
    timeout = 10000,
    apiName,
    // controller,
    disableContentType = false,
  } = config;
  const token = Date.now();
  if (apiName === "signup") {
    authToken = "";
    window.localStorage && localStorage.setItem("authToken", "");
  }
  if (apiName) {
    if (cancelPrevious) {
      cancel(apiName);
    }
    apiTokens[apiName] = token;
  }
  if (!disableContentType) {
    headers["content-type"] = contentType;
  }
  if (authToken) {
    headers["Authorization"] = `Token ${authToken}`;
  }
  return window
    .fetch(`${baseUrl}${url}`, {
      ...config,
      mode: "cors",
      redirect,
      headers,
      method,
      timeout,
      body: body
        ? typeof body === "object" && !(body instanceof window.FormData)
          ? JSON.stringify(body)
          : body
        : undefined,
    })
    .catch((err) => ({ status: err.status, message: err.message }))
    .then((res) => {
      const { [apiName]: tokens = [] } = cancelTokens;
      const index = tokens.indexOf(token);
      if (apiName && index >= 0) {
        tokens.splice(index, 1);
        cancelTokens[apiName] = tokens;
        return { status: 410, config, cancelled: true };
      }
      return res;
    })
    .then((res) => {
      const { status, cancelled } = res;
      let data = defaultResponse;
      const error = status >= 400 && status <= 600;
      let err;
      // if (error) {
      //   const params = { ...body, ...query }
      //   const msg = `API Failed: ${apiName}, Status: ${status} - ${message || ''}`
      //   const tags = ['api:' + apiName, 'status:' + status]
      //   err = new Error(msg)
      //   err.status = status
      //   err.tags = tags
      //   err.params = params
      //   err.api_url = apiName
      //   err.controller = controller
      // }
      if (error && !cancelled) {
        console.log(err);
      } else if (!cancelled) {
        // data = res[parser]()
      }
      data = res[parser]();
      if (error) {
        //err.data = data
        return data.then((data) => {
          return Promise.reject({ data, status, isError: true });
        });
        // return Promise.reject(data)
      }
      return data.then((data) => {
        if (apiName === "login") {
          authToken = data?.token ?? "";
          window.localStorage && localStorage.setItem("authToken", authToken);
        }
        return { config, data, status, cancelled };
      });
    });
};

export default interceptor;
