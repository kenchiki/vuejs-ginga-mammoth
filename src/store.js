import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import accounts from './stores/accounts';
import timelines from './stores/timelines';
import statuses from './stores/statuses.js';
import medias from './stores/medias.js';

export default new Vuex.Store({
  modules: {
    accounts: accounts,
    timelines: timelines,
    statuses: statuses,
    medias: medias,
  }
});
