import Vue from 'vue';
import Axios from 'axios';

Axios.defaults.baseURL               = 'localhost';
Axios.defaults.headers.common.Accept = 'application/json';

// Bind Axios to Vue.
Vue.$http = Axios;
Object.defineProperty(Vue.prototype, '$http', {
    get() {
        return Axios;
    },
});