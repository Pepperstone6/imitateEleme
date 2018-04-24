import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getter.js'
import * as actions from './action.js'
import state from './state.js'
import mutations from './mutation.js'
Vue.use(Vuex)

import {vueLocal} from './plugins'

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [vueLocal.plugin]
})
export default  store