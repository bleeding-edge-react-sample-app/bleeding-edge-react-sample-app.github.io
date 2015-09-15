import {Promise} from 'bluebird';
import superagent from 'superagent';
import superagentPromise from 'superagent-promise';
export const agent = superagentPromise(superagent, Promise);
const API_ROOT = 'https://api.reddit.com';

// api token
const TOKEN_KEY = 'authorizationToken';
let token = localStorage.getItem(TOKEN_KEY) || null;

// request wrapper
export function makeRequest(method, url){
  var req = agent[method.toLowerCase()](
    `${API_ROOT}/${url}`
  );

  if (token) {
    req.set('Authorization', `JWT ${token}`);
  }

  return req
    .then((res) => {
      if (res.status >= 400) {
        return Promise.reject(res.body);
      }
      else {
        return Promise.resolve(res.body);
      }
    });
}
export default {
  get: (...args) => makeRequest('get', ...args)
    .then((res) => {
      if (res.kind === 'Listing') {
        return res.data.children;
      }
      return res;
    }),
  post: (...args) => makeRequest('post', ...args),
  put: (...args) => makeRequest('put', ...args),
  delete: (...args) => makeRequest('delete', ...args),
  head: (...args) => makeRequest('head', ...args),
};

// manages api token
export function setToken(newToken){
  localStorage.setItem(TOKEN_KEY, newToken);
  console.debug('Api Token: %s', newToken);
  token = newToken;
}

export function getToken(){
  return token;
}
