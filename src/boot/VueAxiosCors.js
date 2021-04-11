// import something here
import { boot } from 'quasar/wrappers';
import Vue from 'vue';
import AxiosPlugin from 'vue-axios-cors';
 
Vue.use(AxiosPlugin);

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
// export default async boot(({ Vue }) => {
  
export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$AxiosPlugin = AxiosPlugin; 
});
