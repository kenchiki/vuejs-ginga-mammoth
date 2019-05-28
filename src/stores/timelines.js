import uuidv1 from 'uuid/v1';

export default {
  namespaced: true,
  state: {
    error: null,
    timelines: [],
    localStorage: localStorage
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    addTimeline(state, {account_id, type}) {
      state.timelines.push({
        id: uuidv1(),
        account_id: account_id,
        type: type
      });
      state.localStorage.setItem('timelines', JSON.stringify(state.timelines));
    },
    restoreStorage(state) {
      state.timelines = JSON.parse(state.localStorage.getItem('timelines')) || [];
    }
  },
  actions: {
  }
}
