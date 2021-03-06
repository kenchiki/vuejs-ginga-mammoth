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
    addTimeline(state, {account, type}) {
      state.timelines.push({
        id: uuidv1(),
        account: account,
        type: type
      });
      state.localStorage.setItem('timelines', JSON.stringify(state.timelines));
    },
    deleteTimeline(state, timeline_id) {
      state.timelines = state.timelines.filter(timeline => timeline.id !== timeline_id);
      state.localStorage.setItem('timelines', JSON.stringify(state.timelines));
    },
    deleteTimelineByAccount(state, account_id) {
      state.timelines = state.timelines.filter(timeline => timeline.account.id !== account_id);
      state.localStorage.setItem('timelines', JSON.stringify(state.timelines));
    },
    restoreStorage(state) {
      state.timelines = JSON.parse(state.localStorage.getItem('timelines')) || [];
    }
  },
  actions: {
  }
}
