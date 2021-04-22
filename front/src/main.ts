import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { observable, isObservable, toJS } from 'mobx'
import VueMobx from 'vue-mobx'

Vue.use(VueMobx, {
  toJS: toJS,
  isObservable: isObservable,
  observable: observable
})

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  render: h => h(App)
}).$mount('#app')
