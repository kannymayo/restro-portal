import Vue from 'vue';
import Axios from 'axios';
import configs from '../config'

Axios.defaults.baseURL               = configs.host;
Axios.defaults.headers.common.Accept = 'application/json';

// Bind Axios to Vue.
Vue.$http = Axios;
Object.defineProperty(Vue.prototype, '$http', {
    get() {
        return Axios;
    },
});