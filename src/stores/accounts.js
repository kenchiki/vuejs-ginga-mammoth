import axios from 'axios'
import qs from 'qs';
import uuidv1 from 'uuid/v1';

const API_SCOPE = 'read write';
const APP_NAME = '銀河マンモス';
// client、tokenどちらを取得する際も同一のものを指定する必要あり（認証のところで無効と表示されてしまうため）
const REDIRECT_URI = 'http://localhost:8081/oauth_callback';

export default {
  namespaced: true,
  state: {
    error: null,
    accounts: [],
    localStorage: localStorage,
    sessionStorage: sessionStorage
  },
  mutations: {
    // TODO:エラーは他でも使いまわすのでmixinsにしたい
    setError(state, error) {
      state.error = error;
    },
    setMastodonUrl(state, mastodon_url) {
      state.sessionStorage.setItem('mastodon_url', mastodon_url);
    },
    setClient(state, response) {
      state.sessionStorage.setItem('client_id', response.client_id);
      state.sessionStorage.setItem('client_secret', response.client_secret);
    },
    setCode(state, code) {
      state.sessionStorage.setItem('code', code);
    },
    setToken(state, token) {
      state.sessionStorage.setItem('token', token);
    },
    setInstanceName(state, instance_name) {
      state.sessionStorage.setItem('instance_name', instance_name);
    },
    setStreamingUrl(state, streaming_url) {
      state.sessionStorage.setItem('streaming_url', streaming_url);
    },
    addAccount(state) {
      state.accounts.push({
        id: uuidv1(),
        mastodon_url: state.sessionStorage.getItem('mastodon_url'),
        client_secret: state.sessionStorage.getItem('client_secret'),
        client_id: state.sessionStorage.getItem('client_id'),
        token: state.sessionStorage.getItem('token'),
        streaming_url: state.sessionStorage.getItem('streaming_url'),
        instance_name: state.sessionStorage.getItem('instance_name'),
      });
      state.localStorage.setItem('accounts', JSON.stringify(state.accounts));
      state.sessionStorage.clear();
    },
    restoreStorage(state) {
      state.accounts = JSON.parse(state.localStorage.getItem('accounts')) || [];
    },
    deleteAccount(state, account_id) {
      state.accounts = state.accounts.filter(account => account.id !== account_id);
      state.localStorage.setItem('accounts', JSON.stringify(state.accounts));
    }
  },
  actions: {
    async fetchApp({commit, dispatch}, mastodon_url) {
      commit('setMastodonUrl', mastodon_url);
      await dispatch('fetchClient');
      dispatch('fetchCode');
    },
    async fetchClient({commit, state}) {
      const postParams = {
        client_name: APP_NAME,
        redirect_uris: REDIRECT_URI,
        scopes: API_SCOPE
      };

      // https://docs.joinmastodon.org/api/rest/apps/#post-api-v1-apps
      try {
        const response = await axios.post(`${state.sessionStorage.getItem('mastodon_url')}/api/v1/apps`, postParams);
        commit('setClient', response.data);
        commit('setError', null);
      } catch (error) {
        commit('setError', error);
      }
    },
    fetchCode({state}) {
      const getParams = {
        response_type: 'code',
        client_id: state.sessionStorage.getItem('client_id'),
        redirect_uri: REDIRECT_URI,
        scope: API_SCOPE
      };

      // https://docs.joinmastodon.org/api/authentication/#get-oauth-authorize
      const authUrl = new URL(`${state.sessionStorage.getItem('mastodon_url')}/oauth/authorize`);
      authUrl.search = qs.stringify(getParams);
      document.location = authUrl.href;
    },
    async fetchToken({commit, dispatch, state}, code) {
      const postParams = {
        client_id: state.sessionStorage.getItem('client_id'),
        client_secret: state.sessionStorage.getItem('client_secret'),
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
      };

      try {
        const response = await axios.post(`${state.sessionStorage.getItem('mastodon_url')}/oauth/token`, postParams);
        commit('setToken', response.data.access_token);
        commit('setError', null);
      } catch (error) {
        commit('setError', error);
      }

      await dispatch('fetchInstance');
      commit('addAccount');
    },
    async fetchInstance({commit, state}) {
      try {
        const response = await axios.get(`${state.sessionStorage.getItem('mastodon_url')}/api/v1/instance`, {
          headers: {'Authorization': `Bearer ${state.sessionStorage.getItem('token')}`}
        });
        commit('setStreamingUrl', response.data.urls.streaming_api);
        commit('setInstanceName', response.data.title);
        commit('setError', null);
      } catch (error) {
        commit('setError', error);
      }
    },

  }
}
