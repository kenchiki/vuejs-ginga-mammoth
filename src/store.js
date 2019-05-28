import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import accounts from './stores/accounts';
import timelines from './stores/timelines';


export default new Vuex.Store({
  modules: {
    accounts: accounts,
    timelines: timelines,
  }
});
