import Vue from 'vue'
import App from './App.vue'
import './plugins/axios';
import './plugins/buefy';
import './plugins/vue2-google-maps';

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
