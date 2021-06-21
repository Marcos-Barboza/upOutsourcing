import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

type MethodRequest = AxiosRequestConfig['method'];
type Path = AxiosRequestConfig['url'];

interface API {
  methodRequest?: MethodRequest;
  params?: AxiosRequestConfig['params'];
  data?: AxiosRequestConfig['data'];
}

const api = (() => {
  console.log(process.env.HOST);
  const request = (path: Path, { methodRequest, data, params }: API): AxiosPromise<unknown> =>
    axios({
      headers: {
        'content-type': 'application/json'
      },
      method: methodRequest || 'POST',
      url: `/api/${path}`,
      params,
      data
    });
  const pick =
    (methodRequest?: MethodRequest) =>
    (path: Path, { data, params }: API) =>
      request(path, { methodRequest, data, params });
  return {
    post: pick('POST'),
    get: pick('GET'),
    put: pick('PUT'),
    patch: pick('PATCH'),
    delete: pick('DELETE')
  };
})();

export default api;
