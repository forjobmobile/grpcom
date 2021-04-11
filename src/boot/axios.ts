import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { boot } from 'quasar/wrappers';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

const UrlGRPCOM = 'https://epg-api.video.globo.com/programmes/1337'
const AxiosOptions: AxiosRequestConfig  = {
  baseURL: UrlGRPCOM,
  method: 'GET',
  timeout: 5000,
  responseType: 'json',
  // credentials: 'include',
  headers: { 
      // 'Access-Control-Allow-Credentials': true,
      // 'Access-Control-Allow-Headers': 'Authorization',
      'Access-Control-Allow-Origin' : '*',
      // 'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Methods' : 'GET',
      'Access-Control-Max-Age': 86400,
      'Content-Type': 'application/json;charset=UTF-8'
  }
}
const api = axios.create(AxiosOptions)

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios;
});

export { axios, api }